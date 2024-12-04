"use client";
import React from "react";
// import MusicPlayerCard from "./music-player-card";
import MusicPlayerCard from "./howler/music-player-card-howler";
import AlbumCoverImage from "@/public/assets/start-boy-cover.png";

const LyricsPlayer = ({
  srtContent,
  audioSrc,
}: {
  srtContent: string;
  audioSrc: string;
}) => {
  return (
    <div>
      {/* <MusicPlayerCard /> */}
      <MusicPlayerCard
        srtContent={srtContent}
        audioSrc={audioSrc}
        albumArt={AlbumCoverImage}
        songName="Lonely Night"
        artistName="The Weeknd"
        albumName="Star Boy"
      />
    </div>
  );
};

export default LyricsPlayer;
