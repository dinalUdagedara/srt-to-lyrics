"use client";
import React, { useEffect, useRef, useState } from "react";
import SrtParser2 from "srt-parser-2"; 

type Subtitle = {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
};

const LyricsPlayer = ({
  srtContent,
  audioSrc,
}: {
  srtContent: string;
  audioSrc: string;
}) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentLyric, setCurrentLyric] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse the SRT content when the component mounts
  useEffect(() => {
    const parser = new SrtParser2();
    const parsedSrt = parser.fromSrt(srtContent); // Parse the SRT file into an array of subtitles
    setSubtitles(parsedSrt);
  }, [srtContent]);

  // Convert SRT time format (HH:MM:SS,MS) to milliseconds for comparison
  const timeToMilliseconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":");
    const [secs, millis] = seconds.split(",");
    return (
      parseInt(hours, 10) * 3600000 +
      parseInt(minutes, 10) * 60000 +
      parseInt(secs, 10) * 1000 +
      parseInt(millis, 10)
    );
  };

  // Update the lyrics based on the current time of the audio
  const updateLyric = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime * 1000; // Convert seconds to milliseconds
      const currentSubtitle = subtitles.find(
        (subtitle) =>
          currentTime >= timeToMilliseconds(subtitle.startTime) &&
          currentTime <= timeToMilliseconds(subtitle.endTime)
      );
      if (currentSubtitle) {
        setCurrentLyric(currentSubtitle.text);
      } else {
        setCurrentLyric(""); // Clear lyrics when there's no matching subtitle
      }
    }
  };

  return (
    <div>
      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={audioSrc}
        controls
        onTimeUpdate={updateLyric}
      />

      {/* Display current lyric */}
      <div className="mt-10">
        <h2>{currentLyric}</h2>
      </div>
    </div>
  );
};

export default LyricsPlayer;
