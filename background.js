// Fetches time-synced lyrics from LRCLIB (https://lrclib.net), a free public lyrics database.
const BASE = 'https://lrclib.net/api/';
const cache = new Map();

chrome.runtime.onMessage.addListener((msg, _sender, send) => {
  if (msg && msg.type === 'ytmi:lyrics') {
    fetchLyrics(msg).then(send).catch(() => send({ ok: false }));
    return true; // async response
  }
  return false;
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastCall = 0;

// LRCLIB asks clients to identify themselves and to space requests out.
async function getJSON(url) {
  const wait = lastCall + 250 - Date.now();
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  const r = await fetch(url, { headers: { 'Lrclib-Client': 'ytm-immersive v1.0.0' } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

const qs = (o) => new URLSearchParams(o).toString();

async function fetchLyrics({ title, artist, album, duration }) {
  const key = [title, artist, Math.round(duration || 0)].join('|');
  if (cache.has(key)) return cache.get(key);

  let out = { ok: false };
  const firstArtist = (artist || '').split(/\s*(?:,|&|\bfeat\.?|\bft\.?|\bx\b)\s*/i)[0];

  const exact = (a, withAlbum) => {
    const p = { track_name: title, artist_name: a };
    if (withAlbum && album) p.album_name = album;
    if (duration && isFinite(duration)) p.duration = Math.round(duration);
    return BASE + 'get?' + qs(p);
  };

  const urls = [exact(artist, true), exact(artist, false)];
  if (firstArtist && firstArtist !== artist) urls.push(exact(firstArtist, false));

  for (const u of urls) {
    try {
      const d = await getJSON(u);
      if (d && (d.syncedLyrics || d.plainLyrics)) {
        out = { ok: true, synced: d.syncedLyrics || '', plain: d.plainLyrics || '' };
        break;
      }
    } catch (_) { /* try next */ }
  }

  if (!out.ok) {
    try {
      const list = await getJSON(BASE + 'search?' + qs({ q: (title + ' ' + (firstArtist || '')).trim() }));
      if (Array.isArray(list) && list.length) {
        const withSync = list.filter((x) => x.syncedLyrics);
        const pool = withSync.length ? withSync : list.filter((x) => x.plainLyrics);
        if (pool.length) {
          pool.sort((a, b) => Math.abs((a.duration || 0) - duration) - Math.abs((b.duration || 0) - duration));
          const best = pool[0];
          if (!isFinite(duration) || Math.abs((best.duration || 0) - duration) <= 3) {
            out = { ok: true, synced: best.syncedLyrics || '', plain: best.plainLyrics || '' };
          }
        }
      }
    } catch (_) { /* give up */ }
  }

  cache.set(key, out);
  if (cache.size > 200) cache.delete(cache.keys().next().value);
  return out;
}
