"use client";

import type { Song } from "@/data/songs";

type PlaylistProps = {
  songs: Song[];
  activeId: string;
  onSelect: (song: Song) => void;
};

export default function Playlist({ songs, activeId, onSelect }: PlaylistProps) {
  return (
    <nav className="playlist" aria-label="Playlist">
      <div className="playlist-header">
        <p className="playlist-kicker">Queue</p>
        <p className="playlist-count">{songs.length} tracks</p>
      </div>
      <ol className="playlist-list">
        {songs.map((song, index) => {
          const isActive = song.id === activeId;
          return (
            <li key={song.id}>
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
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
