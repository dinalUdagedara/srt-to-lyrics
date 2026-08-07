"use client";

import { useState } from "react";
import type { Song } from "@/data/songs";
import AddSong from "@/components/add-song";

type PlaylistProps = {
  songs: Song[];
  activeId: string;
  onSelect: (song: Song) => void;
  onAdd: (song: Song) => void;
  onRemove: (id: string) => void;
};

export default function Playlist({
  songs,
  activeId,
  onSelect,
  onAdd,
  onRemove,
}: PlaylistProps) {
  const [adding, setAdding] = useState(false);

  const handleAdd = (song: Song) => {
    onAdd(song);
    setAdding(false);
  };

  return (
    <nav className="playlist" aria-label="Playlist">
      <div className="playlist-header">
        <div>
          <p className="playlist-kicker">Queue</p>
          <p className="playlist-count">{songs.length} tracks</p>
        </div>
        {!adding ? (
          <button
            type="button"
            className="playlist-add-btn"
            onClick={() => setAdding(true)}
          >
            + Add
          </button>
        ) : null}
      </div>

      {adding ? (
        <AddSong onAdd={handleAdd} onCancel={() => setAdding(false)} />
      ) : null}

      <ol className="playlist-list">
        {songs.map((song, index) => {
          const isActive = song.id === activeId;
          return (
            <li key={song.id} className="playlist-row">
              <button
                type="button"
                className={`playlist-item${isActive ? " is-active" : ""}`}
                onClick={() => onSelect(song)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="playlist-index" aria-hidden>
                  {isActive ? (
                    <span className="playlist-eq" />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span className="playlist-art-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={song.albumArt}
                    alt=""
                    className="playlist-art"
                    width={44}
                    height={44}
                  />
                </span>
                <span className="playlist-meta">
                  <span className="playlist-title">{song.songName}</span>
                  <span className="playlist-artist">
                    {song.artistName}
                    <span className="playlist-dot" aria-hidden>
                      ·
                    </span>
                    {song.albumName}
                  </span>
                </span>
              </button>
              {song.isUserAdded ? (
                <button
                  type="button"
                  className="playlist-remove"
                  aria-label={`Remove ${song.songName}`}
                  onClick={() => onRemove(song.id)}
                >
                  ×
                </button>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
