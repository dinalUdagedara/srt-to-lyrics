import type { RefObject } from "react";
import type { Howl } from "howler";

export interface MusicPlayerProps {
  audioSrc: string;
  srtSrc?: string;
  srtContent?: string;
  albumArt?: string;
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
  audioSrc?: string;
  howlRef?: RefObject<Howl | null>;
  isPlaying?: boolean;
}

export interface AlbumCoverProps {
  previousLyric: string;
  currentLyric: string;
  nextLyric: string;
  albumArt?: string;
}
