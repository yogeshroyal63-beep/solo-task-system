import { useEffect, useRef } from "react";

/**
 * =====================================
 * PRESSURE GRAPH — SYSTEM CORE HUD
 * =====================================
 * Multi-ring intimidation graph
 * Visual only (no state mutations)
 */

export default function PressureGraph({ value = 0 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  let rotation = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    const c = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      /* ===============================
         OUTER AUTHORITY RING
         =============================== */
      ctx.beginPath();
      ctx.arc(c, c, 140, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168,85,247,0.25)";
      ctx.lineWidth = 10;
      ctx.stroke();

      /* ===============================
         ROTATING SEGMENT RING
         =============================== */
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(rotation);
      ctx.translate(-c, -c);

      for (let i = 0; i < 32; i++) {
        const start = (Math.PI * 2 / 32) * i;
        const end = start + Math.PI * 0.04;

        ctx.beginPath();
        ctx.arc(c, c, 120, start, end);
        ctx.strokeStyle = "rgba(168,85,247,0.6)";
        ctx.lineWidth = 6;
        ctx.stroke();
      }
      ctx.restore();

      /* ===============================
         PRESSURE ARC (PULSING)
         =============================== */
      const pulse = Math.sin(Date.now() * 0.004) * 6;

      ctx.beginPath();
      ctx.arc(
        c,
        c,
        92 + pulse,
        -Math.PI / 2,
        Math.PI * 2 * value - Math.PI / 2
      );
      ctx.strokeStyle = "rgba(236,72,153,0.95)";
      ctx.lineWidth = 14;
      ctx.shadowBlur = 24;
      ctx.shadowColor = "rgba(236,72,153,0.8)";
      ctx.stroke();

      /* ===============================
         INNER CORE RING
         =============================== */
      ctx.beginPath();
      ctx.arc(c, c, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168,85,247,0.4)";
      ctx.lineWidth = 4;
      ctx.stroke();

      rotation += 0.0025;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} />

      {/* ===== CENTER READOUT ===== */}
      <div className="absolute text-center">
        <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase">
          Pressure
        </p>
        <p className="text-3xl font-extrabold hud-text">
          {Math.round(value * 100)}%
        </p>
      </div>
    </div>
  );
}
