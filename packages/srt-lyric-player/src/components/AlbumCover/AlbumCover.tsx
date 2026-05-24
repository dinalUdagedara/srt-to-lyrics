import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AlbumCoverProps } from "../../utils/types";
import "./AlbumCover.css";

function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric,
}: AlbumCoverProps) {
  return (
    <div>
      {albumArt && (
        <div className="slp-album-container">
          <img
            alt="Album cover"
            className="slp-album-image"
            src={albumArt}
          />
          <div className="slp-album-overlay">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentLyric}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "anticipate" },
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                  transition: { duration: 0.6, ease: "anticipate" },
                }}
                className="slp-lyric-block"
              >
                {previousLyric && (
                  <p className="slp-lyric-prev">{previousLyric}</p>
                )}
                {currentLyric ? (
                  <p className="slp-lyric-current">{currentLyric}</p>
                ) : (
                  <p className="slp-lyric-placeholder">♪ ♪ ♪</p>
                )}
                {nextLyric && (
                  <p className="slp-lyric-next">{nextLyric}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumCover;
