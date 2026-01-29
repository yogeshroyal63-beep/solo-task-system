import { useEffect, useRef } from "react";

/**
 * ===============================
 * BACKGROUND FX — CINEMATIC DEPTH
 * ===============================
 * Starfield + subtle motion
 * Purely decorative
 */

export default function BackgroundFX() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2,
      s: Math.random() * 0.3 + 0.05,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#ffffff";
      stars.forEach((s) => {
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.s;
        if (s.y > h) {
          s.y = 0;
          s.x = Math.random() * w;
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-20] pointer-events-none">
      {/* STARFIELD */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#02010a] via-[#0a0433] to-black" />

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* FILM NOISE */}
      <div className="absolute inset-0 opacity-[0.08] noise-bg" />
    </div>
  );
}
