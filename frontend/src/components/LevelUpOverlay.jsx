import LevelUpOverlay from "../components/LevelUpOverlay";
import { useEffect } from "react";

export default function LevelUpOverlay({ show, level, onDone }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90 animate-fadeIn" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px] animate-pulse" />

      <div className="relative text-center">
        <p className="text-purple-300 tracking-[0.6em] text-sm mb-4">
          SYSTEM NOTICE
        </p>
        <h1 className="text-6xl font-extrabold tracking-widest bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-scaleUp">
          LEVEL UP
        </h1>
        <p className="mt-4 text-xl text-purple-200">
          Level {level}
        </p>
      </div>
    </div>
  );
}
