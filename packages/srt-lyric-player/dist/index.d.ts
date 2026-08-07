import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { RefObject } from 'react';
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
    onOpenFullscreen?: () => void;
    /** Hide overlay lyrics (e.g. while fullscreen lyrics are open) */
    hideLyrics?: boolean;
}

declare function MusicPlayer({ srtContent: srtContentProp, srtSrc, audioSrc, albumArt, songName, artistName, albumName, }: MusicPlayerProps): react_jsx_runtime.JSX.Element;

declare function AudioVisualizer({ audioSrc, howlRef: externalHowlRef, isPlaying, }: VisualizerProps): react_jsx_runtime.JSX.Element;

type FullscreenLyricsProps = {
    open: boolean;
    onClose: () => void;
    subtitles: Subtitle[];
    currentIndex: number;
    albumArt?: string;
    songName?: string;
    artistName?: string;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onTogglePlay: () => void;
    onSkipBackward: () => void;
    onSkipForward: () => void;
    onSeek: (time: number) => void;
    onSeekToLyric: (index: number) => void;
};
declare function FullscreenLyrics({ open, onClose, subtitles, currentIndex, albumArt, songName, artistName, isPlaying, currentTime, duration, onTogglePlay, onSkipBackward, onSkipForward, onSeek, onSeekToLyric, }: FullscreenLyricsProps): React.ReactPortal | null;

export { type AlbumCoverProps, AudioVisualizer, FullscreenLyrics, MusicPlayer, type MusicPlayerProps, type Subtitle, type VisualizerProps };
