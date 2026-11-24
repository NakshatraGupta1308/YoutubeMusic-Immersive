# YT Music Immersive

A Chrome extension that turns music.youtube.com into a fullscreen, audio-reactive experience.

**Website and download:** https://nakshatragupta1308.github.io/YoutubeMusic-Immersive/

- **7 live 3D scenes** (three.js) in a Scene dropdown: Nebula (particle orb), Terrain (synthwave landscape), Pulse (radial rings), Tunnel (fly-through spectrum tube), Skyline (3D equalizer city), Crystal (displaced faceted gem), Aurora (flowing light ribbons)
- **9 lyric styles** in a Text dropdown: Scroll, Karaoke (word fill), Slam (words crash in), Poster (stacked words on a color block), Echo (repeating outline stack), Outline Glitch (RGB split on beats), Ticker (sliding giant rows), Typewriter, Editorial (italic serif)
- **Ambient background** built from the current album art, with accent colors pulled from the cover so every song looks different
- **Synced lyrics** (via LRCLIB), click any line to seek
- Beat detection, mouse parallax, crossfades between tracks
- Play, pause, previous, next and a seek bar inside the overlay

## Install (Windows, Chrome or Edge)

1. Get the code: `git clone https://github.com/NakshatraGupta1308/YoutubeMusic-Immersive.git`, or use **Code > Download ZIP** on GitHub and unzip it. Keep the folder somewhere permanent, because Chrome reads it from there each launch.
2. Open `chrome://extensions` and switch on **Developer mode** (top right).
3. Click **Load unpacked** and choose the `YoutubeMusic-Immersive` folder (the one that contains `manifest.json`).
4. Open https://music.youtube.com and play a song.
5. Click the new bars icon in the player bar (bottom right), or press **Alt+V**.

If the tab was already open when you installed the extension, refresh it once.

## Controls

| Key | Action |
| --- | --- |
| Alt+V | Open or close immersive mode |
| 1 to 7 | Switch scene |
| T | Cycle lyric style |
| L | Toggle lyrics |
| A | Toggle ambient background |
| F | Fullscreen |
| Esc | Close |

Move the mouse to bring the controls back; they fade out after a few seconds. The Gain slider changes how strongly the visuals react.

## Notes

- Audio is analysed locally in your browser. The only network request the extension makes is a lyrics lookup to lrclib.net (track title, artist, album and length).
- If you reload or update the extension while a YouTube Music tab is open, refresh that tab once. Chrome only lets a page's audio be hooked one time.
- Lyrics depend on the LRCLIB database. Some tracks only have unsynced text, which scrolls with the song, and some have none. The styles other than Scroll need synced lyrics and fall back to Scroll when a track only has plain text.
- Word timing inside a line is estimated from word length, because LRCLIB only provides line timestamps.
- Heavy on an old integrated GPU? Use the Pulse scene, which is the lightest.
- Fonts are bundled (Anton, Bebas Neue, Space Mono, Playfair Display), all under the SIL Open Font License.

## Rebuilding from source

The bundled `dist/content.js` is already built. To change the code:

```
npm install
npm run build
```

Then press the reload icon for the extension on `chrome://extensions`.

## Layout

- `manifest.json` extension config (Manifest V3)
- `background.js` lyrics fetching
- `styles.css` overlay styling
- `src/content.js` entry point, track watching, hotkeys, launcher button
- `src/overlay.js` overlay UI and render loop
- `src/audio.js` Web Audio analysis and beat detection
- `src/palette.js` album art color extraction
- `src/lyrics.js` LRC parsing
- `src/lyricfx.js` the lyric typography styles
- `src/fonts.js` embedded fonts
- `src/scenes/` the seven visualizer scenes
- `docs/` the project website (served by GitHub Pages) and the downloadable extension zip

## Credits

- [three.js](https://threejs.org) (MIT) for the 3D scenes
- [LRCLIB](https://lrclib.net) for synced lyrics
- Fonts from [Fontsource](https://fontsource.org) (SIL Open Font License)

This is an unofficial project and is not affiliated with YouTube or Google.

## License

MIT, see [LICENSE](LICENSE).
