import { useEffect, useState } from "react";

/**
 * ===============================
 * SYSTEM TRANSITION (SAFE)
 * ===============================
 * Does NOT break fixed positioning
 */

export default function SystemTransition({ phaseKey, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [phaseKey]);

  return (
    <div className="fixed inset-0 pointer-events-none">
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
