import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import SrtParser2 from "srt-parser-2";
import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { CiShuffle } from "react-icons/ci";
import { RiRepeatOneLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

interface MusicPlayerProps {
  srtContent: string;
  audioSrc: string;
  albumArt?: string;
  songName?: string;
  albumName?: string;
  artistName?: string;
}

type Subtitle = {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
};

export default function MusicPlayerCard({
  srtContent,
  audioSrc,
  albumArt,
  songName,
  artistName,
  albumName,
}: MusicPlayerProps) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentLyric, setCurrentLyric] = useState<string>("");
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const parser = new SrtParser2();
    const parsedSrt = parser.fromSrt(srtContent);
    setSubtitles(parsedSrt);
  }, [srtContent]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const updateLyric = () => {
    if (audioRef.current) {
      const currentTimeMs = audioRef.current.currentTime * 1000;
      setCurrentTime(audioRef.current.currentTime);

      const currentSubtitle = subtitles.find(
        (subtitle) =>
          currentTimeMs >= timeToMilliseconds(subtitle.startTime) &&
          currentTimeMs <= timeToMilliseconds(subtitle.endTime)
      );

      setCurrentLyric(currentSubtitle?.text || "");
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      updateLyric();
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
    }
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src={albumArt}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
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

            <div className="mt-4 px-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-700/50">
              <p className="text-center text-lg font-medium min-h-[2em]">
                {currentLyric || "♪ ♪ ♪"}
              </p>
            </div>

            <div className="flex flex-col mt-4 gap-1">
              <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                // controls
                className="hidden"
              />
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
                onPress={() => setIsShuffle(!isShuffle)}
                aria-label={isShuffle ? "Disable shuffle" : "Enable shuffle"}
              >
                <CiShuffle className="text-foreground/80" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
