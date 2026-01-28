import HudPanel from "./HudPanel";

export default function QuestCard({ quest, status, onAction }) {
  const statusText = {
    idle: "START QUEST",
    active: "COMPLETE QUEST",
    completed: "COMPLETED",
  };

  const statusStyle = {
    idle: "from-purple-600 via-pink-600 to-purple-600",
    active: "from-yellow-400 via-orange-500 to-yellow-400",
    completed: "from-green-500 via-emerald-600 to-green-500",
  };

  return (
    <HudPanel>
      <h2 className="text-xs tracking-[0.35em] text-purple-300 mb-2 uppercase hud-text">
        Main Quest
      </h2>

      <p className="text-xl font-semibold mb-5 hud-text">
        {quest.title}
      </p>

      <div className="flex items-center gap-4 text-xs mb-6">
        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 tracking-widest">
          {quest.difficulty}
        </span>
        <span className="text-yellow-400 font-semibold tracking-widest">
          +{quest.xp} XP
        </span>
      </div>

      <button
        onClick={onAction}
        disabled={status === "completed"}
        className={`w-full py-3 rounded-xl font-semibold tracking-[0.3em] uppercase
          bg-gradient-to-r ${statusStyle[status]}
          energy-sweep
          shadow-[0_0_25px_rgba(236,72,153,0.6)]
          hover:shadow-[0_0_40px_rgba(236,72,153,0.9)]
          hover:scale-[1.04] active:scale-[0.96]
          transition-all duration-200
        `}
      >
        {statusText[status]}
      </button>
    </HudPanel>
  );
}
