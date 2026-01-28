export default function QuestCard({ quest, status, onAction }) {
  const statusText = {
    idle: "START QUEST",
    active: "COMPLETE QUEST",
    completed: "COMPLETED",
  };

  const statusStyle = {
    idle: "from-purple-600 to-pink-600",
    active: "from-yellow-500 to-orange-500",
    completed: "from-green-600 to-emerald-600",
  };

  return (
    <div
      className={`rounded-2xl p-6 backdrop-blur-md border 
        ${
          status === "active"
            ? "border-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
            : status === "completed"
            ? "border-green-500/60 shadow-[0_0_25px_rgba(34,197,94,0.25)]"
            : "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        }
        bg-gradient-to-br from-white/10 to-white/5
        transition-all duration-300
      `}
    >
      <h2 className="text-sm text-purple-300 tracking-wide mb-2">
        TODAY&apos;S QUEST
      </h2>

      <p className="text-xl font-bold mb-4">{quest.title}</p>

      <div className="flex items-center gap-4 text-sm mb-6">
        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300">
          {quest.difficulty}
        </span>
        <span className="text-yellow-400 font-semibold">
          +{quest.xp} XP
        </span>
      </div>

      <button
        onClick={onAction}
        disabled={status === "completed"}
        className={`w-full py-3 rounded-xl font-semibold tracking-wide
          bg-gradient-to-r ${statusStyle[status]}
          hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-200
        `}
      >
        {statusText[status]}
      </button>
    </div>
  );
}
