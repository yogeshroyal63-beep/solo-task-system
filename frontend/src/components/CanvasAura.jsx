import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

/**
 * ===============================
 * CANVAS AURA — SYSTEM ENGINE
 * ===============================
 *
 * Responsibilities:
 * - Maintain ambient aura pressure
 * - Execute short impact bursts
 * - Execute sovereign awakening bursts
 * - Never dominate the UI
 * - Never run uncontrolled loops
 */

const CanvasAura = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  /* ===============================
   * CONFIGURATION
   * =============================== */

  const BASE_PARTICLE_COUNT = 90;
  const IDLE_SPEED = 0.15;
  const IMPACT_MULTIPLIER = 4;
  const AWAKEN_MULTIPLIER = 8;

  /* ===============================
   * PARTICLE MODEL
   * =============================== */

  class AuraParticle {
    constructor(w, h) {
      this.reset(w, h);
    }

    reset(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.radius = Math.random() * 2.5 + 0.5;
      this.alpha = Math.random() * 0.35 + 0.1;
      this.vx = (Math.random() - 0.5) * IDLE_SPEED;
      this.vy = (Math.random() - 0.5) * IDLE_SPEED;
    }

    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;

      if (
        this.x < -50 ||
        this.y < -50 ||
        this.x > w + 50 ||
        this.y > h + 50
      ) {
        this.reset(w, h);
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  /* ===============================
   * INITIALIZATION
   * =============================== */

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    particlesRef.current = Array.from(
      { length: BASE_PARTICLE_COUNT },
      () => new AuraParticle(canvas.width, canvas.height)
    );

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line
  }, []);

  /* ===============================
   * MAIN LOOP
   * =============================== */

  const startLoop = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  /* ===============================
   * EFFECTS — IMPACT
   * =============================== */

  const burst = () => {
    particlesRef.current.forEach((p) => {
      p.alpha = 1;
      p.radius *= 1.8;
      p.vx *= IMPACT_MULTIPLIER;
      p.vy *= IMPACT_MULTIPLIER;
    });

    setTimeout(() => {
      particlesRef.current.forEach((p) => {
        p.alpha = Math.random() * 0.35 + 0.1;
        p.radius = Math.random() * 2.5 + 0.5;
        p.vx = (Math.random() - 0.5) * IDLE_SPEED;
        p.vy = (Math.random() - 0.5) * IDLE_SPEED;
      });
    }, 300);
  };

  /* ===============================
   * EFFECTS — AWAKENING (SOVEREIGN)
   * =============================== */

  const awaken = () => {
    particlesRef.current.forEach((p) => {
      p.alpha = 1;
      p.radius *= 3;
      p.vx *= AWAKEN_MULTIPLIER;
      p.vy *= AWAKEN_MULTIPLIER;
    });

    setTimeout(() => {
      particlesRef.current.forEach((p) => {
        p.alpha = Math.random() * 0.35 + 0.1;
        p.radius = Math.random() * 2.5 + 0.5;
        p.vx = (Math.random() - 0.5) * IDLE_SPEED;
        p.vy = (Math.random() - 0.5) * IDLE_SPEED;
      });
    }, 700);
  };

  /* ===============================
   * EXPOSE SYSTEM API
   * =============================== */

  useImperativeHandle(ref, () => ({
    burst,
    awaken,
  }));

  /* ===============================
   * RENDER
   * =============================== */

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"

    />
  );
});

export default CanvasAura;