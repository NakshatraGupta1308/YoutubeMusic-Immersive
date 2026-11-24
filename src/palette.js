// Pulls three vivid accent colors out of the album art. Colors are [r,g,b] in 0..1.
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

function rgb2hsv(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d > 0) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  return [h, mx === 0 ? 0 : d / mx, mx];
}

function hsv2rgb(h, s, v) {
  const i = Math.floor(h * 6), f = h * 6 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    default: return [v, p, q];
  }
}

function vivid([h, s, v]) {
  return hsv2rgb((h + 1) % 1, clamp(s * 1.1, 0.5, 1), clamp(Math.max(v, 0.85), 0.85, 1));
}

export const DEFAULT_PALETTE = [vivid([0.6, 0.7, 1]), vivid([0.8, 0.65, 1]), vivid([0.03, 0.6, 1])];

export function paletteFromString(str) {
  let h = 7;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const hue = (h % 360) / 360;
  return [vivid([hue, 0.75, 1]), vivid([(hue + 0.13) % 1, 0.7, 1]), vivid([(hue + 0.55) % 1, 0.6, 1])];
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image failed'));
    img.src = url;
  });
}

export async function paletteFromImage(url, seed) {
  try {
    const img = await loadImage(url);
    const S = 40;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, S, S);
    const px = g.getImageData(0, 0, S, S).data;

    const N = 18;
    const bins = Array.from({ length: N }, () => ({ w: 0, r: 0, g: 0, b: 0, h: 0, s: 0 }));
    let total = 0;
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i] / 255, gg = px[i + 1] / 255, b = px[i + 2] / 255;
      const [h, s, v] = rgb2hsv(r, gg, b);
      if (v < 0.18) continue;
      let w = (0.15 + s) * (0.4 + v);
      if (s < 0.15) w *= 0.15;
      const bin = bins[Math.floor(h * N) % N];
      bin.w += w; bin.r += r * w; bin.g += gg * w; bin.b += b * w;
      total += w;
    }
    if (total < 2) return paletteFromString(seed || url);

    const ranked = bins.map((b, idx) => ({ ...b, idx })).filter((b) => b.w > total * 0.03).sort((a, b) => b.w - a.w);
    const chosen = [];
    for (const b of ranked) {
      const far = chosen.every((c) => {
        const d = Math.abs(c.idx - b.idx);
        return Math.min(d, N - d) >= 2;
      });
      if (far) chosen.push(b);
      if (chosen.length === 3) break;
    }
    if (!chosen.length) return paletteFromString(seed || url);

    const hsvs = chosen.map((b) => rgb2hsv(b.r / b.w, b.g / b.w, b.b / b.w));
    while (hsvs.length < 3) {
      const base = hsvs[0];
      hsvs.push([(base[0] + (hsvs.length === 1 ? 0.1 : 0.55)) % 1, base[1], base[2]]);
    }
    return hsvs.map(vivid);
  } catch (_) {
    return paletteFromString(seed || url || 'x');
  }
}
