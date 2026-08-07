"use client";

import { useId, useState, type FormEvent } from "react";
import { DEFAULT_ALBUM_ART, type Song } from "@/data/songs";

type AddSongProps = {
  onAdd: (song: Song) => void;
  onCancel: () => void;
};

function fileLabel(file: File | null, empty: string) {
  if (!file) return empty;
  return file.name;
}

function stemFromFilename(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || "Untitled";
}

export default function AddSong({ onAdd, onCancel }: AddSongProps) {
  const formId = useId();

  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [artFile, setArtFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleAudioChange = (file: File | null) => {
    setAudioFile(file);
    setError(null);
    if (file && !songName.trim()) {
      setSongName(stemFromFilename(file.name));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!audioFile) {
      setError("Choose an audio file (.mp3, .wav, .m4a).");
      return;
    }
    if (!srtFile) {
      setError("Choose an .srt lyrics file.");
      return;
    }

    setBusy(true);
    try {
      const srtContent = await srtFile.text();
      if (!srtContent.trim()) {
        setError("That SRT file looks empty.");
        return;
      }

      const audioSrc = URL.createObjectURL(audioFile);
      const albumArt = artFile
        ? URL.createObjectURL(artFile)
        : DEFAULT_ALBUM_ART;

      const song: Song = {
        id: `user-${crypto.randomUUID()}`,
        songName: songName.trim() || stemFromFilename(audioFile.name),
        artistName: artistName.trim() || "Unknown artist",
        albumName: albumName.trim() || "Uploaded",
        audioSrc,
        srtContent,
        albumArt,
        isUserAdded: true,
      };

      onAdd(song);
    } catch {
      setError("Couldn't read those files. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="add-song" onSubmit={handleSubmit} aria-labelledby={`${formId}-title`}>
      <div className="add-song-head">
        <h2 id={`${formId}-title`} className="add-song-title">
          Add track
        </h2>
        <p className="add-song-hint">Audio + .srt stay in this browser tab only.</p>
      </div>

      <div className="add-song-files">
        <label className="add-song-file">
          <span className="add-song-file-label">Audio</span>
          <span className="add-song-file-value">{fileLabel(audioFile, "Pick .mp3 / .wav / .m4a")}</span>
          <input
            type="file"
            accept="audio/mpeg,audio/mp3,audio/wav,audio/x-m4a,audio/mp4,.mp3,.wav,.m4a"
            onChange={(e) => handleAudioChange(e.target.files?.[0] ?? null)}
          />
        </label>

        <label className="add-song-file">
          <span className="add-song-file-label">Lyrics</span>
          <span className="add-song-file-value">{fileLabel(srtFile, "Pick .srt file")}</span>
          <input
            type="file"
            accept=".srt,text/plain,application/x-subrip"
            onChange={(e) => {
              setSrtFile(e.target.files?.[0] ?? null);
              setError(null);
            }}
          />
        </label>

        <label className="add-song-file">
          <span className="add-song-file-label">Cover</span>
          <span className="add-song-file-value">{fileLabel(artFile, "Optional image")}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => setArtFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="add-song-fields">
        <label className="add-song-field">
          <span>Title</span>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Song title"
            autoComplete="off"
          />
        </label>
        <label className="add-song-field">
          <span>Artist</span>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Artist name"
            autoComplete="off"
          />
        </label>
        <label className="add-song-field">
          <span>Album</span>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            placeholder="Album (optional)"
            autoComplete="off"
          />
        </label>
      </div>

      {error ? (
        <p className="add-song-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="add-song-actions">
        <button type="button" className="add-song-btn ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="submit" className="add-song-btn primary" disabled={busy}>
          {busy ? "Adding…" : "Add to queue"}
        </button>
      </div>
    </form>
  );
}
