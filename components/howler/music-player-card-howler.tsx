import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, Button, Slider } from "@nextui-org/react";
import SrtParser2 from "srt-parser-2";
import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { CiShuffle } from "react-icons/ci";
import { RiRepeatOneLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import AlbumCover from "../album-cover-lyrics";
import { StaticImageData } from "next/image";
import { useLyricsContext } from "@/hooks/use-lyric-sync";
import AudioVisualizer from "./audio-visualizer-howl";
import { Howl } from "howler";
import { debounce, formatTime } from "@/utils/functions";
import { MusicPlayerProps, Subtitle } from "@/utils/types";

export default function MusicPlayerCard({
  srtContent,
  audioSrc,
  albumArt,
  songName,
  artistName,
  albumName,
}: MusicPlayerProps) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  // Reference to Howl object for controlling the audio
  const audioTrack = useRef<Howl | null>(null);

  const { currentLyric, previousLyric, nextLyric } = useLyricsContext(
    subtitles,
    currentTime
  );

  useEffect(() => {
    const parser = new SrtParser2();
    const parsedSrt = parser.fromSrt(srtContent);
    setSubtitles(parsedSrt);
  }, [srtContent]);

  useEffect(() => {
    // Initialize Howler when the component mounts
    audioTrack.current = new Howl({
      src: [audioSrc],
      html5: true, // Ensures Howler uses HTML5 audio for larger files
      onload: () => {
        setDuration(audioTrack.current?.duration() || 0);
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
      },
    });

    return () => {
      audioTrack.current?.unload(); // Clean up Howler on component unmount
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (audioTrack.current) {
      if (isPlaying) {
        audioTrack.current.pause();
      } else {
        audioTrack.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: any) => {
    const newProgress = parseInt(value);
    setCurrentTime(newProgress);
    setIsSeeking(true);
    debouncedSeek(newProgress);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (isRepeat && audioTrack.current) {
      audioTrack.current.seek(0);
      audioTrack.current.play();
    }
  };

  const skipForward = () => {
    if (audioTrack.current) {
      const newTime = Math.min(
        (audioTrack.current.seek() as number) + 10,
        duration
      );
      audioTrack.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (audioTrack.current) {
      const newTime = Math.max((audioTrack.current.seek() as number) - 10, 0);
      audioTrack.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const updateCurrentTime = () => {
    if (audioTrack.current && isPlaying && !isSeeking) {
      setCurrentTime(audioTrack.current.seek() as number);
      requestAnimationFrame(updateCurrentTime);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSeek = useCallback(
    debounce((newProgress: number) => {
      if (audioTrack && audioTrack.current) {
        audioTrack.current.seek(newProgress);
      }
      setIsSeeking(false);
    }, 250),
    [audioTrack]
  );

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 md:min-w-[600px] md:min-h-[280px] bg-gray-300"
      shadow="lg"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-6">
            <AlbumCover
              currentLyric={currentLyric}
              albumArt={albumArt}
              nextLyric={nextLyric}
              previousLyric={previousLyric}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-6 pl-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{songName}</h3>
                <p className="text-small text-foreground/80">{artistName}</p>
                <h1 className="text-large font-medium mt-2">{albumName}</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
                aria-label={liked ? "Unlike song" : "Like song"}
              >
                <FaHeart
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "grey" : "red"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-4 gap-1">
              <Slider
                minValue={0}
                step={0.01}
                maxValue={duration}
                defaultValue={0.0}
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                className="w-full"
                size="sm"
                value={[currentTime]}
                onChange={(value) => handleSliderChange(value)}
                color="foreground"
                aria-label="Slider"
              />
              <div className="flex justify-between text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={toggleRepeat}
                aria-label={isRepeat ? "Disable repeat" : "Enable repeat"}
              >
                <RiRepeatOneLine className="text-foreground/80" size={20} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={skipBackward}
                aria-label="Skip backward"
              >
                <GiPreviousButton size={20} />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <IoPauseCircle size={54} />
                ) : (
                  <IoPlayCircle size={54} />
                )}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={skipForward}
                aria-label="Skip forward"
              >
                <GiNextButton size={20} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={() => setIsShuffle(!isShuffle)}
                aria-label="Enable shuffle"
              >
                <CiShuffle size={20} />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 ">
          {audioTrack.current && (
            <AudioVisualizer howlRef={audioTrack} isPlaying={isPlaying} />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
