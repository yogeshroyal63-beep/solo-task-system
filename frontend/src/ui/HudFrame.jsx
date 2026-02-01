import { useState } from "react";
import ConsistencyGraph from "./ConsistencyGraph";


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

          {/* ===== PRESSURE GRAPH ===== */}
                <div
                className="
                    relative
                    h-80
                    rounded-3xl
                    border border-purple-500/40
                    bg-black/70
                    overflow-hidden
                    shadow-[0_0_120px_rgba(168,85,247,0.45)]
                "
                >
                <ConsistencyGraph />

                <div className="absolute top-4 left-6 text-xs tracking-[0.4em] text-purple-400 uppercase">
                    System Pressure
                </div>
                </div>


          {/* QUESTS */}
          {/* ===== DAILY DIRECTIVES ===== */}
<div
  className="
    relative
    rounded-3xl
    border border-purple-500/40
    bg-black/75
    backdrop-blur-xl
    shadow-[0_0_140px_rgba(168,85,247,0.35)]
    p-10
    space-y-6
  "
>
  {/* Section Header */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-[10px] tracking-[0.5em] text-purple-400 uppercase">
        Authority Issued
      </p>
      <h2 className="text-lg font-semibold hud-text tracking-wider">
        Daily Directives
      </h2>
    </div>

    <span className="text-xs text-purple-300">
      {quests.length} Active
    </span>
  </div>

  {/* Add Quest */}
  <div className="flex gap-4">
    <input
      value={newQuest}
      onChange={(e) => setNewQuest(e.target.value)}
      placeholder="Declare new directive"
      className="
        flex-1
        bg-black/60
        border border-purple-500/30
        rounded-xl
        px-4 py-3
        text-sm
        focus:outline-none
        focus:border-purple-400
      "
    />
    <button
      onClick={() => {
        if (newQuest.trim()) {
          onAddQuest(newQuest);
          setNewQuest("");
        }
      }}
      className="
        px-6 py-3
        rounded-xl
        bg-gradient-to-r from-purple-600 to-pink-600
        hover:scale-105
        transition
      "
    >
      AUTHORIZE
    </button>
  </div>

  {/* Quest List */}
            <div className="space-y-4">
                {quests.map((q) => (
                <div
                    key={q.id}
                    className="
                    flex justify-between items-center
                    rounded-xl
                    border border-purple-500/20
                    bg-black/50
                    px-6 py-4
                    "
                >
                    <div>
                    <p
                        className={`text-sm ${
                        q.completed
                            ? "line-through text-purple-500"
                            : "text-white"
                        }`}
                    >
                        {q.title}
                    </p>
                    <p className="text-xs text-purple-400">
                        Directive Status:{" "}
                        {q.completed ? "COMPLETED" : "PENDING"}
                    </p>
                    </div>

                    {!q.completed && (
                    <button
                        onClick={() => onCompleteQuest(q.id)}
                        className="
                        text-xs
                        px-4 py-2
                        rounded-lg
                        bg-purple-700
                        hover:bg-purple-800
                        transition
                        "
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
