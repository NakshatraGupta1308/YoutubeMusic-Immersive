import { AudioEngine } from './audio.js';
import { Overlay } from './overlay.js';
import { readTrack, getVideo } from './track.js';
import { paletteFromImage } from './palette.js';
import { requestLyrics } from './lyrics.js';
import { loadFonts } from './fonts.js';

(function main() {
  if (window.__ytmiLoaded) return;
  window.__ytmiLoaded = true;

  const DEFAULTS = { scene: 'nebula', lyricStyle: 'scroll', lyrics: true, ambient: true, centerCover: false, gain: 1 };
  const settings = Object.assign({}, DEFAULTS);
  const audio = new AudioEngine();

  const ready = new Promise((resolve) => {
    try {
      chrome.storage.local.get('ytmi', (r) => {
        if (r && r.ytmi) Object.assign(settings, r.ytmi);
        resolve();
      });
    } catch (_) {
      resolve();
    }
  });

  const overlay = new Overlay({
    audio,
    getVideo,
    settings,
    onSettings: (s) => {
      try { chrome.storage.local.set({ ytmi: s }); } catch (_) { /* storage unavailable */ }
    },
  });

  /* ----- track tracking ----- */
  let lyricKey = '';
  let coverKey = '';
  let token = 0;

  function waitDuration(ms) {
    return new Promise((resolve) => {
      const t0 = performance.now();
      (function poll() {
        const v = getVideo();
        if (v && isFinite(v.duration) && v.duration > 0) return resolve(v.duration);
        if (performance.now() - t0 > ms) return resolve(NaN);
        setTimeout(poll, 150);
      })();
    });
  }

  async function refresh(force) {
    const t = readTrack();
    if (!t.title) return;
    const lk = t.title + '|' + t.artist;
    const lyricsChanged = force || lk !== lyricKey;
    const coverChanged = force || t.cover !== coverKey;
    if (!lyricsChanged && !coverChanged) return;

    overlay.setTrack(t);

    if (coverChanged) {
      coverKey = t.cover;
      const mine = coverKey;
      paletteFromImage(t.cover, lk).then((p) => { if (coverKey === mine) overlay.setPalette(p); });
    }

    if (lyricsChanged) {
      lyricKey = lk;
      const my = ++token;
      overlay.setLyricsLoading();
      const dur = await waitDuration(2500);
      if (my !== token) return;
      const data = await requestLyrics(t, dur);
      if (my !== token) return;
      overlay.setLyrics(data);
    }
  }

  setInterval(() => { if (overlay.isOpen) refresh(false); }, 700);

  /* ----- open / close ----- */
  async function openOverlay() {
    await Promise.all([ready, loadFonts()]);
    const v = getVideo();
    const ok = v ? audio.attach(v) : false;
    overlay.open();
    if (!v) overlay.toast('Start a song first, then reopen immersive mode.');
    else if (!ok) overlay.toast('Could not hook the audio. Reload this tab once and try again.');
    refresh(true);
  }

  function toggle() {
    if (overlay.isOpen) overlay.close();
    else openOverlay();
  }

  /* ----- keyboard ----- */
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === 'KeyV') {
        e.preventDefault();
        e.stopPropagation();
        toggle();
        return;
      }
      if (!overlay.isOpen) return;
      const el = e.target;
      const typing = el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
      if (typing && !(el.type === 'range')) return;
      if (overlay.handleKey(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  /* ----- launcher button ----- */
  const BTN_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M22 12h-1"/></svg>';

  function findHost() {
    return (
      document.querySelector('ytmusic-player-bar .right-controls-buttons') ||
      document.querySelector('ytmusic-player-bar .right-controls')
    );
  }

  function ensureButton() {
    const host = findHost();
    let b = document.getElementById('ytmi-btn');
    if (b && host && b.classList.contains('ytmi-btn-float')) { b.remove(); b = null; }
    if (b) return;
    b = document.createElement('button');
    b.id = 'ytmi-btn';
    b.type = 'button';
    b.title = 'Immersive mode (Alt+V)';
    b.innerHTML = BTN_SVG;
    b.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    if (host) { b.className = 'ytmi-btn-inline'; host.prepend(b); }
    else { b.className = 'ytmi-btn-float'; document.body.appendChild(b); }
  }

  ensureButton();
  setInterval(ensureButton, 1500);
})();
