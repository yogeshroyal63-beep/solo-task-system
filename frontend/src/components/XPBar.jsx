import { useEffect, useState } from "react";

export default function XPBar({ level, currentXP, maxXP }) {
  const [displayXP, setDisplayXP] = useState(currentXP);

  useEffect(() => {
    let frame;
    if (displayXP < currentXP) {
      frame = requestAnimationFrame(() => {
        setDisplayXP((prev) => Math.min(prev + 10, currentXP));
      });
    }
    return () => cancelAnimationFrame(frame);
  }, [currentXP, displayXP]);

  const percentage = (displayXP / maxXP) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-purple-300 mb-1">
        <span>Level {level}</span>
        <span>
          {displayXP} / {maxXP} XP
        </span>
      </div>

      <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400
          shadow-[0_0_15px_rgba(236,72,153,0.6)]
          transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
