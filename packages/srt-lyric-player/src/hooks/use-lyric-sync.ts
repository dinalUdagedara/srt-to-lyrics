import { useState, useEffect } from "react";
import type { Subtitle } from "../utils/types";

function timeToMilliseconds(time: string) {
  const [hours, minutes, seconds] = time.split(":");
  const [secs, millis] = seconds.split(",");
  return (
    parseInt(hours, 10) * 3600000 +
    parseInt(minutes, 10) * 60000 +
    parseInt(secs, 10) * 1000 +
    parseInt(millis, 10)
  );
}

export function useLyricsContext(subtitles: Subtitle[], currentTime: number) {
  const [currentLyric, setCurrentLyric] = useState("");
  const [previousLyric, setPreviousLyric] = useState("");
  const [nextLyric, setNextLyric] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (subtitles.length === 0) return;

    const currentTimeMs = (currentTime + 0.7) * 1000;
    const index = subtitles.findIndex(
      (subtitle) =>
        currentTimeMs >= timeToMilliseconds(subtitle.startTime) &&
        currentTimeMs <= timeToMilliseconds(subtitle.endTime)
    );

    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentLyric(subtitles[index].text);
      setPreviousLyric(subtitles[index - 1]?.text || "");
      setNextLyric(subtitles[index + 1]?.text || "");
      return;
    }

    // Between lines — keep the last passed lyric highlighted in lists
    let lastPassed = -1;
    for (let i = 0; i < subtitles.length; i++) {
      if (currentTimeMs >= timeToMilliseconds(subtitles[i].startTime)) {
        lastPassed = i;
      } else {
        break;
      }
    }

    if (lastPassed === -1) {
      setCurrentIndex(-1);
      setCurrentLyric("");
      setPreviousLyric("");
      setNextLyric(subtitles[0]?.text || "");
    } else {
      setCurrentIndex(lastPassed);
      setCurrentLyric(subtitles[lastPassed].text);
      setPreviousLyric(subtitles[lastPassed - 1]?.text || "");
      setNextLyric(subtitles[lastPassed + 1]?.text || "");
    }
  }, [subtitles, currentTime]);

  return { currentLyric, previousLyric, nextLyric, currentIndex };
}

export { timeToMilliseconds };
