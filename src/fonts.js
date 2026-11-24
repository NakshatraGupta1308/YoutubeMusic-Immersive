// Fonts are embedded in the bundle and registered from memory, so they work on any page
// regardless of its content security policy and need no network access.
import anton from '../fonts/anton.woff2';
import bebas from '../fonts/bebas.woff2';
import mono from '../fonts/mono.woff2';
import monoBold from '../fonts/mono-bold.woff2';
import serif from '../fonts/serif.woff2';

const FACES = [
  ['YTMI Anton', anton, '400', 'normal'],
  ['YTMI Bebas', bebas, '400', 'normal'],
  ['YTMI Mono', mono, '400', 'normal'],
  ['YTMI Mono', monoBold, '700', 'normal'],
  ['YTMI Serif', serif, '700', 'italic'],
];

let loading = null;

export function loadFonts() {
  if (loading) return loading;
  loading = Promise.all(
    FACES.map(async ([family, b64, weight, style]) => {
      try {
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const face = new FontFace(family, bytes.buffer, { weight, style });
        await face.load();
        document.fonts.add(face);
      } catch (_) { /* fall back to system fonts */ }
    })
  );
  return loading;
}
