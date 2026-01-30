import { useState } from "react";
import SystemGraph from "./SystemGraph";

/**
 * ===============================
 * HUD FRAME — FINAL (SCROLL SAFE)
 * ===============================
 * STEP 10: Scroll + Layout Authority
 */

export default function HudFrame({
  hunter,
  level,
  xp,
  requiredXP,
  quests,
  onAddQuest,
  onCompleteQuest,
}) {
  const [newQuest, setNewQuest] = useState("");

  const rank = (() => {
    if (level < 5) return "E";
    if (level < 10) return "D";
    if (level < 20) return "C";
    if (level < 40) return "B";
    if (level < 80) return "A";
    return "S";
  })();

  const graphData = [20, 35, 30, 55, 50, 75, 65];
  const xpPercent = Math.min((xp / requiredXP) * 100, 100);

  return (
    /* 🔑 THIS is what enables scrolling */
    <main className="relative w-full min-h-screen overflow-y-auto">

      {/* Background glow (visual only, not blocking scroll) */}
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-purple-900/30 via-black to-black" />

      {/* CONTENT WRAPPER */}
      <div className="relative w-full px-6 py-12">


        {/* HUD FRAME */}
        <div
          className="
            rounded-[32px]
            border border-purple-500/40
            bg-gradient-to-br from-[#070a18]/95 to-[#03030a]/95
            backdrop-blur-2xl
            shadow-[0_0_200px_rgba(168,85,247,0.6)]
            p-12
            space-y-12
          "
        >

          {/* HEADER */}
          <div className="flex justify-between items-start border-b border-purple-500/20 pb-6">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-purple-400 uppercase">
                Hunter Identification
              </p>
              <h1 className="text-xl font-semibold hud-text tracking-wider">
                @{hunter?.nickname ?? "Hunter"}
              </h1>
            </div>

            <div className="text-right">
              <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase">
                Rank
              </p>
              <p className="text-3xl font-extrabold text-purple-200 hud-text">
                {rank}
              </p>
            </div>
          </div>

          {/* XP */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-purple-300">
              <span>LEVEL {level}</span>
              <span>{xp} / {requiredXP} XP</span>
            </div>

            <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0
                bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600
                energy-sweep"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* GRAPH */}
          <div className="relative h-72 rounded-2xl border border-purple-500/30 bg-black/60 overflow-hidden">
            <SystemGraph data={graphData} />
          </div>

          {/* QUESTS */}
          <div className="rounded-2xl border border-purple-500/30 bg-black/70 p-8 space-y-5">
            <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase">
              Daily Directives
            </p>

            <div className="flex gap-3">
              <input
                value={newQuest}
                onChange={(e) => setNewQuest(e.target.value)}
                placeholder="Declare new directive"
                className="flex-1 bg-black/60 border border-purple-500/30 rounded px-4 py-2 text-sm"
              />
              <button
                onClick={() => {
                  if (newQuest.trim()) {
                    onAddQuest(newQuest);
                    setNewQuest("");
                  }
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition"
              >
                AUTHORIZE
              </button>
            </div>

            <div className="space-y-3">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className="flex justify-between items-center border border-purple-500/20 rounded-lg p-4 bg-black/40"
                >
                  <span className={q.completed ? "line-through text-purple-500" : ""}>
                    {q.title}
                  </span>

                  {!q.completed && (
                    <button
                      onClick={() => onCompleteQuest(q.id)}
                      className="text-xs px-3 py-1 rounded bg-purple-700 hover:bg-purple-800 transition"
                    >
                      EXECUTE
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
