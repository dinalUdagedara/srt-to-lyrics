"use client";
import { useEffect, useState } from "react";
import LyricsPlayer from "@/components/player";

export default function Home() {
  const [srtContent, setSrtContent] = useState<string>("");

  useEffect(() => {
    fetch("/assets/lonely-night.srt")
      .then((res) => res.text())
      .then((data) => setSrtContent(data));
  }, []);

  return (
    <div className="flex flex-col w-full justify-center  items-center gap-10 pt-10">
      {srtContent && (
        <LyricsPlayer
          srtContent={srtContent}
          audioSrc="/assets/lonely-night.mp3"
        />
      )}
    </div>
  );
}
