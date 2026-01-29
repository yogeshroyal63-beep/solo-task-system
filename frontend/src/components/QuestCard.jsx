import HudPanel from "./HudPanel";

export default function QuestCard({ quest, status, onAction }) {
  const statusText = {
    idle: "START",
    active: "COMPLETE",
    completed: "DONE",
  };

  const statusStyle = {
    idle: "from-purple-600 via-pink-600 to-purple-600",
    active: "from-yellow-400 via-orange-500 to-yellow-400",
    completed: "from-green-500 via-emerald-600 to-green-500",
  };

  return (
    <HudPanel className="p-0">
      <div className="flex items-center justify-between gap-6">
        {/* LEFT: QUEST INFO */}
        <div className="flex-1">
          <p className="text-xs tracking-[0.35em] uppercase text-purple-300 hud-text mb-1">
            Main Quest
          </p>

          <h3 className="text-lg font-semibold hud-text">
            {quest.title}
          </h3>

          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 tracking-widest">
              {quest.difficulty}
            </span>
          </div>
        </div>

        {/* CENTER: XP */}
        <div className="text-right">
          <p className="text-yellow-400 font-bold tracking-widest">
            +{quest.xp} XP
          </p>
        </div>

        {/* RIGHT: ACTION */}
        <button
          onClick={onAction}
          disabled={status === "completed"}
          className={`px-6 py-2 rounded-xl text-xs font-semibold tracking-[0.3em] uppercase
            bg-gradient-to-r ${statusStyle[status]}
            energy-sweep
            shadow-[0_0_20px_rgba(236,72,153,0.6)]
            hover:shadow-[0_0_35px_rgba(236,72,153,0.9)]
            hover:scale-[1.05] active:scale-[0.95]
            transition-all duration-200
          `}
        >
          {statusText[status]}
        </button>
      </div>
    </HudPanel>
  );
}
