import React, { useCallback, useEffect, useRef, useState } from "react";
import SrtParser2 from "srt-parser-2";
import { Howl } from "howler";
import AlbumCover from "../AlbumCover";
import AudioVisualizer from "../AudioVisualizer";
import { useLyricsContext } from "../../hooks/use-lyric-sync";
import { debounce, formatTime } from "../../utils/functions";
import type { MusicPlayerProps, Subtitle } from "../../utils/types";
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  ShuffleIcon,
  RepeatIcon,
  HeartIcon,
} from "../icons";
import "./MusicPlayer.css";

export default function MusicPlayer({
  srtContent: srtContentProp,
  srtSrc,
  audioSrc,
  albumArt,
  songName,
  artistName,
  albumName,
}: MusicPlayerProps) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [srtContent, setSrtContent] = useState(srtContentProp ?? "");
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioTrack = useRef<Howl | null>(null);

  const { currentLyric, previousLyric, nextLyric } = useLyricsContext(
    subtitles,
    currentTime
  );

  // Fetch SRT from URL if srtSrc provided
  useEffect(() => {
    if (!srtSrc || srtContentProp) return;
    fetch(srtSrc)
      .then((res) => res.text())
      .then(setSrtContent)
      .catch(console.error);
  }, [srtSrc, srtContentProp]);

  // Parse SRT whenever content changes
  useEffect(() => {
    if (!srtContent) return;
    const parser = new SrtParser2();
    setSubtitles(parser.fromSrt(srtContent));
  }, [srtContent]);

  // Init Howler
  useEffect(() => {
    audioTrack.current = new Howl({
      src: [audioSrc],
      html5: true,
      onload: () => {
        setDuration(audioTrack.current?.duration() || 0);
      },
      onplay: () => {
        setIsPlaying(true);
        requestAnimationFrame(updateCurrentTime);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        handleEnded();
      },
    });

    return () => {
      audioTrack.current?.unload();
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioTrack.current) return;
    if (isPlaying) {
      audioTrack.current.pause();
    } else {
      audioTrack.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setCurrentTime(newProgress);
    setIsSeeking(true);
    debouncedSeek(newProgress);
    requestAnimationFrame(updateCurrentTime);
    setIsSeeking(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (isRepeat && audioTrack.current) {
      audioTrack.current.seek(0);
      audioTrack.current.play();
    }
  };

  const skipForward = () => {
    if (!audioTrack.current) return;
    const newTime = Math.min((audioTrack.current.seek() as number) + 10, duration);
    audioTrack.current.seek(newTime);
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    if (!audioTrack.current) return;
    const newTime = Math.max((audioTrack.current.seek() as number) - 10, 0);
    audioTrack.current.seek(newTime);
    setCurrentTime(newTime);
  };

  const updateCurrentTime = () => {
    if (!audioTrack.current) return;
    const currentSeek = audioTrack.current.seek() as number;
    if (!isSeeking) setCurrentTime(currentSeek);
    if (audioTrack.current.playing() || isSeeking) {
      requestAnimationFrame(updateCurrentTime);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSeek = useCallback(
    debounce((newProgress: number) => {
      if (audioTrack.current) {
        audioTrack.current.seek(newProgress);
        if (!audioTrack.current.playing()) {
          cancelAnimationFrame(updateCurrentTime as unknown as number);
        }
      }
      setIsSeeking(false);
    }, 250),
    [audioTrack]
  );

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="slp-card">
      <div className="slp-body">
        <AlbumCover
          currentLyric={currentLyric}
          albumArt={albumArt}
          nextLyric={nextLyric}
          previousLyric={previousLyric}
        />

        <div className="slp-controls">
          <div className="slp-song-info">
            <div className="slp-song-meta">
              {songName && <h3 className="slp-song-name">{songName}</h3>}
              {artistName && <p className="slp-artist-name">{artistName}</p>}
              {albumName && <p className="slp-album-name">{albumName}</p>}
            </div>
            <button
              className="slp-like-btn"
              onClick={() => setLiked((v) => !v)}
              aria-label={liked ? "Unlike song" : "Like song"}
            >
              <HeartIcon
                size={16}
                fill={liked ? "#ef4444" : "rgba(243,244,246,0.4)"}
              />
            </button>
          </div>

          <div className="slp-slider-wrapper">
            <input
              type="range"
              className="slp-slider"
              style={{ "--slp-progress": `${progressPct}%` } as React.CSSProperties}
              min={0}
              max={duration}
              step={0.01}
              value={currentTime}
              onChange={handleSliderChange}
              aria-label="Seek"
            />
            <div className="slp-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="slp-btn-row">
            <button
              className={`slp-icon-btn${isRepeat ? " slp-icon-btn-active" : ""}`}
              onClick={() => setIsRepeat(!isRepeat)}
              aria-label={isRepeat ? "Disable repeat" : "Enable repeat"}
            >
              <RepeatIcon size={20} />
            </button>
            <button
              className="slp-icon-btn"
              onClick={skipBackward}
              aria-label="Skip backward 10s"
            >
              <PrevIcon size={20} />
            </button>
            <button
              className="slp-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon size={26} /> : <PlayIcon size={26} />}
            </button>
            <button
              className="slp-icon-btn"
              onClick={skipForward}
              aria-label="Skip forward 10s"
            >
              <NextIcon size={20} />
            </button>
            <button
              className={`slp-icon-btn${isShuffle ? " slp-icon-btn-active" : ""}`}
              onClick={() => setIsShuffle(!isShuffle)}
              aria-label="Toggle shuffle"
            >
              <ShuffleIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="slp-visualizer-wrapper">
        {audioTrack.current && (
          <AudioVisualizer howlRef={audioTrack} isPlaying={isPlaying} />
        )}
      </div>
    </div>
  );
}
