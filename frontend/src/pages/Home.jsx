import { useEffect, useRef } from "react";

export default function Home({ hunterStatus = "AWAKENED" }) {
  const xpCanvasRef = useRef(null);
  const auraCanvasRef = useRef(null);

  /* ===============================
   * MOCKED DISPLAY DATA (SAFE)
   * =============================== */
  const hunter = {
    nickname: "DevHunter",
    level: 7,
    rank: "A",
    xp: 8620,
    maxXp: 10000,
    streak: 5,
    tasksToday: 3,
    focusTime: "1h 45m",
    mainQuest: {
      title: "Design the UI for the To-Do App",
      difficulty: "Easy",
      xp: 120,
    },
  };

  /* ===============================
   * XP GRAPH (WAVE)
   * =============================== */
  useEffect(() => {
    const canvas = xpCanvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#7c3aed");
    gradient.addColorStop(1, "#ec4899");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const progress = hunter.xp / hunter.maxXp;
      const y =
        canvas.height / 2 +
        Math.sin(x * 0.03) * 25 * progress;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, []);

  /* ===============================
   * AURA RADAR GRAPH
   * =============================== */
  useEffect(() => {
    const canvas = auraCanvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 220;
    canvas.height = 220;

    const cx = 110;
    const cy = 110;
    const radius = 80;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const points = 6;
    const values = [0.9, 0.7, 0.8, 0.6, 0.85, 0.75];

    ctx.strokeStyle = "rgba(168,85,247,0.6)";
    ctx.fillStyle = "rgba(168,85,247,0.25)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    values.forEach((v, i) => {
      const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const r = radius * v;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, []);

  /* ===============================
   * RENDER
   * =============================== */
  return (
    <div className="min-h-screen text-white px-10 pt-24 pb-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-widest">
            SOLO TASK SYSTEM
          </h1>
          <p className="text-purple-400 text-sm">
            @{hunter.nickname}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-purple-300 uppercase tracking-widest">
            Rank
          </p>
          <p className="text-xl font-semibold">{hunter.rank}</p>
        </div>
      </div>

      {/* XP GRAPH */}
      <div className="mb-12">
        <canvas
          ref={xpCanvasRef}
          className="w-full h-32 rounded-xl bg-black/40 border border-purple-500/20"
        />
        <div className="flex justify-between text-xs text-purple-300 mt-2">
          <span>Level {hunter.level}</span>
          <span>
            {hunter.xp} / {hunter.maxXp} XP
          </span>
        </div>
      </div>

      {/* MAIN QUEST */}
      <div className="rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-xl p-8 mb-12 shadow-[0_0_80px_rgba(168,85,247,0.35)]">
        <p className="text-xs tracking-widest uppercase text-purple-300 mb-2">
          Today’s Main Quest
        </p>

        <h2 className="text-xl font-semibold mb-4">
          {hunter.mainQuest.title}
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 text-xs rounded bg-green-500/20 text-green-300">
            {hunter.mainQuest.difficulty}
          </span>
          <span className="text-yellow-400 text-sm">
            +{hunter.mainQuest.xp} XP
          </span>
        </div>

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold tracking-wide hover:scale-105 transition">
          START QUEST
        </button>
      </div>

      {/* STATS + GRAPH */}
      <div className="grid grid-cols-3 gap-6">
        <Stat title="Tasks Completed" value={hunter.tasksToday} />
        <Stat title="Current Streak" value={`${hunter.streak} Days`} />
        <Stat title="Focus Time" value={hunter.focusTime} />
      </div>

      {/* AURA GRAPH */}
      <div className="flex justify-center mt-14">
        <canvas ref={auraCanvasRef} />
      </div>
    </div>
  );
}

/* ===============================
 * STAT CARD
 * =============================== */
function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-purple-500/20 bg-black/40 p-6 text-center backdrop-blur">
      <p className="text-xs uppercase tracking-widest text-purple-300 mb-1">
        {title}
      </p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
