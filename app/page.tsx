"use client";
import LyricsPlayer from "@/components/player";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-10 pt-10">
      <LyricsPlayer audioSrc="/assets/lonely-night.mp3" />
    </div>
  );
}
