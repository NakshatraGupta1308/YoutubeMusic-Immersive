// Web Audio analysis: log-spaced spectrum, band energies and beat detection.
export const BANDS = 128;

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.source = null;
    this.el = null;
    this.error = null;
    this.gain = 1;

    this.spectrum = new Float32Array(BANDS);
    this.bass = 0;
    this.mid = 0;
    this.treble = 0;
    this.level = 0;
    this.beat = 0;

    this._raw = null;
    this._starts = new Float32Array(BANDS);
    this._ends = new Float32Array(BANDS);
    this._bassAvg = 0;
    this._lastBeat = 0;
    this._bassEnd = 30;
    this._midEnd = 84;
  }

  attach(el) {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AC({ latencyHint: 'playback' });
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.5;
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -20;
        this.analyser.connect(this.ctx.destination);
        this._raw = new Uint8Array(this.analyser.frequencyBinCount);
        this._buildBands();
        this.ctx.addEventListener('statechange', () => {
          if (this.ctx.state === 'suspended' && this.source) this.ctx.resume().catch(() => {});
        });
      }
      if (this.el !== el) {
        if (this.source) { try { this.source.disconnect(); } catch (_) {} }
        this.source = this.ctx.createMediaElementSource(el);
        this.source.connect(this.analyser);
        this.el = el;
        el.addEventListener('play', () => { if (this.ctx) this.ctx.resume().catch(() => {}); });
      }
      if (this.ctx.state !== 'running') this.ctx.resume().catch(() => {});
      this.error = null;
      return true;
    } catch (e) {
      this.error = e;
      return false;
    }
  }

  _buildBands() {
    const sr = this.ctx.sampleRate;
    const n = this.analyser.frequencyBinCount;
    const hz = sr / 2 / n;
    const lo = 40;
    const hi = Math.min(16000, (sr / 2) * 0.95);
    const f = (i) => lo * Math.pow(hi / lo, i / BANDS);
    for (let i = 0; i < BANDS; i++) {
      this._starts[i] = f(i) / hz;
      this._ends[i] = f(i + 1) / hz;
    }
    this._bassEnd = Math.round((Math.log(160 / lo) / Math.log(hi / lo)) * BANDS);
    this._midEnd = Math.round((Math.log(2000 / lo) / Math.log(hi / lo)) * BANDS);
  }

  update(dt) {
    dt = Math.min(Math.max(dt, 0.001), 0.1);
    const spec = this.spectrum;
    const have = !!this.analyser;
    if (have) this.analyser.getByteFrequencyData(this._raw);
    const raw = this._raw;
    const attack = 1 - Math.exp(-dt * 40);
    const release = 1 - Math.exp(-dt * 8);

    for (let i = 0; i < BANDS; i++) {
      let v = 0;
      if (have) {
        const a = this._starts[i];
        const b = this._ends[i];
        if (b - a < 1) {
          const c = (a + b) * 0.5;
          const i0 = Math.floor(c);
          const t = c - i0;
          v = (raw[i0] * (1 - t) + raw[Math.min(i0 + 1, raw.length - 1)] * t) / 255;
        } else {
          let m = 0;
          const e = Math.min(Math.ceil(b), raw.length - 1);
          for (let k = Math.floor(a); k <= e; k++) if (raw[k] > m) m = raw[k];
          v = m / 255;
        }
      }
      v = Math.min(1, v * (0.8 + (i / BANDS) * 0.9) * this.gain);
      const s = spec[i];
      spec[i] = v > s ? s + (v - s) * attack : s + (v - s) * release;
    }

    let b = 0, m = 0, t = 0;
    for (let i = 0; i < BANDS; i++) {
      if (i < this._bassEnd) b += spec[i];
      else if (i < this._midEnd) m += spec[i];
      else t += spec[i];
    }
    this.bass = Math.min(1, (b / this._bassEnd) * 1.15);
    this.mid = m / (this._midEnd - this._bassEnd);
    this.treble = t / (BANDS - this._midEnd);
    this.level = (this.bass + this.mid + this.treble) / 3;

    const now = performance.now();
    this._bassAvg += (this.bass - this._bassAvg) * (1 - Math.exp(-dt * 1.5));
    if (this.bass > this._bassAvg * 1.22 + 0.04 && this.bass > 0.3 && now - this._lastBeat > 190) {
      this.beat = 1;
      this._lastBeat = now;
    }
    this.beat *= Math.exp(-dt * 5.5);
  }
}
