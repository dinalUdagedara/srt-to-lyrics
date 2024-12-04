import { StaticImageData } from "next/image";
export interface MusicPlayerProps {
  srtContent: string;
  audioSrc: string;
  albumArt?: StaticImageData;
  songName?: string;
  albumName?: string;
  artistName?: string;
}

export type Subtitle = {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
};

export interface VisualizerProps {
  howlRef: React.RefObject<Howl | null>;
  isPlaying: boolean;
}

export interface AlbumCoverProps {
  previousLyric: string;
  currentLyric: string;
  nextLyric: string;
  albumArt?: StaticImageData;
}
