import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Subtitle } from "../../utils/types";
import { formatTime } from "../../utils/functions";
import {
  CloseIcon,
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
} from "../icons";
import "./FullscreenLyrics.css";

export type FullscreenLyricsProps = {
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

export default function FullscreenLyrics({
  open,
  onClose,
  subtitles,
  currentIndex,
  albumArt,
  songName,
  artistName,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSkipBackward,
  onSkipForward,
  onSeek,
  onSeekToLyric,
}: FullscreenLyricsProps) {
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        onTogglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onTogglePlay]);

  useEffect(() => {
    if (!open || currentIndex < 0) return;
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentIndex, open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="slp-fs"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen lyrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div
            className="slp-fs-bg"
            style={albumArt ? { backgroundImage: `url(${albumArt})` } : undefined}
            aria-hidden
          />

          <header className="slp-fs-top">
            <div className="slp-fs-meta">
              {albumArt && (
                <img src={albumArt} alt="" className="slp-fs-thumb" />
              )}
              <div className="slp-fs-titles">
                {songName && <p className="slp-fs-song">{songName}</p>}
                {artistName && <p className="slp-fs-artist">{artistName}</p>}
              </div>
            </div>
            <button
              type="button"
              className="slp-fs-close"
              onClick={onClose}
              aria-label="Close fullscreen lyrics"
            >
              <CloseIcon size={18} />
            </button>
          </header>

          <div className="slp-fs-scroll">
            {subtitles.length === 0 ? (
              <p className="slp-fs-empty">No lyrics loaded yet</p>
            ) : (
              <ul className="slp-fs-list">
                {subtitles.map((line, index) => {
                  const isActive = index === currentIndex;
                  const isNear =
                    !isActive && Math.abs(index - currentIndex) === 1;
                  const isPassed = currentIndex >= 0 && index < currentIndex;
                  return (
                    <li key={`${line.id}-${index}`}>
                      <button
                        type="button"
                        ref={isActive ? activeRef : undefined}
                        className={[
                          "slp-fs-line",
                          isActive ? "is-active" : "",
                          isNear ? "is-near" : "",
                          isPassed ? "is-passed" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => onSeekToLyric(index)}
                      >
                        {line.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <footer className="slp-fs-dock">
            <input
              type="range"
              className="slp-fs-slider"
              style={{ "--slp-progress": `${progressPct}%` } as React.CSSProperties}
              min={0}
              max={duration || 0}
              step={0.01}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              aria-label="Seek"
            />
            <div className="slp-fs-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="slp-fs-controls">
              <button
                type="button"
                className="slp-fs-icon-btn"
                onClick={onSkipBackward}
                aria-label="Skip backward 10s"
              >
                <PrevIcon size={22} />
              </button>
              <button
                type="button"
                className="slp-fs-play"
                onClick={onTogglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
              </button>
              <button
                type="button"
                className="slp-fs-icon-btn"
                onClick={onSkipForward}
                aria-label="Skip forward 10s"
              >
                <NextIcon size={22} />
              </button>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
