export type Song = {
  id: string;
  songName: string;
  artistName: string;
  albumName: string;
  /** Any playable URL — local `/assets/...` or remote CDN/S3/R2 */
  audioSrc: string;
  /** Any fetchable SRT URL — same origin or CORS-enabled remote */
  srtSrc: string;
  albumArt: string;
};

/**
 * Demo catalog. Swap these URLs for remote hosts when you scale —
 * Howler and fetch work with any HTTPS URL that allows the browser to load it.
 */
export const playlist: Song[] = [
  {
    id: "lonely-night",
    songName: "Lonely Night",
    artistName: "The Weeknd",
    albumName: "Starboy",
    audioSrc: "/assets/lonely-night.mp3",
    srtSrc: "/assets/lonely-night.srt",
    albumArt: "/assets/start-boy-cover.png",
  },
  {
    id: "you-got-this",
    songName: "You Got This",
    artistName: "Explode",
    albumName: "Demo Collection",
    audioSrc: "/assets/12-Explode--You-Got-This.mp3",
    srtSrc: "/assets/12-Explode--You-Got-This.srt",
    albumArt: "/assets/album-cover.png",
  },
];
