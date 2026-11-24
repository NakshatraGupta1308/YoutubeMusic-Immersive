// LRC parsing and lookup helpers.
export function parseLRC(text) {
  const out = [];
  if (!text) return out;
  for (const raw of text.split(/\r?\n/)) {
    const stamps = [...raw.matchAll(/\[(\d{1,3}):(\d{1,2}(?:[.:]\d{1,3})?)\]/g)];
    if (!stamps.length) continue;
    const body = raw
      .replace(/^(\s*\[\d{1,3}:\d{1,2}(?:[.:]\d{1,3})?\])+/, '')
      .replace(/<\d+:\d+(?:\.\d+)?>/g, '')
      .trim();
    for (const m of stamps) {
      out.push({ t: parseInt(m[1], 10) * 60 + parseFloat(m[2].replace(':', '.')), text: body });
    }
  }
  out.sort((a, b) => a.t - b.t);
  return out;
}

// Index of the last line whose time is <= t, or -1.
export function indexAt(lines, t) {
  let lo = 0, hi = lines.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lines[mid].t <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1;
  }
  return ans;
}

const NOISE = /\s*[\(\[][^)\]]*(official|video|audio|lyrics?|visuali[sz]er|hd|4k|remaster(ed)?|explicit|clean)[^)\]]*[\)\]]/gi;

export function cleanTitle(t) {
  return (t || '').replace(NOISE, '').replace(/\s+-\s+(remaster(ed)?|single version).*$/i, '').trim();
}

export function requestLyrics(track, duration) {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        {
          type: 'ytmi:lyrics',
          title: cleanTitle(track.title),
          artist: track.artist,
          album: track.album,
          duration,
        },
        (res) => {
          if (chrome.runtime.lastError || !res || !res.ok) return resolve(null);
          resolve({ synced: parseLRC(res.synced), plain: res.plain || '' });
        }
      );
    } catch (_) {
      resolve(null);
    }
  });
}
