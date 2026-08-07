"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicPlayer } from "srt-lyric-player";
import "srt-lyric-player/dist/index.css";
import { playlist as seedPlaylist, type Song } from "@/data/songs";
import Playlist from "@/components/playlist";

function revokeSongUrls(song: Song) {
  if (!song.isUserAdded) return;
  if (song.audioSrc.startsWith("blob:")) URL.revokeObjectURL(song.audioSrc);
  if (song.albumArt.startsWith("blob:")) URL.revokeObjectURL(song.albumArt);
  if (song.srtSrc?.startsWith("blob:")) URL.revokeObjectURL(song.srtSrc);
}

export default function LyricsApp() {
  const [songs, setSongs] = useState<Song[]>(seedPlaylist);
  const [current, setCurrent] = useState<Song>(seedPlaylist[0]);

  useEffect(() => {
    return () => {
      songs.forEach(revokeSongUrls);
    };
    // Only revoke on unmount of the whole app shell
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = (song: Song) => {
    setSongs((prev) => [...prev, song]);
    setCurrent(song);
  };

  const handleRemove = (id: string) => {
    setSongs((prev) => {
      const target = prev.find((s) => s.id === id);
      if (target) revokeSongUrls(target);
      const next = prev.filter((s) => s.id !== id);
      if (current.id === id) {
        setCurrent(next[0] ?? seedPlaylist[0]);
      }
      return next.length > 0 ? next : seedPlaylist;
    });
  };

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
            songs={songs}
            activeId={current.id}
            onSelect={setCurrent}
            onAdd={handleAdd}
            onRemove={handleRemove}
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
                srtContent={current.srtContent}
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
