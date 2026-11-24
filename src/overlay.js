import * as THREE from 'three';
import { NebulaScene } from './scenes/nebula.js';
import { TerrainScene } from './scenes/terrain.js';
import { RingsScene } from './scenes/rings.js';
import { TunnelScene } from './scenes/tunnel.js';
import { BarsScene } from './scenes/bars.js';
import { CrystalScene } from './scenes/crystal.js';
import { AuroraScene } from './scenes/aurora.js';
import { LyricFX, LYRIC_STYLES } from './lyricfx.js';
import { indexAt } from './lyrics.js';
import { DEFAULT_PALETTE } from './palette.js';
import { clickPlayer } from './track.js';

THREE.ColorManagement.enabled = false;

const SCENES = [
  { id: 'nebula', name: 'Nebula', Cls: NebulaScene },
  { id: 'terrain', name: 'Terrain', Cls: TerrainScene },
  { id: 'rings', name: 'Pulse', Cls: RingsScene },
  { id: 'tunnel', name: 'Tunnel', Cls: TunnelScene },
  { id: 'bars', name: 'Skyline', Cls: BarsScene },
  { id: 'crystal', name: 'Crystal', Cls: CrystalScene },
  { id: 'aurora', name: 'Aurora', Cls: AuroraScene },
];

const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ICON = {
  close: `<svg viewBox="0 0 24 24" ${S}><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  full: `<svg viewBox="0 0 24 24" ${S}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,
  lyrics: `<svg viewBox="0 0 24 24" ${S}><path d="M4 7h16M4 12h10M4 17h13"/></svg>`,
  ambient: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>`,
  center: `<svg viewBox="0 0 24 24" ${S}><rect x="6" y="4" width="12" height="12" rx="2"/><path d="M8 20h8"/></svg>`,
  caret: `<svg viewBox="0 0 24 24" ${S}><path d="M6 9l6 6 6-6"/></svg>`,
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 6h2v12H7zM20 6v12L10 12z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6h2v12h-2zM4 6v12l10-6z"/></svg>',
};

const fmt = (s) => {
  s = Math.max(0, Math.floor(s || 0));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
};

export class Overlay {
  constructor({ audio, getVideo, settings, onSettings }) {
    this.audio = audio;
    this.getVideo = getVideo;
    this.settings = settings;
    this.onSettings = onSettings;

    this.isOpen = false;
    this.root = null;
    this.renderer = null;
    this.scenes = {};
    this.time = 0;
    this.last = 0;
    this.w = 1;
    this.h = 1;
    this.shift = 0;
    this.effStyle = 'scroll';

    this.colors = DEFAULT_PALETTE.map((c) => new THREE.Color(c[0], c[1], c[2]));
    this.target = DEFAULT_PALETTE.map((c) => new THREE.Color(c[0], c[1], c[2]));
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    this.lines = [];
    this.plain = false;
    this.hasPanel = false;
    this.active = -2;
    this.bgLayer = 0;
    this._lastSec = -1;
    this._lastDur = -1;
    this._paused = null;
    this._idleTimer = null;
    this._toastTimer = null;
    this._loop = this._loop.bind(this);
  }

  /* ---------- DOM ---------- */
  build() {
    const root = document.createElement('div');
    root.id = 'ytmi-root';
    root.innerHTML = `
      <div class="ytmi-bg"><div class="ytmi-bgimg"></div><div class="ytmi-bgimg"></div></div>
      <canvas class="ytmi-gl"></canvas>
      <div class="ytmi-vignette"></div>
      <div class="ytmi-fx"></div>
      <div class="ytmi-lyrics"><div class="ytmi-lines"></div><div class="ytmi-msg"></div></div>
      <div class="ytmi-top">
        <div class="ytmi-menus"></div>
        <div class="ytmi-tools">
          <label class="ytmi-gain" title="Visual sensitivity"><span>Gain</span><input type="range" min="0.5" max="2" step="0.05"></label>
          <button class="ytmi-ibtn" data-act="lyrics" title="Lyrics (L)">${ICON.lyrics}</button>
          <button class="ytmi-ibtn" data-act="center" title="Centered cover (C)">${ICON.center}</button>
          <button class="ytmi-ibtn" data-act="ambient" title="Ambient background (A)">${ICON.ambient}</button>
          <button class="ytmi-ibtn" data-act="full" title="Fullscreen (F)">${ICON.full}</button>
          <button class="ytmi-ibtn" data-act="close" title="Close (Esc)">${ICON.close}</button>
        </div>
      </div>
      <div class="ytmi-info">
        <img class="ytmi-cover" alt="">
        <div class="ytmi-meta">
          <div class="ytmi-title"></div>
          <div class="ytmi-artist"></div>
          <div class="ytmi-prog"><span class="ytmi-t0">0:00</span><div class="ytmi-bar"><i></i></div><span class="ytmi-t1">0:00</span></div>
          <div class="ytmi-transport">
            <button class="ytmi-ibtn" data-act="prev" title="Previous">${ICON.prev}</button>
            <button class="ytmi-ibtn big" data-act="play" title="Play or pause">${ICON.pause}</button>
            <button class="ytmi-ibtn" data-act="next" title="Next">${ICON.next}</button>
          </div>
        </div>
      </div>
      <div class="ytmi-toast"></div>`;

    const q = (s) => root.querySelector(s);
    this.root = root;
    this.canvas = q('.ytmi-gl');
    this.bg = q('.ytmi-bg');
    this.bgImgs = [...root.querySelectorAll('.ytmi-bgimg')];
    this.fxEl = q('.ytmi-fx');
    this.linesEl = q('.ytmi-lines');
    this.msgEl = q('.ytmi-msg');
    this.lyricsEl = q('.ytmi-lyrics');
    this.menusEl = q('.ytmi-menus');
    this.coverEl = q('.ytmi-cover');
    this.titleEl = q('.ytmi-title');
    this.artistEl = q('.ytmi-artist');
    this.t0 = q('.ytmi-t0');
    this.t1 = q('.ytmi-t1');
    this.barEl = q('.ytmi-bar');
    this.barFill = q('.ytmi-bar i');
    this.playBtn = q('[data-act="play"]');
    this.toastEl = q('.ytmi-toast');
    this.gainEl = q('.ytmi-gain input');
    this.fx = new LyricFX(this.fxEl, this.audio);

    this.ddScene = this.makeDropdown('Scene', SCENES, (id) => this.setScene(id), true);
    this.ddText = this.makeDropdown('Text', LYRIC_STYLES, (id) => this.setLyricStyle(id), false);
    this.menusEl.append(this.ddScene, this.ddText);

    root.addEventListener('click', (e) => {
      if (!e.target.closest('.ytmi-dd')) this._closeMenus();
      const act = e.target.closest('[data-act]');
      if (act) return this.act(act.dataset.act);
      const line = e.target.closest('.ytmi-lines p[data-i]');
      if (line && !this.plain) {
        const v = this.getVideo();
        const l = this.lines[+line.dataset.i];
        if (v && l) v.currentTime = l.t;
      }
    });

    this.barEl.addEventListener('click', (e) => {
      const v = this.getVideo();
      if (!v || !isFinite(v.duration)) return;
      const r = this.barEl.getBoundingClientRect();
      v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * v.duration;
    });

    this.gainEl.addEventListener('input', () => {
      this.settings.gain = parseFloat(this.gainEl.value);
      this.onSettings(this.settings);
    });

    root.addEventListener('mousemove', (e) => {
      this.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      this._wake();
    });

    window.addEventListener('resize', () => this.isOpen && this.resize());
    document.addEventListener('fullscreenchange', () => this.isOpen && this.resize());
    this.applySettings(this.settings);
  }

  makeDropdown(label, items, onPick, numbered) {
    const wrap = document.createElement('div');
    wrap.className = 'ytmi-dd';
    wrap.innerHTML = `<button class="ytmi-pill ytmi-dd-btn" type="button"><span class="ytmi-dd-k">${label}</span><span class="ytmi-dd-v"></span>${ICON.caret}</button><div class="ytmi-dd-menu"></div>`;
    const menu = wrap.querySelector('.ytmi-dd-menu');
    items.forEach((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.id = it.id;
      b.innerHTML = `<span>${it.name}</span>${numbered ? `<kbd>${i + 1}</kbd>` : ''}`;
      menu.appendChild(b);
    });
    wrap.querySelector('.ytmi-dd-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !wrap.classList.contains('open');
      this._closeMenus();
      wrap.classList.toggle('open', open);
    });
    menu.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-id]');
      if (!b) return;
      e.stopPropagation();
      this._closeMenus();
      onPick(b.dataset.id);
    });
    return wrap;
  }

  _closeMenus() {
    if (!this.root) return false;
    let any = false;
    this.root.querySelectorAll('.ytmi-dd.open').forEach((d) => { d.classList.remove('open'); any = true; });
    return any;
  }

  _syncDropdown(dd, items, id) {
    const it = items.find((x) => x.id === id) || items[0];
    dd.querySelector('.ytmi-dd-v').textContent = it.name;
    dd.querySelectorAll('.ytmi-dd-menu button').forEach((b) => b.classList.toggle('on', b.dataset.id === it.id));
  }

  applySettings(s) {
    this.settings = s;
    if (!this.root) return;
    if (!SCENES.some((x) => x.id === s.scene)) s.scene = SCENES[0].id;
    if (!LYRIC_STYLES.some((x) => x.id === s.lyricStyle)) s.lyricStyle = 'scroll';
    this.root.classList.toggle('no-lyrics', !s.lyrics);
    this.root.classList.toggle('no-ambient', !s.ambient);
    this.root.classList.toggle('center-cover', !!s.centerCover);
    this.root.querySelector('[data-act="center"]').classList.toggle('on', !!s.centerCover);
    this.root.querySelector('[data-act="lyrics"]').classList.toggle('on', !!s.lyrics);
    this.root.querySelector('[data-act="ambient"]').classList.toggle('on', !!s.ambient);
    this.gainEl.value = String(s.gain);
    this._syncDropdown(this.ddScene, SCENES, s.scene);
    this._syncDropdown(this.ddText, LYRIC_STYLES, s.lyricStyle);
    this._applyLyricMode();
  }

  _applyLyricMode() {
    if (!this.root) return;
    const eff = this.lines.length ? this.settings.lyricStyle : 'scroll';
    this.effStyle = eff;
    const fxOn = eff !== 'scroll';
    this.root.classList.toggle('fx-on', fxOn);
    this.root.dataset.lyricStyle = eff;
    if (fxOn) this.fx.setStyle(eff);
  }

  act(name) {
    const s = this.settings;
    if (name === 'close') return this.close();
    if (name === 'full') return this.toggleFullscreen();
    if (name === 'lyrics') s.lyrics = !s.lyrics;
    else if (name === 'ambient') s.ambient = !s.ambient;
    else if (name === 'center') s.centerCover = !s.centerCover;
    else if (name === 'play') return clickPlayer('play');
    else if (name === 'next') return clickPlayer('next');
    else if (name === 'prev') return clickPlayer('prev');
    this.applySettings(s);
    this.onSettings(s);
  }

  setScene(id) {
    if (!SCENES.some((s) => s.id === id)) return;
    this.settings.scene = id;
    this.applySettings(this.settings);
    this.onSettings(this.settings);
    this.resize();
  }

  setLyricStyle(id) {
    if (!LYRIC_STYLES.some((s) => s.id === id)) return;
    this.settings.lyricStyle = id;
    if (!this.settings.lyrics) this.settings.lyrics = true;
    this.applySettings(this.settings);
    this.onSettings(this.settings);
    this.fx.relayout();
    if (!this.lines.length) this.toast('This style needs synced lyrics, showing Scroll for this track.');
  }

  cycleLyricStyle() {
    const i = LYRIC_STYLES.findIndex((s) => s.id === this.settings.lyricStyle);
    this.setLyricStyle(LYRIC_STYLES[(i + 1) % LYRIC_STYLES.length].id);
  }

  toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else this.root.requestFullscreen().catch(() => {});
  }

  handleKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return false;
    const k = e.key.toLowerCase();
    if (k === 'escape') {
      if (this._closeMenus()) return true;
      if (!document.fullscreenElement) this.close();
      return true;
    }
    if (k === 'f') { this.toggleFullscreen(); return true; }
    if (k === 'l') { this.act('lyrics'); return true; }
    if (k === 'a') { this.act('ambient'); return true; }
    if (k === 'c') { this.act('center'); return true; }
    if (k === 't') { this.cycleLyricStyle(); return true; }
    const n = parseInt(k, 10);
    if (n >= 1 && n <= SCENES.length) { this.setScene(SCENES[n - 1].id); return true; }
    return false;
  }

  toast(msg) {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.toastEl.classList.remove('show'), 5000);
  }

  _wake() {
    this.root.classList.remove('idle');
    clearTimeout(this._idleTimer);
    this._idleTimer = setTimeout(() => {
      if (this.root && !this.root.querySelector('.ytmi-dd.open')) this.root.classList.add('idle');
    }, 3200);
  }

  /* ---------- lifecycle ---------- */
  open() {
    if (this.isOpen) return;
    if (!this.root) this.build();
    document.body.appendChild(this.root);
    this.isOpen = true;
    if (!this.renderer) {
      try {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
        this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      } catch (e) {
        this.renderer = null;
        this.toast('WebGL is unavailable, showing ambient mode only.');
      }
    }
    this.resize();
    requestAnimationFrame(() => this.root.classList.add('open'));
    this._wake();
    this.last = performance.now();
    this._raf = requestAnimationFrame(this._loop);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    cancelAnimationFrame(this._raf);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    this._closeMenus();
    this.root.classList.remove('open');
    this.root.remove();
  }

  resize() {
    if (!this.root) return;
    this.w = Math.max(1, this.root.clientWidth || window.innerWidth);
    this.h = Math.max(1, this.root.clientHeight || window.innerHeight);
    if (this.fx) this.fx.relayout();
    if (!this.renderer) return;
    this.renderer.setSize(this.w, this.h, false);
    this.getScene().resize(this.w, this.h);
  }

  getScene() {
    const id = this.settings.scene;
    if (!this.scenes[id]) {
      const def = SCENES.find((s) => s.id === id) || SCENES[0];
      this.scenes[id] = new def.Cls({
        renderer: this.renderer,
        audio: this.audio,
        colors: this.colors,
        pointer: this.pointer,
      });
      this.scenes[id].resize(this.w, this.h);
    }
    return this.scenes[id];
  }

  /* ---------- content ---------- */
  setTrack(t) {
    if (!this.root) this.build();
    this.titleEl.textContent = t.title || 'Nothing playing';
    this.artistEl.textContent = [t.artist, t.album].filter(Boolean).join('  ·  ');
    if (t.cover && this.coverEl.dataset.src !== t.cover) {
      this.coverEl.dataset.src = t.cover;
      this.coverEl.src = t.cover;
      this.coverEl.style.visibility = 'visible';
      this.bgLayer ^= 1;
      const next = this.bgImgs[this.bgLayer];
      const prev = this.bgImgs[this.bgLayer ^ 1];
      next.style.backgroundImage = 'url("' + t.cover.replace(/"/g, '%22') + '")';
      next.classList.add('show');
      prev.classList.remove('show');
    } else if (!t.cover) {
      this.coverEl.style.visibility = 'hidden';
    }
    this.coverEl.onerror = () => { this.coverEl.style.visibility = 'hidden'; };
  }

  setPalette(p) {
    if (!this.root) this.build();
    p.forEach((c, i) => this.target[i].setRGB(c[0], c[1], c[2]));
    const css = (c) => `rgb(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)})`;
    this.root.style.setProperty('--a', css(p[0]));
    this.root.style.setProperty('--b', css(p[1]));
    this.root.style.setProperty('--c', css(p[2]));
  }

  setLyricsLoading() {
    this._resetLyrics();
    this.msgEl.textContent = 'Looking for lyrics';
    this.hasPanel = false;
    this._applyLyricMode();
  }

  setLyrics(data) {
    this._resetLyrics();
    if (data && data.synced && data.synced.length) {
      this.lines = data.synced;
      this.plain = false;
      this.lines.forEach((l, i) => {
        const p = document.createElement('p');
        p.dataset.i = String(i);
        p.dataset.d = '4';
        if (l.text) p.textContent = l.text;
        else { p.textContent = '♪'; p.className = 'empty'; }
        this.linesEl.appendChild(p);
      });
      this.linesEl.classList.remove('plain');
      this.msgEl.textContent = '';
      this.hasPanel = true;
      this.active = -2;
    } else if (data && data.plain) {
      this.plain = true;
      this.linesEl.classList.add('plain');
      data.plain.split(/\r?\n/).forEach((txt) => {
        const p = document.createElement('p');
        p.textContent = txt || ' ';
        this.linesEl.appendChild(p);
      });
      this.msgEl.textContent = '';
      this.hasPanel = true;
    } else {
      this.msgEl.textContent = 'No lyrics found for this track';
      this.hasPanel = false;
    }
    this.fx.setLines(this.lines);
    this._applyLyricMode();
  }

  _resetLyrics() {
    this.lines = [];
    this.plain = false;
    this.active = -2;
    this.linesEl.innerHTML = '';
    this.linesEl.style.transform = '';
    if (this.fx) this.fx.setLines([]);
  }

  _paintLyrics() {
    const idx = this.active;
    const ps = this.linesEl.children;
    for (let i = 0; i < ps.length; i++) ps[i].dataset.d = String(Math.min(4, Math.abs(i - idx)));
    const panelH = this.lyricsEl.clientHeight;
    const el = ps[Math.max(0, idx)];
    if (el) {
      const y = el.offsetTop + el.offsetHeight / 2;
      this.linesEl.style.transform = `translateY(${Math.round(panelH * 0.5 - y)}px)`;
    }
  }

  /* ---------- frame loop ---------- */
  _loop(now) {
    if (!this.isOpen) return;
    this._raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.1, (now - this.last) / 1000 || 0.016);
    this.last = now;
    this.time += dt;

    this.audio.gain = this.settings.gain;
    this.audio.update(dt);

    const k = 1 - Math.exp(-dt * 2.2);
    for (let i = 0; i < 3; i++) this.colors[i].lerp(this.target[i], k);
    const pk = 1 - Math.exp(-dt * 4);
    this.pointer.x += (this.pointer.tx - this.pointer.x) * pk;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * pk;

    this.root.style.setProperty('--beat', this.audio.beat.toFixed(3));
    this.root.style.setProperty('--bass', this.audio.bass.toFixed(3));

    if (this.renderer) {
      const sc = this.getScene();
      sc.update(this.time, dt);
      const want = this.settings.lyrics && !this.settings.centerCover && this.hasPanel && this.effStyle === 'scroll' && this.w > 900 ? 0.15 : 0;
      this.shift += (want - this.shift) * (1 - Math.exp(-dt * 4));
      if (this.shift > 0.002) sc.camera.setViewOffset(this.w, this.h, Math.round(this.w * this.shift), 0, this.w, this.h);
      else sc.camera.clearViewOffset();
      this.renderer.render(sc.scene, sc.camera);
    }

    this.bg.style.transform = `scale(${(1.1 + this.audio.bass * 0.07).toFixed(4)})`;
    this._tickUI(dt);
  }

  _tickUI(dt) {
    const v = this.getVideo();
    const cur = v ? v.currentTime : 0;
    const dur = v && isFinite(v.duration) ? v.duration : 0;

    const sec = Math.floor(cur);
    if (sec !== this._lastSec) { this._lastSec = sec; this.t0.textContent = fmt(cur); }
    const d = Math.floor(dur);
    if (d !== this._lastDur) { this._lastDur = d; this.t1.textContent = fmt(dur); }
    this.barFill.style.transform = `scaleX(${dur ? Math.min(1, cur / dur) : 0})`;

    const paused = v ? v.paused : true;
    if (paused !== this._paused) {
      this._paused = paused;
      this.playBtn.innerHTML = paused ? ICON.play : ICON.pause;
    }

    if (this.effStyle !== 'scroll' && this.lines.length) {
      if (this.settings.lyrics) this.fx.tick(cur, dt);
    } else if (this.lines.length && !this.plain) {
      const idx = indexAt(this.lines, cur + 0.2);
      if (idx !== this.active) { this.active = idx; this._paintLyrics(); }
    } else if (this.plain && dur) {
      const extra = Math.max(0, this.linesEl.scrollHeight - this.lyricsEl.clientHeight * 0.4);
      const y = this.lyricsEl.clientHeight * 0.4 - (cur / dur) * extra;
      this.linesEl.style.transform = `translateY(${Math.round(y)}px)`;
    }
  }
}
