// Reads what is currently playing from the YouTube Music page.
function upgradeArt(url) {
  if (!url) return '';
  return url.replace(/=w\d+-h\d+[^&\s]*/, '=w720-h720-l90-rj').replace(/=s\d+[^&\s]*/, '=s720');
}

export function getVideo() {
  return document.querySelector('video');
}

export function readTrack() {
  let title = '', artist = '', album = '', cover = '';

  try {
    const md = navigator.mediaSession && navigator.mediaSession.metadata;
    if (md) {
      title = md.title || '';
      artist = md.artist || '';
      album = md.album || '';
      const art = md.artwork && md.artwork.length ? md.artwork[md.artwork.length - 1].src : '';
      cover = art || '';
    }
  } catch (_) { /* fall back to DOM */ }

  const bar = document.querySelector('ytmusic-player-bar');
  if (bar) {
    if (!title) {
      const el = bar.querySelector('.title');
      title = el ? el.textContent.trim() : '';
    }
    if (!artist) {
      const el = bar.querySelector('.byline');
      if (el) {
        const parts = el.textContent.split('•').map((s) => s.trim()).filter(Boolean);
        artist = parts[0] || '';
        if (!album && parts[1] && !/views|likes|plays/i.test(parts[1]) && !/^\d{4}$/.test(parts[1])) album = parts[1];
      }
    }
    if (!cover) {
      const img = bar.querySelector('img.image') || bar.querySelector('#thumbnail img') || bar.querySelector('img');
      cover = img ? img.src : '';
    }
  }

  cover = upgradeArt(cover);
  return { title, artist, album, cover, key: [title, artist, cover].join('|') };
}

export function clickPlayer(kind) {
  const sel = {
    play: 'ytmusic-player-bar .play-pause-button, ytmusic-player-bar #play-pause-button',
    next: 'ytmusic-player-bar .next-button',
    prev: 'ytmusic-player-bar .previous-button',
  }[kind];
  const btn = sel && document.querySelector(sel);
  if (btn) { btn.click(); return true; }
  if (kind === 'play') {
    const v = getVideo();
    if (v) { v.paused ? v.play() : v.pause(); return true; }
  }
  return false;
}
