import { useEffect, useState } from "react";
import PressureGraph from "../components/PressureGraph";
import useSound from "../hooks/useSound";

/**
 * =====================================
 * HOME — SOLO TASK SYSTEM (FINAL CORE)
 * =====================================
 */

export default function Home({ hunter }) {
  const [level, setLevel] = useState(hunter.level ?? 1);
  const [xp, setXp] = useState(hunter.xp ?? 0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const [quests, setQuests] = useState(hunter.quests ?? []);
  const [newQuest, setNewQuest] = useState("");

  const requiredXP = level * level * 100;
  const pressure = Math.min(xp / requiredXP, 1);

  /* ===============================
     SOUND SYSTEM (ADDED)
     =============================== */
  const levelUpSound = useSound("/sounds/levelup.mp3", {
    volume: 0.9,
  });

  const ambientSound = useSound("/sounds/ambient.mp3", {
    volume: 0.25,
    loop: true,
  });

  // Start ambient after first user interaction (browser safe)
  useEffect(() => {
    const startAudio = () => {
      ambientSound.play();
      window.removeEventListener("click", startAudio);
    };
    window.addEventListener("click", startAudio);
    return () => window.removeEventListener("click", startAudio);
  }, []);

  /* ===============================
     LEVEL UP LOGIC (UNCHANGED + SOUND)
     =============================== */
  useEffect(() => {
    if (xp >= requiredXP) {
      setShowLevelUp(true);
      levelUpSound.play(); // 🔊 ADDED

      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setXp(0);
        setShowLevelUp(false);

        localStorage.setItem(
          "hunter",
          JSON.stringify({
            ...hunter,
            level: nextLevel,
            xp: 0,
            quests,
          })
        );
      }, 1800);
    }
    // eslint-disable-next-line
  }, [xp]);

  /* ===============================
     QUEST HANDLERS (UNCHANGED)
     =============================== */

  const addQuest = () => {
    if (!newQuest.trim()) return;

    const updated = [
      ...quests,
      {
        id: crypto.randomUUID(),
        title: newQuest,
        completed: false,
      },
    ];

    setQuests(updated);
    setNewQuest("");

    localStorage.setItem(
      "hunter",
      JSON.stringify({ ...hunter, level, xp, quests: updated })
    );
  };

  const completeQuest = (id) => {
    const updated = quests.map((q) =>
      q.id === id ? { ...q, completed: true } : q
    );

    setQuests(updated);
    setXp((prev) => prev + 120);

    localStorage.setItem(
      "hunter",
      JSON.stringify({ ...hunter, level, xp: xp + 120, quests: updated })
    );
  };

  return (
    <div className="relative w-full px-6 py-10 text-white">

      {/* ===== LEVEL UP OVERLAY ===== */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center animate-scaleUp">
            <p className="text-xs tracking-[0.6em] text-purple-400 mb-3">
              SYSTEM NOTICE
            </p>
            <h1 className="text-6xl font-extrabold tracking-widest hud-text">
              LEVEL UP
            </h1>
            <p className="mt-4 text-purple-300 tracking-widest">
              LEVEL {level + 1}
            </p>
          </div>
        </div>
      )}

      {/* ===== MASTER HUD ===== */}
      <div className="max-w-7xl mx-auto rounded-[32px] border border-purple-500/40 bg-black/70 backdrop-blur-xl shadow-[0_0_140px_rgba(168,85,247,0.45)] p-10 space-y-12">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs tracking-[0.4em] text-purple-400 uppercase">
              Hunter
            </p>
            <h1 className="text-xl font-semibold hud-text">
              @{hunter.nickname}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-xs tracking-widest text-purple-400">
              LEVEL
            </p>
            <p className="text-3xl font-bold text-purple-200">
              {level}
            </p>
          </div>
        </div>

        {/* ===== PRESSURE + STATUS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="h-[320px] rounded-3xl border border-purple-500/40 bg-black/60 shadow-[0_0_120px_rgba(168,85,247,0.45)] flex items-center justify-center">
            <PressureGraph value={pressure} />
          </div>

          <div className="space-y-6">
            <p className="text-xs tracking-widest text-purple-400">
              EXPERIENCE
            </p>
            <p className="text-sm text-purple-200">
              {xp} / {requiredXP} XP
            </p>
          </div>
        </div>

        {/* ===== QUEST SYSTEM ===== */}
        <div className="rounded-2xl border border-purple-500/30 bg-black/60 p-8 space-y-6">
          <p className="text-xs tracking-[0.4em] text-purple-400 uppercase">
            Daily Directives
          </p>

          <div className="flex gap-3">
            <input
              value={newQuest}
              onChange={(e) => setNewQuest(e.target.value)}
              placeholder="Declare new quest"
              className="flex-1 bg-black/60 border border-purple-500/30 rounded px-4 py-2 text-sm"
            />
            <button
              onClick={addQuest}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition"
            >
              ADD
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
                    onClick={() => completeQuest(q.id)}
                    className="text-xs px-4 py-1 rounded bg-purple-700 hover:bg-purple-800 transition"
                  >
                    COMPLETE
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
