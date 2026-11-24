import { indexAt } from './lyrics.js';

export const LYRIC_STYLES = [
  { id: 'scroll', name: 'Scroll' },
  { id: 'karaoke', name: 'Karaoke' },
  { id: 'slam', name: 'Slam' },
  { id: 'poster', name: 'Poster' },
  { id: 'echo', name: 'Echo' },
  { id: 'glitch', name: 'Outline Glitch' },
  { id: 'ticker', name: 'Ticker' },
  { id: 'type', name: 'Typewriter' },
  { id: 'serif', name: 'Editorial' },
];

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

// Lyrics only carry line timestamps, so words are spread across the line by length.
export function wordTimes(text) {
  const ws = text.split(/\s+/).filter(Boolean);
  const wt = ws.map((w) => Math.max(2, w.length) + 1);
  const tot = wt.reduce((a, b) => a + b, 0) || 1;
  const USE = 0.86;
  let acc = 0;
  return ws.map((w, i) => {
    const a = (acc / tot) * USE;
    acc += wt[i];
    return { w, a, b: (acc / tot) * USE };
  });
}

// Largest font size (from a descending list) at which the block fits the box.
function fitBlock(el, maxW, maxH, sizes) {
  el.style.maxWidth = maxW + 'px';
  for (const s of sizes) {
    el.style.fontSize = s + 'px';
    if (el.scrollWidth <= maxW + 1 && el.scrollHeight <= maxH) return s;
  }
  el.style.fontSize = sizes[sizes.length - 1] + 'px';
  return sizes[sizes.length - 1];
}

const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);

class Base {
  constructor(fx) {
    this.fx = fx;
    this.el = document.createElement('div');
    this.el.className = 'fx fx-' + this.constructor.cls;
    fx.host.appendChild(this.el);
  }
  text(idx) {
    const l = this.fx.lines[idx];
    return l && l.text ? l.text : '';
  }
  onLine() {}
  frame() {}
  destroy() { this.el.remove(); }
}

/* ---------- Karaoke: big centered line that fills word by word ---------- */
class Karaoke extends Base {
  static cls = 'karaoke';
  onLine(idx) {
    this.el.innerHTML = '';
    this.words = [];
    const cur = this.text(idx);
    const prev = this.text(idx - 1);
    const next = this.text(idx + 1);
    const mk = (cls, t) => {
      const d = document.createElement('div');
      d.className = cls;
      d.textContent = t;
      return d;
    };
    this.el.appendChild(mk('k-prev', prev));
    const line = document.createElement('div');
    line.className = 'k-cur';
    wordTimes(cur).forEach((t) => {
      const s = document.createElement('span');
      s.className = 'k-w';
      s.textContent = t.w;
      s.style.setProperty('--f', '0');
      line.appendChild(s);
      this.words.push({ el: s, a: t.a, b: t.b, f: 0 });
    });
    this.el.appendChild(line);
    this.el.appendChild(mk('k-next', next));
    fitBlock(line, innerWidth * 0.86, innerHeight * 0.34, [170, 145, 124, 106, 90, 76, 64, 54, 46, 38]);
  }
  frame({ p }) {
    for (const w of this.words) {
      const f = Math.round(clamp((p - w.a) / Math.max(0.02, w.b - w.a)) * 100) / 100;
      if (f !== w.f) { w.f = f; w.el.style.setProperty('--f', String(f)); }
    }
  }
}

/* ---------- Slam: words crash in one at a time, huge and rotated ---------- */
const SLAM_COLORS = ['#fff', 'var(--a)', '#fff', 'var(--c)', 'var(--b)'];
class Slam extends Base {
  static cls = 'slam';
  onLine(idx) {
    this.el.innerHTML = '';
    this.words = [];
    const txt = this.text(idx);
    if (!txt) return;
    const wrap = document.createElement('div');
    wrap.className = 's-line';
    const rnd = (n) => { const x = Math.sin(idx * 91.7 + n * 12.9898) * 43758.5453; return x - Math.floor(x); };
    wordTimes(txt).forEach((t, i) => {
      const s = document.createElement('span');
      s.className = 's-w';
      s.textContent = t.w;
      s.style.setProperty('--r', ((rnd(i) - 0.5) * 8).toFixed(1) + 'deg');
      s.style.color = SLAM_COLORS[(i + idx) % SLAM_COLORS.length];
      wrap.appendChild(s);
      this.words.push({ el: s, a: t.a, on: false });
    });
    this.el.appendChild(wrap);
    fitBlock(wrap, innerWidth * 0.88, innerHeight * 0.62, [230, 195, 165, 140, 118, 100, 86, 74, 64, 54, 46, 38]);
  }
  frame({ p }) {
    for (const w of this.words) {
      const on = p >= w.a;
      if (on !== w.on) { w.on = on; w.el.classList.toggle('in', on); }
    }
  }
}

/* ---------- Poster: stacked words fitted to a colored block ---------- */
const POSTER = [
  ['var(--a)', '#0b0b0b', '#fff'],
  ['#f1efe9', '#0b0b0b', 'var(--a)'],
  ['#0b0b0b', '#fff', 'var(--c)'],
  ['var(--b)', '#fff', '#0b0b0b'],
  ['var(--c)', '#0b0b0b', '#fff'],
];
class Poster extends Base {
  static cls = 'poster';
  onLine(idx) {
    this.el.innerHTML = '';
    this.rows = [];
    const txt = this.text(idx);
    if (!txt) return;
    const tw = wordTimes(txt);
    const groups = [];
    for (let i = 0; i < tw.length; i++) {
      const g = [tw[i]];
      if (i + 1 < tw.length && (tw[i].w.length <= 3 || tw[i + 1].w.length <= 3) && tw[i].w.length + tw[i + 1].w.length <= 9) {
        g.push(tw[++i]);
      }
      groups.push(g);
    }
    while (groups.length > 5) { const a = groups.pop(); groups[groups.length - 1].push(...a); }

    const pal = POSTER[idx % POSTER.length];
    const block = document.createElement('div');
    block.className = 'p-block';
    block.style.background = pal[0];
    block.style.setProperty('--rot', ((idx % 2 ? 1 : -1) * (1 + (idx % 3) * 0.6)).toFixed(1) + 'deg');
    const BW = Math.min(innerWidth * 0.42, 640);
    block.style.width = BW + 'px';

    groups.forEach((g, gi) => {
      const row = document.createElement('div');
      row.className = 'p-row';
      row.style.color = gi % 2 ? pal[2] : pal[1];
      const t = document.createElement('span');
      t.textContent = g.map((x) => x.w).join(' ');
      row.appendChild(t);
      block.appendChild(row);
      this.rows.push({ el: row, t, a: g[0].a, on: false });
    });
    this.el.appendChild(block);

    const inner = BW - 44;
    for (const r of this.rows) {
      r.t.style.fontSize = '100px';
      const w = r.t.offsetWidth || 1;
      r.t.style.fontSize = clamp((100 * inner) / w, 26, 170) + 'px';
    }
    const H = block.offsetHeight;
    const maxH = innerHeight * 0.54;
    if (H > maxH) {
      const k = maxH / H;
      for (const r of this.rows) r.t.style.fontSize = parseFloat(r.t.style.fontSize) * k + 'px';
    }
  }
  frame({ p }) {
    for (const r of this.rows) {
      const on = p >= r.a;
      if (on !== r.on) { r.on = on; r.el.classList.toggle('in', on); }
    }
  }
}

/* ---------- Echo: one giant line repeated above and below, fading out ---------- */
class Echo extends Base {
  static cls = 'echo';
  onLine(idx) {
    this.el.innerHTML = '';
    this.rows = [];
    this.stack = null;
    const txt = this.text(idx);
    if (!txt) return;
    this.t0 = performance.now();
    const stack = document.createElement('div');
    stack.className = 'e-stack';
    this.stack = stack;
    const maxW = innerWidth * 0.9;

    const probe = document.createElement('div');
    probe.className = 'e-row main';
    probe.textContent = txt;
    stack.appendChild(probe);
    this.el.appendChild(stack);
    const size = fitBlock(probe, maxW, innerHeight * 0.26, [210, 180, 152, 130, 112, 96, 82, 70, 60, 50, 42]);
    const h = probe.offsetHeight;
    probe.remove();

    stack.style.setProperty('--h', h + 'px');
    [-3, -2, -1, 0, 1, 2, 3].forEach((o) => {
      const r = document.createElement('div');
      r.className = 'e-row' + (o === 0 ? ' main' : '');
      r.textContent = txt;
      r.style.fontSize = size + 'px';
      r.style.maxWidth = maxW + 'px';
      r.style.setProperty('--o', String(o));
      r.style.opacity = o === 0 ? '1' : String(Math.max(0.1, 0.6 - Math.abs(o) * 0.15));
      stack.appendChild(r);
    });
  }
  frame() {
    if (!this.stack) return;
    const grow = ease((performance.now() - this.t0) / 380);
    this.stack.style.setProperty('--sp', (grow * (0.64 + this.fx.audio.beat * 0.09)).toFixed(3));
  }
}

/* ---------- Outline Glitch: hollow letters that fill in, RGB split on beats ---------- */
class Glitch extends Base {
  static cls = 'glitch';
  onLine(idx) {
    this.el.innerHTML = '';
    this.layers = [];
    this.words = [];
    this.wrap = null;
    const txt = this.text(idx);
    if (!txt) return;
    const tw = wordTimes(txt);
    const wrap = document.createElement('div');
    wrap.className = 'g-wrap';
    ['r', 'c', 'm'].forEach((k) => {
      const layer = document.createElement('div');
      layer.className = 'g-layer g-' + k;
      tw.forEach((t) => {
        const s = document.createElement('span');
        s.textContent = t.w;
        layer.appendChild(s);
      });
      wrap.appendChild(layer);
      this.layers.push(layer);
    });
    this.words = tw.map((t) => ({ a: t.a, on: false }));
    this.wrap = wrap;
    this.el.appendChild(wrap);
    fitBlock(wrap, innerWidth * 0.86, innerHeight * 0.58, [210, 180, 154, 132, 114, 98, 84, 72, 62, 52, 44]);
  }
  frame({ p }) {
    if (!this.wrap) return;
    this.words.forEach((w, i) => {
      const on = p >= w.a;
      if (on !== w.on) {
        w.on = on;
        for (const l of this.layers) l.children[i].classList.toggle('on', on);
      }
    });
    const b = this.fx.audio.beat;
    const j = b > 0.25 ? (Math.random() - 0.5) * b * 26 : 0;
    this.layers[0].style.transform = `translate(${j.toFixed(1)}px, ${(j * 0.2).toFixed(1)}px)`;
    this.layers[1].style.transform = `translate(${(-j).toFixed(1)}px, ${(-j * 0.2).toFixed(1)}px)`;
    this.wrap.style.transform = b > 0.6 ? `skewX(${((Math.random() - 0.5) * 7).toFixed(1)}deg)` : '';
  }
}

/* ---------- Ticker: giant outlined rows sliding past, one solid row in the middle ---------- */
class Ticker extends Base {
  static cls = 'ticker';
  onLine(idx) {
    this.el.innerHTML = '';
    this.rows = [];
    const txt = this.text(idx);
    if (!txt) return;
    const text = txt.toUpperCase() + '   •   ';
    const fs = Math.round(innerHeight * 0.17);
    for (let i = 0; i < 5; i++) {
      const row = document.createElement('div');
      row.className = 't-row' + (i === 2 ? ' main' : '');
      row.style.fontSize = fs + 'px';
      row.style.top = `calc(50% + ${((i - 2) * fs * 0.88).toFixed(0)}px)`;
      row.style.opacity = i === 2 ? '1' : String(0.55 - Math.abs(i - 2) * 0.17);
      const track = document.createElement('div');
      track.className = 't-track';
      const probe = document.createElement('span');
      probe.textContent = text;
      track.appendChild(probe);
      row.appendChild(track);
      this.el.appendChild(row);
      const copyW = Math.max(200, probe.offsetWidth);
      track.textContent = text.repeat(Math.ceil(innerWidth / copyW) + 2);
      this.rows.push({ track, copyW, dir: i % 2 ? 1 : -1, off: Math.random() * copyW, speed: 70 + i * 22 });
    }
  }
  frame({ dt }) {
    const a = this.fx.audio;
    for (const r of this.rows) {
      r.off += r.dir * (r.speed + a.level * 520 + a.beat * 260) * dt;
      const m = ((r.off % r.copyW) + r.copyW) % r.copyW;
      r.track.style.transform = `translateX(${(-r.copyW - m).toFixed(1)}px)`;
    }
  }
}

/* ---------- Typewriter: terminal style, last few lines stay above ---------- */
class TypeFx extends Base {
  static cls = 'type';
  onLine(idx) {
    this.el.innerHTML = '';
    const lines = this.fx.lines;
    const box = document.createElement('div');
    box.className = 'ty-box';
    for (let k = Math.max(0, idx - 3); k < idx; k++) {
      if (!lines[k].text) continue;
      const d = document.createElement('div');
      d.className = 'ty-line old';
      d.textContent = '> ' + lines[k].text;
      box.appendChild(d);
    }
    const cur = document.createElement('div');
    cur.className = 'ty-line cur';
    this.node = document.createTextNode('');
    const caret = document.createElement('span');
    caret.className = 'ty-caret';
    cur.append(this.node, caret);
    box.appendChild(cur);
    this.el.appendChild(box);
    const t = this.text(idx);
    this.full = t ? '> ' + t : '';
    this.n = -1;
  }
  frame({ p }) {
    const n = Math.floor(clamp(p / 0.8) * this.full.length);
    if (n !== this.n) { this.n = n; this.node.nodeValue = this.full.slice(0, n); }
  }
}

/* ---------- Editorial: lowercase italic serif, words drift in ---------- */
class Serif extends Base {
  static cls = 'serif';
  onLine(idx) {
    this.el.innerHTML = '';
    this.words = [];
    this.rule = null;
    const txt = this.text(idx);
    if (!txt) return;
    const wrap = document.createElement('div');
    wrap.className = 'sf-line';
    wordTimes(txt).forEach((t, i) => {
      const s = document.createElement('span');
      s.className = 'sf-w' + (i % 3 === 2 ? ' acc' : '');
      s.textContent = t.w;
      wrap.appendChild(s);
      this.words.push({ el: s, a: t.a, on: false });
    });
    this.rule = document.createElement('i');
    this.rule.className = 'sf-rule';
    this.el.append(wrap, this.rule);
    fitBlock(wrap, innerWidth * 0.78, innerHeight * 0.5, [120, 104, 90, 78, 68, 58, 50, 42, 36, 30]);
  }
  frame({ p }) {
    for (const w of this.words) {
      const on = p >= w.a;
      if (on !== w.on) { w.on = on; w.el.classList.toggle('in', on); }
    }
    if (this.rule) this.rule.style.transform = `scaleX(${clamp(p / 0.86).toFixed(3)})`;
  }
}

const STYLE_MAP = { karaoke: Karaoke, slam: Slam, poster: Poster, echo: Echo, glitch: Glitch, ticker: Ticker, type: TypeFx, serif: Serif };

export class LyricFX {
  constructor(host, audio) {
    this.host = host;
    this.audio = audio;
    this.lines = [];
    this.id = null;
    this.inst = null;
    this.idx = -2;
  }

  setLines(lines) {
    this.lines = lines || [];
    this.idx = -2;
  }

  setStyle(id) {
    if (this.id === id) return;
    if (this.inst) this.inst.destroy();
    this.host.textContent = '';
    this.id = id;
    const C = STYLE_MAP[id];
    this.inst = C ? new C(this) : null;
    this.idx = -2;
  }

  relayout() {
    this.idx = -2;
  }

  tick(cur, dt) {
    if (!this.inst || !this.lines.length) return;
    const t = cur + 0.12;
    const idx = indexAt(this.lines, t);
    if (idx !== this.idx) {
      this.idx = idx;
      this.inst.onLine(idx);
    }
    const l = this.lines[idx];
    let p = 0;
    let dur = 1;
    if (l) {
      const next = this.lines[idx + 1];
      dur = Math.max(0.5, Math.min((next ? next.t : l.t + 5) - l.t, 9));
      p = clamp((t - l.t) / dur);
    }
    this.inst.frame({ cur, dt, idx, p, dur });
  }
}
