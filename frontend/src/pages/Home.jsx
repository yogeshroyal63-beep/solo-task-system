import { useState } from "react";
import BackgroundFX from "../components/BackgroundFX";
import XPBar from "../components/XPBar";
import QuestCard from "../components/QuestCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [xp, setXp] = useState(8620);
  const [activeQuestId, setActiveQuestId] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [activeTab, setActiveTab] = useState("home");

  const user = {
    username: "DevHunter",
    level: 7,
    maxXP: 10000,
  };

  const quests = [
    {
      id: 1,
      title: "Design the UI for the To-Do App",
      difficulty: "Easy",
      xp: 120,
    },
    {
      id: 2,
      title: "Build Quest Interaction",
      difficulty: "Medium",
      xp: 240,
    },
    {
      id: 3,
      title: "Animate XP Progress",
      difficulty: "Hard",
      xp: 360,
    },
  ];

  const onQuestAction = (quest) => {
    if (completed.has(quest.id)) return;

    if (activeQuestId !== quest.id) {
      setActiveQuestId(quest.id);
    } else {
      setCompleted(new Set([...completed, quest.id]));
      setActiveQuestId(null);
      setXp((prev) => Math.min(prev + quest.xp, user.maxXP));
    }
  };

  return (
    <>
      {/* ===== CINEMATIC BACKGROUND ===== */}
      <BackgroundFX />

      {/* ===== APP CONTAINER ===== */}
      <div className="relative min-h-screen text-white pb-28">
        {/* ===== HEADER ===== */}
        <header className="px-6 pt-6 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-[0.45em] text-purple-300 hud-text uppercase">
              Solo Task System
            </h1>
            <span className="text-sm text-purple-200">
              @{user.username}
            </span>
          </div>

          <div className="mt-5">
            <XPBar
              level={user.level}
              currentXP={xp}
              maxXP={user.maxXP}
            />
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="px-6 mt-12 space-y-10 max-w-md mx-auto">
          {activeTab === "home" &&
            quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                status={
                  completed.has(quest.id)
                    ? "completed"
                    : activeQuestId === quest.id
                    ? "active"
                    : "idle"
                }
                onAction={() => onQuestAction(quest)}
              />
            ))}

          {activeTab === "rank" && (
            <div className="text-center mt-24 text-purple-200">
              <h2 className="text-2xl font-bold tracking-widest mb-2 hud-text uppercase">
                Skill Rank
              </h2>
              <p className="text-lg">Rank: A</p>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="text-center mt-24 text-purple-200">
              <h2 className="text-2xl font-bold tracking-widest mb-2 hud-text uppercase">
                Achievements
              </h2>
              <p>Coming soon…</p>
            </div>
          )}
        </main>

        {/* ===== BOTTOM NAV ===== */}
        <Navbar activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </>
  );
}
