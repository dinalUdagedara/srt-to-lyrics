import * as react_jsx_runtime from 'react/jsx-runtime';
import { RefObject } from 'react';
import { Howl } from 'howler';

interface MusicPlayerProps {
    audioSrc: string;
    srtSrc?: string;
    srtContent?: string;
    albumArt?: string;
    songName?: string;
    albumName?: string;
    artistName?: string;
}
type Subtitle = {
    id: string;
    startTime: string;
    endTime: string;
    text: string;
};
interface VisualizerProps {
    audioSrc?: string;
    howlRef?: RefObject<Howl | null>;
    isPlaying?: boolean;
}
interface AlbumCoverProps {
    previousLyric: string;
    currentLyric: string;
    nextLyric: string;
    albumArt?: string;
}

declare function MusicPlayer({ srtContent: srtContentProp, srtSrc, audioSrc, albumArt, songName, artistName, albumName, }: MusicPlayerProps): react_jsx_runtime.JSX.Element;

declare function AudioVisualizer({ audioSrc, howlRef: externalHowlRef, isPlaying, }: VisualizerProps): react_jsx_runtime.JSX.Element;

export { type AlbumCoverProps, AudioVisualizer, MusicPlayer, type MusicPlayerProps, type Subtitle, type VisualizerProps };
