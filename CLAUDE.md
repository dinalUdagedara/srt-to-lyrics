# srt-to-lyrics

A Next.js web app that renders a music player with real-time synchronized lyrics, driven by SRT subtitle files. Think Spotify's lyrics view — but powered by standard `.srt` files instead of a proprietary format.

## What it does

1. Loads an `.srt` file and a matching `.mp3`
2. Parses the SRT timestamps using `srt-parser-2`
3. As audio plays, maps the current playback position → current lyric (with a 0.7 s look-ahead offset)
4. Displays the previous / current / next lyric overlaid on the album art with Framer Motion animations
5. Renders a real-time audio visualizer via the Web Audio API (`AnalyserNode`)

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| UI components | NextUI v2 |
| Animations | Framer Motion |
| Audio engine | Howler.js (HTML5 mode for large files) |
| SRT parsing | srt-parser-2 |
| Audio visualizer | Web Audio API + Canvas |
| Styling | Tailwind CSS |
| Icons | react-icons, lucide-react |

## Project structure

```
app/
  page.tsx                  # Entry — fetches SRT, renders LyricsPlayer
  layout.tsx                # Root layout with NextUI provider
  globals.css

components/
  player.tsx                # Thin wrapper — wires props into MusicPlayerCard
  album-cover-lyrics.tsx    # Album art + animated lyric overlay (prev/current/next)
  howler/
    music-player-card-howler.tsx   # Main player card (controls, slider, state)
    audio-visualizer-howl.tsx      # Canvas visualizer via AnalyserNode
  music-player-card.tsx     # Legacy native-HTML5 version (unused, kept for reference)
  audio-visualizer.tsx      # Legacy visualizer (unused)

hooks/
  use-lyric-sync.ts         # useLyricsContext — maps currentTime → prev/current/next lyric

utils/
  types.ts                  # Shared interfaces (MusicPlayerProps, Subtitle, etc.)
  functions.ts              # debounce, formatTime helpers

providers/
  next-provider.tsx         # NextUI theme provider

public/assets/              # Sample audio + SRT files, album art
```

## Data flow

```
SRT file (fetch) → srt-parser-2 → subtitles[]
                                        ↓
Howler.js playback → requestAnimationFrame → currentTime
                                        ↓
                            useLyricsContext hook
                                        ↓
                    { previousLyric, currentLyric, nextLyric }
                                        ↓
                            AlbumCover + Framer Motion
```

The lyric sync hook applies a `+0.7 s` offset to `currentTime` so the lyric transitions feel anticipatory rather than lagging.

## Audio visualizer

- Taps into Howler's internal `_sounds[0]._node` (the underlying HTMLMediaElement) via `createMediaElementSource`
- Feeds through an `AnalyserNode` (fftSize 512) → renders gradient bars + a white wave line on a `<canvas>`
- Only runs the `requestAnimationFrame` loop while `isPlaying === true`

## Known gaps / planned work

- **Shuffle** — UI button exists but is not wired to any logic
- **Song switching** — currently hardcoded to `lonely-night` in `page.tsx`; no playlist or queue
- **SRT upload** — no UI to drop in a custom SRT/audio pair; everything is served from `public/assets`
- **Mobile layout** — grid is responsive but not tested/tuned for small screens
- **Lyric scroll view** — full scrollable lyric list (like Spotify's full-screen lyrics) is not implemented

## Dev commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
```

## Adding a new song

1. Drop `song.mp3` and `song.srt` into `public/assets/`
2. In `app/page.tsx`, update the fetch path and `audioSrc` prop
3. In `components/player.tsx`, update `songName`, `artistName`, `albumName`, and `albumArt`
