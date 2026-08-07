import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AlbumCoverProps } from "../../utils/types";
import { LyricsIcon } from "../icons";
import "./AlbumCover.css";

function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric,
  onOpenFullscreen,
  hideLyrics = false,
}: AlbumCoverProps) {
  if (!albumArt) return null;

  return (
    <div className={`slp-album-container${hideLyrics ? " is-compact" : ""}`}>
      <img alt="Album cover" className="slp-album-image" src={albumArt} />
      <div
        className={`slp-album-overlay${hideLyrics ? " is-hardened" : ""}`}
      >
        <AnimatePresence mode="wait">
          {!hideLyrics && (
            <motion.div
              key={currentLyric || "empty"}
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                y: -14,
                transition: { duration: 0.28, ease: "easeIn" },
              }}
              className="slp-lyric-block"
            >
              {previousLyric ? (
                <p className="slp-lyric-prev">{previousLyric}</p>
              ) : (
                <p className="slp-lyric-prev" aria-hidden>
                  &nbsp;
                </p>
              )}
              {currentLyric ? (
                <p className="slp-lyric-current">{currentLyric}</p>
              ) : (
                <p className="slp-lyric-placeholder">♪ ♪ ♪</p>
              )}
              {nextLyric ? (
                <p className="slp-lyric-next">{nextLyric}</p>
              ) : (
                <p className="slp-lyric-next" aria-hidden>
                  &nbsp;
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {onOpenFullscreen && !hideLyrics && (
        <button
          type="button"
          className="slp-album-expand"
          onClick={onOpenFullscreen}
          aria-label="Open fullscreen lyrics"
        >
          <LyricsIcon size={16} />
        </button>
      )}
    </div>
  );
}

export default AlbumCover;
