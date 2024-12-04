import { VisualizerProps } from "@/utils/types";
import React, { useEffect, useRef } from "react";

export default function AudioVisualizer({
  howlRef,
  isPlaying,
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext("2d");
    if (!canvas || !canvasContext || !howlRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    const audioContext = audioContextRef.current;

    const handleAudioSetup = async () => {
      await audioContext.resume();

      if (!analyserRef.current) {
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyserRef.current = analyser;

        const soundSource = (howlRef.current as any)._sounds[0]?._node;

        if (soundSource) {
          const mediaElementSource =
            audioContext.createMediaElementSource(soundSource);
          mediaElementSource.connect(analyser);
          analyser.connect(audioContext.destination);
        }
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
          const bottomColor = `rgb(${Math.min(
            255,
            (255 - item) * 1.5
          )}, 100, 200)`;
          gradient.addColorStop(0, topColor);
          gradient.addColorStop(1, bottomColor);

          canvasContext.fillStyle = gradient;
          canvasContext.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );

          prevX = x;
          prevY = y;
          x += barWidth + 1;
        });

        canvasContext.lineWidth = 6;
        canvasContext.strokeStyle = "rgb(255, 255, 255)";
        canvasContext.stroke();

        if (isPlaying) {
          animationRef.current = requestAnimationFrame(draw);
        }
      };

      draw();
    };

    if (isPlaying) {
      handleAudioSetup();
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [howlRef, isPlaying]);

  return (
    <div className=" bg-sla rounded-lg">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100px" }}
      ></canvas>
    </div>
  );
}
