import React, { useEffect, useRef } from "react";

interface VisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

export default function AudioVisualizer({
  audioRef,
  isPlaying,
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    const canvasContext = canvas?.getContext("2d");
    if (!canvas || !audio || !canvasContext) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    const audioContext = audioContextRef.current;

    const handleAudioSetup = async () => {
      await audioContext.resume();

      if (!analyserRef.current) {
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512;
        analyserRef.current = analyser;
      }

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 1.5;
        let barHeight;
        let x = 0;

        dataArray.forEach((item) => {
          barHeight = item / 2;
          const color = `rgb(${barHeight + 100}, 50, 150)`;
          canvasContext.fillStyle = color;
          canvasContext.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );
          x += barWidth + 1;
        });

        if (isPlaying) {
          animationRef.current = requestAnimationFrame(draw);
        }
      };

      draw();
    };

    if (isPlaying) {
      handleAudioSetup();
    }
  }, [audioRef, isPlaying]);

  return (
    <>
      {isPlaying && (
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100px" }}
        ></canvas>
      )}
    </>
  );
}
