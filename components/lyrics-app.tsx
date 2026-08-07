"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicPlayer } from "srt-lyric-player";
import "srt-lyric-player/dist/index.css";
import { playlist, type Song } from "@/data/songs";
import Playlist from "@/components/playlist";

export default function LyricsApp() {
  const [current, setCurrent] = useState<Song>(playlist[0]);

  return (
    <div className="app-shell">
      <div
        className="app-ambient"
        style={{ backgroundImage: `url(${current.albumArt})` }}
        aria-hidden
      />
      <div className="app-grain" aria-hidden />

      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">LyricSRT</span>
          <span className="brand-tag">Synced lyrics from any .srt</span>
        </div>
        <p className="app-now">
          Now playing
          <span>{current.songName}</span>
        </p>
      </header>

      <main className="app-main">
        <aside className="app-queue">
          <Playlist
            songs={playlist}
            activeId={current.id}
            onSelect={setCurrent}
          />
        </aside>

        <section className="app-stage" aria-label="Player">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="app-player"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <MusicPlayer
                key={current.id}
                audioSrc={current.audioSrc}
                srtSrc={current.srtSrc}
                albumArt={current.albumArt}
                songName={current.songName}
                artistName={current.artistName}
                albumName={current.albumName}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
