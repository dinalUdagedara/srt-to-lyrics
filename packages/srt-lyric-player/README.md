# srt-lyric-player

A React component library for building music players with **real-time synchronized lyrics** and an **audio visualizer** — powered by standard `.srt` subtitle files.

Think Spotify's lyrics view, but driven by `.srt` files you already have.

---

## Features

- 🎵 Real-time lyric sync from any `.srt` file (fetched by URL or passed as a string)
- 🎨 Animated previous / current / next lyric overlay on album art (Framer Motion)
- 📊 Live audio visualizer via Web Audio API + Canvas
- 🎛️ Full player controls — play/pause, seek, repeat, shuffle
- 💅 Zero dependency on Tailwind, NextUI, or any CSS framework
- 🧩 Works in any React app (Next.js, Vite, CRA, etc.)

---

## Install

```bash
npm install srt-lyric-player framer-motion howler
```

> `framer-motion` and `howler` are peer dependencies — install them alongside the package.

---

## Usage

### Full music player

```tsx
import { MusicPlayer } from 'srt-lyric-player'
import 'srt-lyric-player/dist/index.css'

export default function App() {
  return (
    <MusicPlayer
      audioSrc="/songs/my-song.mp3"
      srtSrc="/songs/my-song.srt"
      albumArt="/covers/my-album.jpg"
      songName="Song Title"
      artistName="Artist Name"
      albumName="Album Name"
    />
  )
}
```

### Visualizer only

```tsx
import { AudioVisualizer } from 'srt-lyric-player'
import 'srt-lyric-player/dist/index.css'

export default function App() {
  return (
    <AudioVisualizer audioSrc="/songs/my-song.mp3" />
  )
}
```

### Pass SRT content directly (no fetch)

```tsx
const srtContent = `
1
00:00:01,000 --> 00:00:04,000
First lyric line

2
00:00:05,000 --> 00:00:08,000
Second lyric line
`

<MusicPlayer
  audioSrc="/songs/my-song.mp3"
  srtContent={srtContent}
  songName="My Song"
/>
```

---

## Props

### `<MusicPlayer />`

| Prop | Type | Required | Description |
|---|---|---|---|
| `audioSrc` | `string` | ✅ | URL to the audio file (`.mp3`, `.ogg`, etc.) |
| `srtSrc` | `string` | | URL to the `.srt` file — fetched internally |
| `srtContent` | `string` | | Raw SRT string — use instead of `srtSrc` to skip the fetch |
| `albumArt` | `string` | | URL to the album cover image |
| `songName` | `string` | | Song title displayed on the card |
| `artistName` | `string` | | Artist name displayed below the title |
| `albumName` | `string` | | Album name displayed below the artist |

### `<AudioVisualizer />`

| Prop | Type | Required | Description |
|---|---|---|---|
| `audioSrc` | `string` | | URL to audio — component manages its own Howl instance |
| `howlRef` | `RefObject<Howl \| null>` | | Pass a controlled Howl ref (when used inside `MusicPlayer`) |
| `isPlaying` | `boolean` | | Required when using `howlRef` — drives the animation loop |

---

## How it works

1. Loads the `.srt` file via `srtSrc` (or uses `srtContent` directly)
2. Parses timestamps with [`srt-parser-2`](https://www.npmjs.com/package/srt-parser-2)
3. Drives playback through [Howler.js](https://howlerjs.com/) (HTML5 mode)
4. On every animation frame, maps `currentTime + 0.7s look-ahead` → current lyric
5. Animates previous / current / next lyric with [Framer Motion](https://www.framer-motion.com/) `AnimatePresence`
6. Feeds audio into a Web Audio API `AnalyserNode` → renders gradient bars + wave line on `<canvas>`

---

## Peer dependencies

| Package | Version |
|---|---|
| `react` | `>=18` |
| `react-dom` | `>=18` |
| `framer-motion` | `>=11` |
| `howler` | `>=2.2` |

---

## SRT file format

Standard `.srt` files work out of the box:

```
1
00:00:01,000 --> 00:00:04,500
First line of lyrics

2
00:00:05,000 --> 00:00:08,200
Second line of lyrics
```

---

## License

MIT
