import { useEffect, useState } from "react";

/**
 * ===============================
 * SYSTEM TRANSITION (SCROLL SAFE)
 * ===============================
 */

export default function SystemTransition({ phaseKey, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [phaseKey]);

  return (
    <div className="relative w-full min-h-screen pointer-events-none">

      <div
        className={`
          w-full h-full
          transition-opacity duration-300 ease-out
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="pointer-events-auto w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
