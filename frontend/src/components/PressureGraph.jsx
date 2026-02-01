import { useEffect, useRef } from "react";

/**
 * =====================================
 * PRESSURE GRAPH — RADIAL SYSTEM CORE
 * =====================================
 * Pure visual
 * No state mutation
 */

export default function PressureGraph({ value = 0.6 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size = canvas.width;
    const center = size / 2;
    const radius = size * 0.32;

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // background ring
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168,85,247,0.15)";
      ctx.lineWidth = 10;
      ctx.stroke();

      // animated wave ring
      const wave = Math.sin(frame * 0.05) * 6;

      ctx.beginPath();
      ctx.arc(
        center,
        center,
        radius + wave,
        -Math.PI / 2,
        Math.PI * 2 * value - Math.PI / 2
      );
      ctx.strokeStyle = "rgba(168,85,247,0.9)";
      ctx.lineWidth = 12;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(168,85,247,0.8)";
      ctx.stroke();

      // inner glow
      ctx.beginPath();
      ctx.arc(center, center, radius - 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(236,72,153,0.4)";
      ctx.lineWidth = 4;
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    };

    draw();
  }, [value]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={260}
        height={260}
        className="block"
      />

      {/* CENTER TEXT */}
      <div className="absolute text-center">
        <p className="text-xs tracking-[0.4em] text-purple-400 uppercase">
          Pressure
        </p>
        <p className="text-2xl font-bold hud-text">
          {Math.round(value * 100)}%
        </p>
      </div>
    </div>
  );
}
