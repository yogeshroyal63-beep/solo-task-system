import { useEffect, useState } from "react";
import HudFrame from "../ui/HudFrame";

/**
 * ===============================
 * HOME — SYSTEM CONTROLLER
 * ===============================
 * STEP 7: PUNISHMENT SYSTEM
 */

export default function Home({ hunter }) {
  const today = new Date().toISOString().split("T")[0];

  const [level, setLevel] = useState(hunter.level ?? 1);
  const [xp, setXp] = useState(hunter.xp ?? 0);
  const [quests, setQuests] = useState(hunter.quests ?? []);
  const [lastActiveDate, setLastActiveDate] = useState(
    hunter.lastActiveDate ?? today
  );
  const [showLevelUp, setShowLevelUp] = useState(false);

  /* ===============================
   * XP CURVE
   * =============================== */
  const getRequiredXP = (lvl) => {
    if (lvl <= 5) return 120 + lvl * 40;
    if (lvl <= 15) return 300 + lvl * 120;
    if (lvl <= 30) return 800 + lvl * lvl * 25;
    return 2000 + lvl * lvl * 60;
  };

  const requiredXP = getRequiredXP(level);

  /* ===============================
   * LEVEL UP
   * =============================== */
  useEffect(() => {
    if (xp >= requiredXP) {
      setShowLevelUp(true);

      setTimeout(() => {
        const overflow = xp - requiredXP;
        const newLevel = level + 1;

        setLevel(newLevel);
        setXp(overflow);
        setShowLevelUp(false);

        saveHunter({
          ...hunter,
          level: newLevel,
          xp: overflow,
          quests,
          lastActiveDate: today,
        });
      }, 2000);
    }
    // eslint-disable-next-line
  }, [xp]);

  /* ===============================
   * 🔥 PUNISHMENT SYSTEM
   * =============================== */
  useEffect(() => {
    if (lastActiveDate === today) return;

    const diffDays =
      (new Date(today) - new Date(lastActiveDate)) /
      (1000 * 60 * 60 * 24);

    let newLevel = level;
    let newXp = xp;

    if (diffDays >= 3) {
      newLevel = Math.max(1, level - 1);
      newXp = 0;
    } else if (diffDays >= 2) {
      newXp = Math.max(0, Math.floor(xp * 0.5));
    }

    if (newLevel !== level || newXp !== xp) {
      setLevel(newLevel);
      setXp(newXp);

      saveHunter({
        ...hunter,
        level: newLevel,
        xp: newXp,
        quests,
        lastActiveDate: today,
      });
    }
    // eslint-disable-next-line
  }, []);

  /* ===============================
   * QUEST SYSTEM
   * =============================== */
  const addQuest = (title) => {
    if (!title.trim()) return;

    const updated = [
      ...quests,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
        date: today,
        xp: 80,
      },
    ];

    setQuests(updated);
    saveHunter({ ...hunter, quests: updated });
  };

  const completeQuest = (id) => {
    const updated = quests.map((q) =>
      q.id === id ? { ...q, completed: true } : q
    );

    const quest = quests.find((q) => q.id === id);
    const gainedXP = quest?.xp ?? 0;

    setQuests(updated);
    setXp((prev) => prev + gainedXP);
    setLastActiveDate(today);

    saveHunter({
      ...hunter,
      quests: updated,
      xp: xp + gainedXP,
      lastActiveDate: today,
    });
  };

  /* ===============================
   * STORAGE
   * =============================== */
  const saveHunter = (data) => {
    localStorage.setItem("hunter", JSON.stringify(data));
  };

  return (
    <div className="min-h-screen w-full text-white overflow-y-auto">
      {/* LEVEL UP OVERLAY */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center animate-scaleUp">
            <p className="text-xs tracking-[0.6em] text-purple-400 mb-3">
              SYSTEM NOTICE
            </p>
            <h1 className="text-6xl font-extrabold hud-text">
              LEVEL UP
            </h1>
            <p className="mt-4 tracking-widest text-purple-300">
              LEVEL {level + 1}
            </p>
          </div>
        </div>
      )}

      <HudFrame
        hunter={hunter}
        level={level}
        xp={xp}
        requiredXP={requiredXP}
        quests={quests}
        onAddQuest={addQuest}
        onCompleteQuest={completeQuest}
      />
    </div>
  );
}
