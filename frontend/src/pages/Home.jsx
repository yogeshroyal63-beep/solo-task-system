import { useEffect, useState } from "react";

/**
 * ===============================
 * HOME — SOLO TASK SYSTEM
 * ===============================
 * STEP 5: MASTER HUD FRAME
 * Matches reference composition
 */

export default function Home({ hunter }) {
  const [level, setLevel] = useState(hunter.level ?? 1);
  const [xp, setXp] = useState(hunter.xp ?? 0);
  const [rank, setRank] = useState(hunter.rank ?? "E");
  const [showLevelUp, setShowLevelUp] = useState(false);

  const requiredXP = level * level * 100;

  /* ===============================
   * LEVEL UP LOGIC (UNCHANGED)
   * =============================== */
  useEffect(() => {
    if (xp >= requiredXP) {
      setShowLevelUp(true);

      setTimeout(() => {
        setLevel((prev) => prev + 1);
        setXp(0);
        setShowLevelUp(false);

        localStorage.setItem(
          "hunter",
          JSON.stringify({
            ...hunter,
            level: level + 1,
            xp: 0,
          })
        );
      }, 2200);
    }
    // eslint-disable-next-line
  }, [xp]);

  useEffect(() => {
    if (level < 5) setRank("E");
    else if (level < 10) setRank("D");
    else if (level < 20) setRank("C");
    else if (level < 40) setRank("B");
    else if (level < 80) setRank("A");
    else setRank("S");
  }, [level]);

  return (
    <div className="relative min-h-screen px-6 py-8 text-white overflow-y-auto">

      {/* ===== LEVEL UP OVERLAY ===== */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center animate-scaleUp">
            <p className="text-xs tracking-[0.6em] text-purple-400 mb-3">
              SYSTEM NOTICE
            </p>
            <h1 className="text-5xl font-extrabold tracking-widest hud-text">
              LEVEL UP
            </h1>
            <p className="mt-4 text-purple-300 tracking-widest">
              LEVEL {level + 1}
            </p>
          </div>
        </div>
      )}

      {/* ===============================
         MASTER HUD FRAME
         =============================== */}
      <div
        className="
          max-w-6xl mx-auto
          rounded-3xl
          border border-purple-500/40
          bg-gradient-to-br from-black/85 to-[#07021a]/90
          backdrop-blur-xl
          shadow-[0_0_120px_rgba(168,85,247,0.45)]
          p-10
          space-y-10
        "
      >

        {/* ===== XP HUD ===== */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs tracking-[0.5em] text-purple-300">
                HUNTER STATUS
              </p>
              <h1 className="text-lg font-semibold hud-text">
                @{hunter.nickname}
              </h1>
            </div>

            <div className="text-right">
              <p className="text-xs tracking-widest text-purple-300">
                RANK
              </p>
              <p className="text-xl font-bold text-purple-200">
                {rank}
              </p>
            </div>
          </div>

          <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 energy-sweep"
              style={{ width: `${Math.min((xp / requiredXP) * 100, 100)}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-purple-300">
            <span>LEVEL {level}</span>
            <span>{xp} / {requiredXP} XP</span>
          </div>
        </section>

        {/* ===== TELEMETRY GRAPH ===== */}
        <section className="relative h-52 rounded-2xl border border-purple-500/30 bg-black/50 overflow-hidden">
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full">
            <path
              d="M0 25 C10 10,20 30,30 18 S50 5,60 20 S80 35,100 15"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.8"
            />
            <path
              d="M0 30 C15 20,25 35,40 22 S65 8,80 28 S90 35,100 20"
              fill="none"
              stroke="rgba(168,85,247,0.4)"
              strokeWidth="1"
            />
          </svg>

          <div className="absolute bottom-3 right-4 text-xs tracking-widest text-purple-300">
            SYSTEM TELEMETRY
          </div>
        </section>

        {/* ===== MAIN QUEST ===== */}
        <section className="rounded-2xl border border-purple-500/30 bg-black/60 p-8">
          <p className="text-xs tracking-widest text-purple-400 mb-2">
            TODAY’S MAIN QUEST
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Design the UI for the To-Do App
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-300">
              EASY
            </span>
            <span className="text-sm text-purple-300">
              +120 XP
            </span>
          </div>

          <button
            onClick={() => setXp((prev) => prev + 120)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition"
          >
            START QUEST
          </button>
        </section>

        {/* ===== STATS ===== */}
        <section className="grid grid-cols-3 gap-6">
          <HudStat label="Tasks Completed" value="3 Today" />
          <HudStat label="Current Streak" value="5 Days" />
          <HudStat label="Focus Time" value="1h 45m" />
        </section>
      </div>
    </div>
  );
}

/* ===== HUD STAT ===== */
function HudStat({ label, value }) {
  return (
    <div className="rounded-xl border border-purple-500/20 bg-black/40 p-6 text-center">
      <p className="text-xs tracking-widest text-purple-400">
        {label}
      </p>
      <p className="text-lg font-semibold mt-2">
        {value}
      </p>
    </div>
  );
}
