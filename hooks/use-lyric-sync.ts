import { useState, useEffect } from "react";

type Subtitle = {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
};

export function useLyricsContext(subtitles: Subtitle[], currentTime: number) {
  const [currentLyric, setCurrentLyric] = useState("");
  const [previousLyric, setPreviousLyric] = useState("");
  const [nextLyric, setNextLyric] = useState("");

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

  useEffect(() => {
    if (subtitles.length === 0) return;

    const currentTimeMs = (currentTime + 0.7) * 1000;
    const currentSubtitleIndex = subtitles.findIndex(
      (subtitle) =>
        currentTimeMs >= timeToMilliseconds(subtitle.startTime) &&
        currentTimeMs <= timeToMilliseconds(subtitle.endTime)
    );

    if (currentSubtitleIndex !== -1) {
      setCurrentLyric(subtitles[currentSubtitleIndex].text);
      setPreviousLyric(subtitles[currentSubtitleIndex - 1]?.text || "");
      setNextLyric(subtitles[currentSubtitleIndex + 1]?.text || "");
    }
  }, [subtitles, currentTime]);

  return { currentLyric, previousLyric, nextLyric };
}
