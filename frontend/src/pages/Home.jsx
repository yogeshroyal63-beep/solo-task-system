import BackgroundFX from "../components/BackgroundFX";
import XPBar from "../components/XPBar";
import QuestCard from "../components/QuestCard";
import Navbar from "../components/Navbar";

/**
 * ===============================
 * HOME — ACTIVE SYSTEM HUD
 * ===============================
 *
 * This is where the hunter operates.
 * No rituals here — only dominance.
 */

export default function Home({ hunterStatus, auraLevel }) {
  /* ===============================
   * MOCK SYSTEM DATA (FOR NOW)
   * =============================== */

  const hunterProfile = {
    nickname: "Shadow",
    level: 7,
    currentXP: 8620,
    maxXP: 10000,
    rank: "A",
  };

  const quests = [
    {
      id: 1,
      title: "Clear the Dungeon: Crimson Gate",
      difficulty: "Hard",
      xp: 420,
    },
    {
      id: 2,
      title: "Daily Training Session",
      difficulty: "Easy",
      xp: 120,
    },
    {
      id: 3,
      title: "Shadow Extraction Practice",
      difficulty: "Medium",
      xp: 260,
    },
  ];

  /* ===============================
   * RENDER
   * =============================== */

  return (
    <>
      <BackgroundFX />

      <div className="relative min-h-screen text-white pb-24">

        {/* ===== HEADER ===== */}
        <header className="px-8 pt-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl tracking-[0.45em] uppercase text-purple-300 hud-text">
              Hunter System
            </h1>

            <div className="text-right">
              <p className="text-sm tracking-widest text-purple-200">
                {hunterProfile.nickname}
              </p>
              <p className="text-xs text-purple-400">
                Rank {hunterProfile.rank}
              </p>
            </div>
          </div>

          <div className="mt-5 max-w-xl">
            <XPBar
              level={hunterProfile.level}
              currentXP={hunterProfile.currentXP}
              maxXP={hunterProfile.maxXP}
            />
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="px-8 mt-14 space-y-10 max-w-6xl mx-auto">

          {/* ===== SYSTEM STATUS ===== */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SystemStat label="Status" value={hunterStatus} />
            <SystemStat label="Aura" value={auraLevel} />
            <SystemStat label="Rank" value={hunterProfile.rank} />
            <SystemStat label="Level" value={hunterProfile.level} />
          </section>

          {/* ===== QUEST BOARD ===== */}
          <section className="space-y-6">
            <h2 className="text-sm tracking-[0.4em] uppercase text-purple-400">
              Active Quests
            </h2>

            <div className="space-y-4">
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  status="idle"
                  onAction={() => {}}
                />
              ))}
            </div>
          </section>
        </main>

        {/* ===== NAV ===== */}
        <Navbar />
      </div>
    </>
  );
}

/* ===============================
 * SYSTEM STAT — SMALL HUD BLOCK
 * =============================== */

function SystemStat({ label, value }) {
  return (
    <div
      className="rounded-xl border border-purple-500/30
      bg-white/5 backdrop-blur-md
      px-4 py-3 text-center"
    >
      <p className="text-[10px] tracking-[0.35em] uppercase text-purple-300">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-purple-100">
        {value}
      </p>
    </div>
  );
}