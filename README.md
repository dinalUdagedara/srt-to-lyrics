# LyricSRT

A Next.js music player with **real-time synchronized lyrics** powered by standard `.srt` subtitle files — and the home of the [`srt-lyric-player`](https://www.npmjs.com/package/srt-lyric-player) npm package.

Think Spotify’s lyrics view, but driven by `.srt` files you already have.

**[Live Demo →](https://srt-to-lyrics-ebon.vercel.app/)**

---

## Features

- Real-time lyric sync from any `.srt` (URL or inline text)
- Playlist queue with demo tracks
- **Add your own songs** in the browser — drop audio + `.srt` (optional cover)
- Fullscreen lyrics view
- Live audio visualizer (Web Audio API + Canvas)
- Branded Open Graph / favicon metadata for clean share previews

---

## What’s in this repo

| Path | What it is |
|---|---|
| `/` (root) | **LyricSRT** — Next.js 15 demo app |
| `packages/srt-lyric-player/` | Standalone React npm package |

---

## npm package

```bash
npm install srt-lyric-player framer-motion howler
```

```tsx
import { MusicPlayer } from "srt-lyric-player";
import "srt-lyric-player/dist/index.css";

<MusicPlayer
  audioSrc="/song.mp3"
  srtSrc="/song.srt"
  albumArt="/cover.jpg"
  songName="Song Title"
  artistName="Artist"
  albumName="Album"
/>;
```

Full docs → [npmjs.com/package/srt-lyric-player](https://www.npmjs.com/package/srt-lyric-player)

---

## How it works

1. Parses `.srt` timestamps with [`srt-parser-2`](https://www.npmjs.com/package/srt-parser-2)
2. Plays audio with [Howler.js](https://howlerjs.com/) (HTML5 mode)
3. Maps `currentTime + 0.7s` look-ahead → current lyric each frame
4. Animates previous / current / next lyric over album art with [Framer Motion](https://www.framer.com/motion/)
5. Feeds audio into an `AnalyserNode` and draws the visualizer on `<canvas>`

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Animations | Framer Motion |
| Audio engine | Howler.js |
| SRT parsing | srt-parser-2 |
| Visualizer | Web Audio API + Canvas |
| Package bundler | tsup (ESM + CJS + types) |

---

## Run locally

```bash
git clone https://github.com/dinalUdagedara/srt-to-lyrics.git
cd srt-to-lyrics
npm install
npm run dev
```

Package watch mode:

```bash
cd packages/srt-lyric-player
npm run dev
```

### Add a demo song to the catalog

1. Drop `song.mp3`, `song.srt`, and cover art into `public/assets/`
2. Append an entry in `data/songs.ts`

Users can also add tracks at runtime via **+ Add** in the queue (session-only).

---

## Project structure

```
srt-to-lyrics/
  app/                      # Next.js app router + OG/favicon routes
  components/               # LyricSRT shell (playlist, add song, player)
  data/songs.ts             # Demo playlist catalog
  lib/                      # Brand + icon helpers
  public/assets/            # Sample audio, SRT, album art
  packages/
    srt-lyric-player/       # npm package
      src/components/       # MusicPlayer, visualizer, album cover, fullscreen
      src/hooks/            # useLyricsContext
      dist/                 # ESM + CJS + CSS
```

---

## License

MIT
