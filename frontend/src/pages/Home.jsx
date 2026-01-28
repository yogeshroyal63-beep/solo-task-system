import { useState } from "react";
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
    { id: 1, title: "Design the UI for the To-Do App", difficulty: "Easy", xp: 120 },
    { id: 2, title: "Build Quest Interaction", difficulty: "Medium", xp: 240 },
    { id: 3, title: "Animate XP Progress", difficulty: "Hard", xp: 360 },
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
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0b1025] to-[#120a2a] text-white pb-24 relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <header className="px-6 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-widest text-purple-300">
            SOLO TASK SYSTEM
          </h1>
          <div className="text-sm text-purple-200">@{user.username}</div>
        </div>

        <div className="mt-4">
          <XPBar level={user.level} currentXP={xp} maxXP={user.maxXP} />
        </div>
      </header>

      <main className="px-6 mt-12 space-y-8 max-w-md mx-auto">
        {activeTab === "home" &&
          quests.map((q) => (
            <QuestCard
              key={q.id}
              quest={q}
              status={
                completed.has(q.id)
                  ? "completed"
                  : activeQuestId === q.id
                  ? "active"
                  : "idle"
              }
              onAction={() => onQuestAction(q)}
            />
          ))}

        {activeTab === "rank" && (
          <div className="text-center text-purple-200 mt-20">
            <h2 className="text-xl font-bold mb-2">Skill Rank</h2>
            <p>Rank: A</p>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="text-center text-purple-200 mt-20">
            <h2 className="text-xl font-bold mb-2">Achievements</h2>
            <p>Coming soon…</p>
          </div>
        )}
      </main>

      <Navbar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
