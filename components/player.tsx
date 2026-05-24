"use client";
import React from "react";
import { MusicPlayer } from "srt-lyric-player";
import "srt-lyric-player/dist/index.css";

const LyricsPlayer = ({
  audioSrc,
}: {
  audioSrc: string;
}) => {
  return (
    <MusicPlayer
      srtSrc="/assets/lonely-night.srt"
      audioSrc={audioSrc}
      albumArt="/assets/start-boy-cover.png"
      songName="Lonely Night"
      artistName="The Weeknd"
      albumName="Star Boy"
    />
  );
};

export default LyricsPlayer;
