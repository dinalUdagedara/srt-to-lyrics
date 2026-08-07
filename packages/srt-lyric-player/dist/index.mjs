// src/components/MusicPlayer/MusicPlayer.tsx
import { useCallback, useEffect as useEffect4, useRef as useRef3, useState as useState2 } from "react";
import SrtParser2 from "srt-parser-2";
import { Howl as Howl2 } from "howler";

// src/components/AlbumCover/AlbumCover.tsx
import { AnimatePresence, motion } from "framer-motion";

// src/components/icons/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function PlayIcon({ size = 54, className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill,
          d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        }
      )
    }
  );
}
function LyricsIcon({ size = 16, className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M9 18V5l12-2v13" }),
        /* @__PURE__ */ jsx("circle", { cx: "6", cy: "18", r: "3" }),
        /* @__PURE__ */ jsx("circle", { cx: "18", cy: "16", r: "3" })
      ]
    }
  );
}
function CloseIcon({ size = 18, className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" })
    }
  );
}

// src/components/AlbumCover/AlbumCover.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AlbumCover({
  currentLyric,
  albumArt,
  previousLyric,
  nextLyric,
  onOpenFullscreen,
  hideLyrics = false
}) {
  if (!albumArt) return null;
  return /* @__PURE__ */ jsxs2("div", { className: `slp-album-container${hideLyrics ? " is-compact" : ""}`, children: [
    /* @__PURE__ */ jsx2("img", { alt: "Album cover", className: "slp-album-image", src: albumArt }),
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: `slp-album-overlay${hideLyrics ? " is-hardened" : ""}`,
        children: /* @__PURE__ */ jsx2(AnimatePresence, { mode: "wait", children: !hideLyrics && /* @__PURE__ */ jsxs2(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            animate: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            },
            exit: {
              opacity: 0,
              y: -14,
              transition: { duration: 0.28, ease: "easeIn" }
            },
            className: "slp-lyric-block",
            children: [
              previousLyric ? /* @__PURE__ */ jsx2("p", { className: "slp-lyric-prev", children: previousLyric }) : /* @__PURE__ */ jsx2("p", { className: "slp-lyric-prev", "aria-hidden": true, children: "\xA0" }),
              currentLyric ? /* @__PURE__ */ jsx2("p", { className: "slp-lyric-current", children: currentLyric }) : /* @__PURE__ */ jsx2("p", { className: "slp-lyric-placeholder", children: "\u266A \u266A \u266A" }),
              nextLyric ? /* @__PURE__ */ jsx2("p", { className: "slp-lyric-next", children: nextLyric }) : /* @__PURE__ */ jsx2("p", { className: "slp-lyric-next", "aria-hidden": true, children: "\xA0" })
            ]
          },
          currentLyric || "empty"
        ) })
      }
    ),
    onOpenFullscreen && !hideLyrics && /* @__PURE__ */ jsx2(
      "button",
      {
        type: "button",
        className: "slp-album-expand",
        onClick: onOpenFullscreen,
        "aria-label": "Open fullscreen lyrics",
        children: /* @__PURE__ */ jsx2(LyricsIcon, { size: 16 })
      }
    )
  ] });
}
var AlbumCover_default = AlbumCover;

// src/components/AudioVisualizer/AudioVisualizer.tsx
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { jsx as jsx3 } from "react/jsx-runtime";
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
          const topColor = `rgb(${Math.min(255, 180 + item)}, ${Math.min(180, 90 + item / 2)}, 50)`;
          const bottomColor = `rgb(${Math.min(220, 80 + item)}, ${Math.min(140, 40 + item / 3)}, 30)`;
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
  return /* @__PURE__ */ jsx3("div", { className: "slp-visualizer", children: /* @__PURE__ */ jsx3("canvas", { ref: canvasRef, className: "slp-canvas" }) });
}

// src/components/FullscreenLyrics/FullscreenLyrics.tsx
import React2, { useEffect as useEffect2, useRef as useRef2 } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence as AnimatePresence2, motion as motion2 } from "framer-motion";

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

// src/components/FullscreenLyrics/FullscreenLyrics.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function FullscreenLyrics({
  open,
  onClose,
  subtitles,
  currentIndex,
  albumArt,
  songName,
  artistName,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSkipBackward,
  onSkipForward,
  onSeek,
  onSeekToLyric
}) {
  const activeRef = useRef2(null);
  const progressPct = duration > 0 ? currentTime / duration * 100 : 0;
  const [mounted, setMounted] = React2.useState(false);
  useEffect2(() => {
    setMounted(true);
  }, []);
  useEffect2(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect2(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        onTogglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onTogglePlay]);
  useEffect2(() => {
    var _a;
    if (!open || currentIndex < 0) return;
    (_a = activeRef.current) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [currentIndex, open]);
  if (!mounted) return null;
  return createPortal(
    /* @__PURE__ */ jsx4(AnimatePresence2, { children: open && /* @__PURE__ */ jsxs3(
      motion2.div,
      {
        className: "slp-fs",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Fullscreen lyrics",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.28 },
        children: [
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: "slp-fs-bg",
              style: albumArt ? { backgroundImage: `url(${albumArt})` } : void 0,
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxs3("header", { className: "slp-fs-top", children: [
            /* @__PURE__ */ jsxs3("div", { className: "slp-fs-meta", children: [
              albumArt && /* @__PURE__ */ jsx4("img", { src: albumArt, alt: "", className: "slp-fs-thumb" }),
              /* @__PURE__ */ jsxs3("div", { className: "slp-fs-titles", children: [
                songName && /* @__PURE__ */ jsx4("p", { className: "slp-fs-song", children: songName }),
                artistName && /* @__PURE__ */ jsx4("p", { className: "slp-fs-artist", children: artistName })
              ] })
            ] }),
            /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                className: "slp-fs-close",
                onClick: onClose,
                "aria-label": "Close fullscreen lyrics",
                children: /* @__PURE__ */ jsx4(CloseIcon, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx4("div", { className: "slp-fs-scroll", children: subtitles.length === 0 ? /* @__PURE__ */ jsx4("p", { className: "slp-fs-empty", children: "No lyrics loaded yet" }) : /* @__PURE__ */ jsx4("ul", { className: "slp-fs-list", children: subtitles.map((line, index) => {
            const isActive = index === currentIndex;
            const isNear = !isActive && Math.abs(index - currentIndex) === 1;
            const isPassed = currentIndex >= 0 && index < currentIndex;
            return /* @__PURE__ */ jsx4("li", { children: /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                ref: isActive ? activeRef : void 0,
                className: [
                  "slp-fs-line",
                  isActive ? "is-active" : "",
                  isNear ? "is-near" : "",
                  isPassed ? "is-passed" : ""
                ].filter(Boolean).join(" "),
                onClick: () => onSeekToLyric(index),
                children: line.text
              }
            ) }, `${line.id}-${index}`);
          }) }) }),
          /* @__PURE__ */ jsxs3("footer", { className: "slp-fs-dock", children: [
            /* @__PURE__ */ jsx4(
              "input",
              {
                type: "range",
                className: "slp-fs-slider",
                style: { "--slp-progress": `${progressPct}%` },
                min: 0,
                max: duration || 0,
                step: 0.01,
                value: currentTime,
                onChange: (e) => onSeek(parseFloat(e.target.value)),
                "aria-label": "Seek"
              }
            ),
            /* @__PURE__ */ jsxs3("div", { className: "slp-fs-time", children: [
              /* @__PURE__ */ jsx4("span", { children: formatTime(currentTime) }),
              /* @__PURE__ */ jsx4("span", { children: formatTime(duration) })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "slp-fs-controls", children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  className: "slp-fs-icon-btn",
                  onClick: onSkipBackward,
                  "aria-label": "Skip backward 10s",
                  children: /* @__PURE__ */ jsx4(PrevIcon, { size: 22 })
                }
              ),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  className: "slp-fs-play",
                  onClick: onTogglePlay,
                  "aria-label": isPlaying ? "Pause" : "Play",
                  children: isPlaying ? /* @__PURE__ */ jsx4(PauseIcon, { size: 28 }) : /* @__PURE__ */ jsx4(PlayIcon, { size: 28 })
                }
              ),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  className: "slp-fs-icon-btn",
                  onClick: onSkipForward,
                  "aria-label": "Skip forward 10s",
                  children: /* @__PURE__ */ jsx4(NextIcon, { size: 22 })
                }
              )
            ] })
          ] })
        ]
      }
    ) }),
    document.body
  );
}

// src/hooks/use-lyric-sync.ts
import { useState, useEffect as useEffect3 } from "react";
function timeToMilliseconds(time) {
  const [hours, minutes, seconds] = time.split(":");
  const [secs, millis] = seconds.split(",");
  return parseInt(hours, 10) * 36e5 + parseInt(minutes, 10) * 6e4 + parseInt(secs, 10) * 1e3 + parseInt(millis, 10);
}
function useLyricsContext(subtitles, currentTime) {
  const [currentLyric, setCurrentLyric] = useState("");
  const [previousLyric, setPreviousLyric] = useState("");
  const [nextLyric, setNextLyric] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect3(() => {
    var _a, _b, _c, _d, _e;
    if (subtitles.length === 0) return;
    const currentTimeMs = (currentTime + 0.7) * 1e3;
    const index = subtitles.findIndex(
      (subtitle) => currentTimeMs >= timeToMilliseconds(subtitle.startTime) && currentTimeMs <= timeToMilliseconds(subtitle.endTime)
    );
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentLyric(subtitles[index].text);
      setPreviousLyric(((_a = subtitles[index - 1]) == null ? void 0 : _a.text) || "");
      setNextLyric(((_b = subtitles[index + 1]) == null ? void 0 : _b.text) || "");
      return;
    }
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
      setNextLyric(((_c = subtitles[0]) == null ? void 0 : _c.text) || "");
    } else {
      setCurrentIndex(lastPassed);
      setCurrentLyric(subtitles[lastPassed].text);
      setPreviousLyric(((_d = subtitles[lastPassed - 1]) == null ? void 0 : _d.text) || "");
      setNextLyric(((_e = subtitles[lastPassed + 1]) == null ? void 0 : _e.text) || "");
    }
  }, [subtitles, currentTime]);
  return { currentLyric, previousLyric, nextLyric, currentIndex };
}

// src/components/MusicPlayer/MusicPlayer.tsx
import { Fragment, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [fullscreen, setFullscreen] = useState2(false);
  const isSeekingRef = useRef3(false);
  const isRepeatRef = useRef3(isRepeat);
  isRepeatRef.current = isRepeat;
  const audioTrack = useRef3(null);
  const { currentLyric, previousLyric, nextLyric, currentIndex } = useLyricsContext(subtitles, currentTime);
  useEffect4(() => {
    if (!srtSrc || srtContentProp) return;
    fetch(srtSrc).then((res) => res.text()).then(setSrtContent).catch(console.error);
  }, [srtSrc, srtContentProp]);
  useEffect4(() => {
    if (!srtContent) return;
    const parser = new SrtParser2();
    setSubtitles(parser.fromSrt(srtContent));
  }, [srtContent]);
  const updateCurrentTime = useCallback(() => {
    if (!audioTrack.current || isSeekingRef.current) return;
    setCurrentTime(audioTrack.current.seek());
    if (audioTrack.current.playing()) {
      requestAnimationFrame(updateCurrentTime);
    }
  }, []);
  useEffect4(() => {
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
        setIsPlaying(false);
        if (isRepeatRef.current && audioTrack.current) {
          audioTrack.current.seek(0);
          audioTrack.current.play();
        }
      }
    });
    return () => {
      var _a;
      (_a = audioTrack.current) == null ? void 0 : _a.unload();
    };
  }, [audioSrc, updateCurrentTime]);
  const togglePlay = () => {
    if (!audioTrack.current) return;
    if (isPlaying) {
      audioTrack.current.pause();
    } else {
      audioTrack.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const seekTo = (time) => {
    if (!audioTrack.current) return;
    const clamped = Math.max(0, Math.min(time, duration || time));
    audioTrack.current.seek(clamped);
    setCurrentTime(clamped);
    if (audioTrack.current.playing()) {
      requestAnimationFrame(updateCurrentTime);
    }
  };
  const handleSliderChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setCurrentTime(newProgress);
    isSeekingRef.current = true;
    debouncedSeek(newProgress);
  };
  const skipForward = () => {
    if (!audioTrack.current) return;
    seekTo(Math.min(audioTrack.current.seek() + 10, duration));
  };
  const skipBackward = () => {
    if (!audioTrack.current) return;
    seekTo(Math.max(audioTrack.current.seek() - 10, 0));
  };
  const seekToLyric = (index) => {
    const line = subtitles[index];
    if (!line) return;
    seekTo(timeToMilliseconds(line.startTime) / 1e3);
  };
  const debouncedSeek = useCallback(
    debounce((newProgress) => {
      var _a;
      if (audioTrack.current) {
        audioTrack.current.seek(newProgress);
      }
      isSeekingRef.current = false;
      if ((_a = audioTrack.current) == null ? void 0 : _a.playing()) {
        requestAnimationFrame(updateCurrentTime);
      }
    }, 100),
    [audioTrack, updateCurrentTime]
  );
  const progressPct = duration > 0 ? currentTime / duration * 100 : 0;
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsxs4("div", { className: "slp-card", children: [
      /* @__PURE__ */ jsxs4("div", { className: "slp-body", children: [
        /* @__PURE__ */ jsx5(
          AlbumCover_default,
          {
            currentLyric,
            albumArt,
            nextLyric,
            previousLyric,
            onOpenFullscreen: () => setFullscreen(true),
            hideLyrics: fullscreen
          }
        ),
        /* @__PURE__ */ jsxs4("div", { className: "slp-controls", children: [
          /* @__PURE__ */ jsxs4("div", { className: "slp-song-info", children: [
            /* @__PURE__ */ jsxs4("div", { className: "slp-song-meta", children: [
              songName && /* @__PURE__ */ jsx5("h3", { className: "slp-song-name", children: songName }),
              artistName && /* @__PURE__ */ jsx5("p", { className: "slp-artist-name", children: artistName }),
              albumName && /* @__PURE__ */ jsx5("p", { className: "slp-album-name", children: albumName })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "slp-song-actions", children: [
              /* @__PURE__ */ jsx5(
                "button",
                {
                  className: "slp-like-btn",
                  onClick: () => setFullscreen(true),
                  "aria-label": "Open fullscreen lyrics",
                  title: "Fullscreen lyrics",
                  children: /* @__PURE__ */ jsx5(LyricsIcon, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsx5(
                "button",
                {
                  className: "slp-like-btn",
                  onClick: () => setLiked((v) => !v),
                  "aria-label": liked ? "Unlike song" : "Like song",
                  children: /* @__PURE__ */ jsx5(
                    HeartIcon,
                    {
                      size: 16,
                      fill: liked ? "#ef4444" : "rgba(243,244,246,0.4)"
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "slp-slider-wrapper", children: [
            /* @__PURE__ */ jsx5(
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
            /* @__PURE__ */ jsxs4("div", { className: "slp-time-row", children: [
              /* @__PURE__ */ jsx5("span", { children: formatTime(currentTime) }),
              /* @__PURE__ */ jsx5("span", { children: formatTime(duration) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "slp-btn-row", children: [
            /* @__PURE__ */ jsx5(
              "button",
              {
                className: `slp-icon-btn${isRepeat ? " slp-icon-btn-active" : ""}`,
                onClick: () => setIsRepeat(!isRepeat),
                "aria-label": isRepeat ? "Disable repeat" : "Enable repeat",
                children: /* @__PURE__ */ jsx5(RepeatIcon, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsx5(
              "button",
              {
                className: "slp-icon-btn",
                onClick: skipBackward,
                "aria-label": "Skip backward 10s",
                children: /* @__PURE__ */ jsx5(PrevIcon, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsx5(
              "button",
              {
                className: "slp-play-btn",
                onClick: togglePlay,
                "aria-label": isPlaying ? "Pause" : "Play",
                children: isPlaying ? /* @__PURE__ */ jsx5(PauseIcon, { size: 26 }) : /* @__PURE__ */ jsx5(PlayIcon, { size: 26 })
              }
            ),
            /* @__PURE__ */ jsx5(
              "button",
              {
                className: "slp-icon-btn",
                onClick: skipForward,
                "aria-label": "Skip forward 10s",
                children: /* @__PURE__ */ jsx5(NextIcon, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsx5(
              "button",
              {
                className: `slp-icon-btn${isShuffle ? " slp-icon-btn-active" : ""}`,
                onClick: () => setIsShuffle(!isShuffle),
                "aria-label": "Toggle shuffle",
                children: /* @__PURE__ */ jsx5(ShuffleIcon, { size: 20 })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "slp-visualizer-wrapper", children: audioTrack.current && /* @__PURE__ */ jsx5(AudioVisualizer, { howlRef: audioTrack, isPlaying }) })
    ] }),
    /* @__PURE__ */ jsx5(
      FullscreenLyrics,
      {
        open: fullscreen,
        onClose: () => setFullscreen(false),
        subtitles,
        currentIndex,
        albumArt,
        songName,
        artistName,
        isPlaying,
        currentTime,
        duration,
        onTogglePlay: togglePlay,
        onSkipBackward: skipBackward,
        onSkipForward: skipForward,
        onSeek: seekTo,
        onSeekToLyric: seekToLyric
      }
    )
  ] });
}
export {
  AudioVisualizer,
  FullscreenLyrics,
  MusicPlayer
};
//# sourceMappingURL=index.mjs.map