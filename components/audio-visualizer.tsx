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
        let prevX = 0;
        let prevY = 0;

        canvasContext.beginPath();

        dataArray.forEach((item, index) => {
          barHeight = item / 2; //  height of the bars

          // Calculate the current position of the bar
          const y = canvas.height - barHeight;

          // Draw a line from the previous bar's top to the current bar's top
          if (index > 0) {
            canvasContext.moveTo(prevX + barWidth / 2, prevY); // Move to the previous bar's top
            canvasContext.lineTo(x + barWidth / 2, y); // Line to the current bar's top
          }

          // Create a gradient for each bar
          const gradient = canvasContext.createLinearGradient(
            x,
            y, // Start at the top of the bar
            x,
            canvas.height // End at the bottom of the bar
          );

          // Map frequency data to two different colors
          const topColor = `rgb(${Math.min(255, item * 2)}, 50, 150)`; // Color at the top of the bar
          const bottomColor = `rgb(${Math.min(
            255,
            (255 - item) * 1.5
          )}, 100, 200)`; // Color at the bottom of the bar

          // Add colors to the gradient
          gradient.addColorStop(0, topColor); // Top of the bar
          gradient.addColorStop(1, bottomColor); // Bottom of the bar

          // Set the fillStyle to the gradient
          canvasContext.fillStyle = gradient;

          //   canvasContext.fillStyle = "#ff5733"; // Hex color (solid red-orange)

          canvasContext.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );

          // Store the previous position for the next line
          prevX = x;
          prevY = y;

          // Move to the next position
          x += barWidth + 1;
        });

        // Stroke the lines connecting the top of the bars
        canvasContext.lineWidth = 6; //  thickness of the connecting lines
        canvasContext.strokeStyle = "rgb(255, 255, 255)"; // color of connecting lines
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
  }, [audioRef, isPlaying]);

  return (
    <div className=" bg-sla rounded-lg">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100px" }}
      ></canvas>
    </div>
  );
}
