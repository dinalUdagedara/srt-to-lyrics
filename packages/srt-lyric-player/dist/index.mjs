// src/components/MusicPlayer/MusicPlayer.tsx
import { useCallback, useEffect as useEffect3, useRef as useRef2, useState as useState2 } from "react";
import SrtParser2 from "srt-parser-2";
import { Howl as Howl2 } from "howler";

// src/components/AlbumCover/AlbumCover.tsx
import { AnimatePresence, motion } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric
}) {
  return /* @__PURE__ */ jsx("div", { children: albumArt && /* @__PURE__ */ jsxs("div", { className: "slp-album-container", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "Album cover",
        className: "slp-album-image",
        src: albumArt
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "slp-album-overlay", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: "anticipate" }
        },
        exit: {
          opacity: 0,
          y: -50,
          scale: 0.9,
          transition: { duration: 0.6, ease: "anticipate" }
        },
        className: "slp-lyric-block",
        children: [
          previousLyric && /* @__PURE__ */ jsx("p", { className: "slp-lyric-prev", children: previousLyric }),
          currentLyric ? /* @__PURE__ */ jsx("p", { className: "slp-lyric-current", children: currentLyric }) : /* @__PURE__ */ jsx("p", { className: "slp-lyric-placeholder", children: "\u266A \u266A \u266A" }),
          nextLyric && /* @__PURE__ */ jsx("p", { className: "slp-lyric-next", children: nextLyric })
        ]
      },
      currentLyric
    ) }) })
  ] }) });
}
var AlbumCover_default = AlbumCover;

// src/components/AudioVisualizer/AudioVisualizer.tsx
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { jsx as jsx2 } from "react/jsx-runtime";
function AudioVisualizer({
  audioSrc,
  howlRef: externalHowlRef,
  isPlaying = false
}) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const internalHowlRef = useRef(null);
  const internalPlayingRef = useRef(false);
  useEffect(() => {
    if (!audioSrc || externalHowlRef) return;
    internalHowlRef.current = new Howl({
      src: [audioSrc],
      html5: true,
      onplay: () => {
        internalPlayingRef.current = true;
      },
      onpause: () => {
        internalPlayingRef.current = false;
      },
      onend: () => {
        internalPlayingRef.current = false;
      }
    });
    return () => {
      var _a;
      (_a = internalHowlRef.current) == null ? void 0 : _a.unload();
    };
  }, [audioSrc, externalHowlRef]);
  useEffect(() => {
    const activeHowlRef = externalHowlRef != null ? externalHowlRef : internalHowlRef;
    const playing = externalHowlRef ? isPlaying : internalPlayingRef.current;
    const canvas = canvasRef.current;
    const canvasContext = canvas == null ? void 0 : canvas.getContext("2d");
    if (!canvas || !canvasContext || !activeHowlRef.current) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    const audioContext = audioContextRef.current;
    const handleAudioSetup = async () => {
      var _a;
      await audioContext.resume();
      if (!analyserRef.current) {
        const analyser2 = audioContext.createAnalyser();
        analyser2.fftSize = 512;
        analyserRef.current = analyser2;
        const soundSource = (_a = activeHowlRef.current._sounds[0]) == null ? void 0 : _a._node;
        if (soundSource) {
          const mediaElementSource = audioContext.createMediaElementSource(soundSource);
          mediaElementSource.connect(analyser2);
          analyser2.connect(audioContext.destination);
        }
      }
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const draw = () => {
        analyser.getByteFrequencyData(dataArray);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / bufferLength * 1.5;
        let barHeight;
        let x = 0;
        let prevX = 0;
        let prevY = 0;
        canvasContext.beginPath();
        dataArray.forEach((item, index) => {
          barHeight = item / 2;
          const y = canvas.height - barHeight;
          if (index > 0) {
            canvasContext.moveTo(prevX + barWidth / 2, prevY);
            canvasContext.lineTo(x + barWidth / 2, y);
          }
          const gradient = canvasContext.createLinearGradient(
            x,
            y,
            x,
            canvas.height
          );
          const topColor = `rgb(${Math.min(255, item * 2)}, 50, 150)`;
          const bottomColor = `rgb(${Math.min(255, (255 - item) * 1.5)}, 100, 200)`;
          gradient.addColorStop(0, topColor);
          gradient.addColorStop(1, bottomColor);
          canvasContext.fillStyle = gradient;
          canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          prevX = x;
          prevY = y;
          x += barWidth + 1;
        });
        canvasContext.lineWidth = 6;
        canvasContext.strokeStyle = "rgb(255, 255, 255)";
        canvasContext.stroke();
        const currentlyPlaying = externalHowlRef ? isPlaying : internalPlayingRef.current;
        if (currentlyPlaying) {
          animationRef.current = requestAnimationFrame(draw);
        }
      };
      draw();
    };
    if (playing || isPlaying) {
      handleAudioSetup();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [externalHowlRef, isPlaying, audioSrc]);
  return /* @__PURE__ */ jsx2("div", { className: "slp-visualizer", children: /* @__PURE__ */ jsx2("canvas", { ref: canvasRef, className: "slp-canvas" }) });
}

// src/hooks/use-lyric-sync.ts
import { useState, useEffect as useEffect2 } from "react";
function useLyricsContext(subtitles, currentTime) {
  const [currentLyric, setCurrentLyric] = useState("");
  const [previousLyric, setPreviousLyric] = useState("");
  const [nextLyric, setNextLyric] = useState("");
  const timeToMilliseconds = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const [secs, millis] = seconds.split(",");
    return parseInt(hours, 10) * 36e5 + parseInt(minutes, 10) * 6e4 + parseInt(secs, 10) * 1e3 + parseInt(millis, 10);
  };
  useEffect2(() => {
    var _a, _b;
    if (subtitles.length === 0) return;
    const currentTimeMs = (currentTime + 0.7) * 1e3;
    const currentSubtitleIndex = subtitles.findIndex(
      (subtitle) => currentTimeMs >= timeToMilliseconds(subtitle.startTime) && currentTimeMs <= timeToMilliseconds(subtitle.endTime)
    );
    if (currentSubtitleIndex !== -1) {
      setCurrentLyric(subtitles[currentSubtitleIndex].text);
      setPreviousLyric(((_a = subtitles[currentSubtitleIndex - 1]) == null ? void 0 : _a.text) || "");
      setNextLyric(((_b = subtitles[currentSubtitleIndex + 1]) == null ? void 0 : _b.text) || "");
    }
  }, [subtitles, currentTime]);
  return { currentLyric, previousLyric, nextLyric };
}

// src/utils/functions.ts
function debounce(func, wait) {
  let timeout = null;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
var formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// src/components/icons/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function PlayIcon({ size = 54, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
        }
      )
    }
  );
}
function PauseIcon({ size = 54, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
        }
      )
    }
  );
}
function PrevIcon({ size = 20, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M6 6h2v12H6zm3.5 6 8.5 6V6z"
        }
      )
    }
  );
}
function NextIcon({ size = 20, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"
        }
      )
    }
  );
}
function ShuffleIcon({ size = 20, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"
        }
      )
    }
  );
}
function RepeatIcon({ size = 20, className }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill: "currentColor",
          d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"
        }
      )
    }
  );
}
function HeartIcon({ size = 16, className, fill = "currentColor" }) {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx3(
        "path",
        {
          fill,
          d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        }
      )
    }
  );
}

// src/components/MusicPlayer/MusicPlayer.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function MusicPlayer({
  srtContent: srtContentProp,
  srtSrc,
  audioSrc,
  albumArt,
  songName,
  artistName,
  albumName
}) {
  const [subtitles, setSubtitles] = useState2([]);
  const [srtContent, setSrtContent] = useState2(srtContentProp != null ? srtContentProp : "");
  const [liked, setLiked] = useState2(false);
  const [isPlaying, setIsPlaying] = useState2(false);
  const [currentTime, setCurrentTime] = useState2(0);
  const [duration, setDuration] = useState2(0);
  const [isRepeat, setIsRepeat] = useState2(false);
  const [isShuffle, setIsShuffle] = useState2(false);
  const [isSeeking, setIsSeeking] = useState2(false);
  const audioTrack = useRef2(null);
  const { currentLyric, previousLyric, nextLyric } = useLyricsContext(
    subtitles,
    currentTime
  );
  useEffect3(() => {
    if (!srtSrc || srtContentProp) return;
    fetch(srtSrc).then((res) => res.text()).then(setSrtContent).catch(console.error);
  }, [srtSrc, srtContentProp]);
  useEffect3(() => {
    if (!srtContent) return;
    const parser = new SrtParser2();
    setSubtitles(parser.fromSrt(srtContent));
  }, [srtContent]);
  useEffect3(() => {
    audioTrack.current = new Howl2({
      src: [audioSrc],
      html5: true,
      onload: () => {
        var _a;
        setDuration(((_a = audioTrack.current) == null ? void 0 : _a.duration()) || 0);
      },
      onplay: () => {
        setIsPlaying(true);
        requestAnimationFrame(updateCurrentTime);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        handleEnded();
      }
    });
    return () => {
      var _a;
      (_a = audioTrack.current) == null ? void 0 : _a.unload();
    };
  }, [audioSrc]);
  const togglePlay = () => {
    if (!audioTrack.current) return;
    if (isPlaying) {
      audioTrack.current.pause();
    } else {
      audioTrack.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleSliderChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setCurrentTime(newProgress);
    setIsSeeking(true);
    debouncedSeek(newProgress);
    requestAnimationFrame(updateCurrentTime);
    setIsSeeking(false);
  };
  const handleEnded = () => {
    setIsPlaying(false);
    if (isRepeat && audioTrack.current) {
      audioTrack.current.seek(0);
      audioTrack.current.play();
    }
  };
  const skipForward = () => {
    if (!audioTrack.current) return;
    const newTime = Math.min(audioTrack.current.seek() + 10, duration);
    audioTrack.current.seek(newTime);
    setCurrentTime(newTime);
  };
  const skipBackward = () => {
    if (!audioTrack.current) return;
    const newTime = Math.max(audioTrack.current.seek() - 10, 0);
    audioTrack.current.seek(newTime);
    setCurrentTime(newTime);
  };
  const updateCurrentTime = () => {
    if (!audioTrack.current) return;
    const currentSeek = audioTrack.current.seek();
    if (!isSeeking) setCurrentTime(currentSeek);
    if (audioTrack.current.playing() || isSeeking) {
      requestAnimationFrame(updateCurrentTime);
    }
  };
  const debouncedSeek = useCallback(
    debounce((newProgress) => {
      if (audioTrack.current) {
        audioTrack.current.seek(newProgress);
        if (!audioTrack.current.playing()) {
          cancelAnimationFrame(updateCurrentTime);
        }
      }
      setIsSeeking(false);
    }, 250),
    [audioTrack]
  );
  const progressPct = duration > 0 ? currentTime / duration * 100 : 0;
  return /* @__PURE__ */ jsxs2("div", { className: "slp-card", children: [
    /* @__PURE__ */ jsxs2("div", { className: "slp-body", children: [
      /* @__PURE__ */ jsx4(
        AlbumCover_default,
        {
          currentLyric,
          albumArt,
          nextLyric,
          previousLyric
        }
      ),
      /* @__PURE__ */ jsxs2("div", { className: "slp-controls", children: [
        /* @__PURE__ */ jsxs2("div", { className: "slp-song-info", children: [
          /* @__PURE__ */ jsxs2("div", { className: "slp-song-meta", children: [
            songName && /* @__PURE__ */ jsx4("h3", { className: "slp-song-name", children: songName }),
            artistName && /* @__PURE__ */ jsx4("p", { className: "slp-artist-name", children: artistName }),
            albumName && /* @__PURE__ */ jsx4("p", { className: "slp-album-name", children: albumName })
          ] }),
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: "slp-like-btn",
              onClick: () => setLiked((v) => !v),
              "aria-label": liked ? "Unlike song" : "Like song",
              children: /* @__PURE__ */ jsx4(
                HeartIcon,
                {
                  size: 16,
                  fill: liked ? "#ef4444" : "rgba(243,244,246,0.4)"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "slp-slider-wrapper", children: [
          /* @__PURE__ */ jsx4(
            "input",
            {
              type: "range",
              className: "slp-slider",
              style: { "--slp-progress": `${progressPct}%` },
              min: 0,
              max: duration,
              step: 0.01,
              value: currentTime,
              onChange: handleSliderChange,
              "aria-label": "Seek"
            }
          ),
          /* @__PURE__ */ jsxs2("div", { className: "slp-time-row", children: [
            /* @__PURE__ */ jsx4("span", { children: formatTime(currentTime) }),
            /* @__PURE__ */ jsx4("span", { children: formatTime(duration) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "slp-btn-row", children: [
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: `slp-icon-btn${isRepeat ? " slp-icon-btn-active" : ""}`,
              onClick: () => setIsRepeat(!isRepeat),
              "aria-label": isRepeat ? "Disable repeat" : "Enable repeat",
              children: /* @__PURE__ */ jsx4(RepeatIcon, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: "slp-icon-btn",
              onClick: skipBackward,
              "aria-label": "Skip backward 10s",
              children: /* @__PURE__ */ jsx4(PrevIcon, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: "slp-play-btn",
              onClick: togglePlay,
              "aria-label": isPlaying ? "Pause" : "Play",
              children: isPlaying ? /* @__PURE__ */ jsx4(PauseIcon, { size: 26 }) : /* @__PURE__ */ jsx4(PlayIcon, { size: 26 })
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: "slp-icon-btn",
              onClick: skipForward,
              "aria-label": "Skip forward 10s",
              children: /* @__PURE__ */ jsx4(NextIcon, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              className: `slp-icon-btn${isShuffle ? " slp-icon-btn-active" : ""}`,
              onClick: () => setIsShuffle(!isShuffle),
              "aria-label": "Toggle shuffle",
              children: /* @__PURE__ */ jsx4(ShuffleIcon, { size: 20 })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "slp-visualizer-wrapper", children: audioTrack.current && /* @__PURE__ */ jsx4(AudioVisualizer, { howlRef: audioTrack, isPlaying }) })
  ] });
}
export {
  AudioVisualizer,
  MusicPlayer
};
//# sourceMappingURL=index.mjs.map