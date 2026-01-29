import { useEffect, useState } from "react";
import LoadingSigil from "../components/LoadingSigil";
import BackgroundFX from "../components/BackgroundFX";

/**
 * ===============================
 * BOOT — SYSTEM INITIALIZATION
 * ===============================
 *
 * This screen MUST:
 * 1. Show loading ritual
 * 2. Advance automatically
 * 3. Never loop forever
 */

export default function Boot({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // 🚨 THIS WAS MISSING BEFORE
        setTimeout(() => {
          onComplete(); // 👉 MOVE TO GATE
        }, 600);
      } else {
        setProgress(current);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <>
      <BackgroundFX />

      <div className="min-h-screen flex items-center justify-center text-white">
        <LoadingSigil progress={progress} />
      </div>
    </>
  );
}