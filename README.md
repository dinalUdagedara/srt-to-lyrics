# srt-to-lyrics

A Next.js music player with **real-time synchronized lyrics** powered by standard `.srt` subtitle files — and the home of the [`srt-lyric-player`](https://www.npmjs.com/package/srt-lyric-player) npm package.

**[Live Demo →](https://srt-to-lyrics-ebon.vercel.app/)**

---

## What this repo contains

This is a monorepo with two things:

| Path | What it is |
|---|---|
| `/` (root) | Next.js 15 demo app — a live showcase of the player |
| `packages/srt-lyric-player/` | The standalone npm package anyone can install |

---

## npm package

```bash
npm install srt-lyric-player framer-motion howler
```

```tsx
import { MusicPlayer } from 'srt-lyric-player'
import 'srt-lyric-player/dist/index.css'

<MusicPlayer
  audioSrc="/song.mp3"
  srtSrc="/song.srt"
  albumArt="/cover.jpg"
  songName="Song Title"
  artistName="Artist"
  albumName="Album"
/>
```

Full docs → [npmjs.com/package/srt-lyric-player](https://www.npmjs.com/package/srt-lyric-player)

---

## How it works

1. Parses `.srt` timestamps using [`srt-parser-2`](https://www.npmjs.com/package/srt-parser-2)
2. Drives audio playback with [Howler.js](https://howlerjs.com/) (HTML5 mode)
3. On every animation frame, maps `currentTime + 0.7s` look-ahead → current lyric
4. Animates previous / current / next lyric over the album art with [Framer Motion](https://www.framer-motion.com/)
5. Feeds audio into a Web Audio API `AnalyserNode` and renders gradient bars + wave line on `<canvas>`

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Animations | Framer Motion |
| Audio engine | Howler.js |
| SRT parsing | srt-parser-2 |
| Audio visualizer | Web Audio API + Canvas |
| Package bundler | tsup (ESM + CJS + types) |

---

## Run locally

```bash
git clone https://github.com/dinalUdagedara/srt-to-lyrics.git
cd srt-to-lyrics
npm install          # installs root deps + links the package via workspaces
npm run dev          # starts Next.js at localhost:3000
```

To work on the package:

```bash
cd packages/srt-lyric-player
npm run dev          # tsup --watch, rebuilds dist on every save
```

---

## Project structure

```
srt-to-lyrics/
  app/                        # Next.js app router
  components/                 # Demo app components
  public/assets/              # Sample audio, SRT, album art
  packages/
    srt-lyric-player/         # npm package source
      src/
        components/           # MusicPlayer, AudioVisualizer, AlbumCover, icons
        hooks/                # useLyricsContext
        utils/                # types, debounce, formatTime
      dist/                   # built output (ESM + CJS + CSS)
```

---

## License

MIT
