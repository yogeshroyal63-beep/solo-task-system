import { useState, useRef } from "react";

/* ===== GLOBAL SYSTEM LAYERS ===== */
import AuraField from "./components/AuraField";
import CanvasAura from "./components/CanvasAura";
import SystemOverlay from "./components/SystemOverlay";
import SystemTransition from "./components/SystemTransition";

/* ===== PAGES ===== */
import Boot from "./pages/Boot";
import Gate from "./pages/Gate";
import Auth from "./pages/Auth";
import Awakening from "./pages/Awakening";
import Home from "./pages/Home";

/**
 * ===============================
 * SOLO LEVELING — SYSTEM CORE
 * ===============================
 */

export default function App() {
  /* ===== SYSTEM STATE ===== */
  const [systemPhase, setSystemPhase] = useState("INITIALIZING");
  const [hunterStatus, setHunterStatus] = useState("UNKNOWN");
  const [auraLevel, setAuraLevel] = useState("DORMANT");
  const [systemMessage, setSystemMessage] = useState(null);

  const canvasAuraRef = useRef(null);

  /* ===== AURA HELPERS ===== */
  const applyPressure = () => setAuraLevel("PRESSURE");

  const applyImpact = () => {
    setAuraLevel("IMPACT");
    canvasAuraRef.current?.burst();
    setTimeout(() => setAuraLevel("PRESSURE"), 300);
  };

  const applyAwakening = () => {
    setAuraLevel("SOVEREIGN");
    canvasAuraRef.current?.awaken();
  };

  return (
    <>
      {/* ===== BACKGROUND EFFECTS ===== */}
      <CanvasAura ref={canvasAuraRef} />
      <AuraField intensity={auraLevel.toLowerCase()} />

      {/* ===== SYSTEM MESSAGE ===== */}
      {systemMessage && <SystemOverlay text={systemMessage} />}

      {/* ===== BOOT ===== */}
      {systemPhase === "INITIALIZING" && (
        <SystemTransition phaseKey={systemPhase}>
          <Boot
            onComplete={() => {
              applyPressure();
              setSystemPhase("AWAITING_CHOICE");
            }}
          />
        </SystemTransition>
      )}

      {/* ===== GATE ===== */}
      {systemPhase === "AWAITING_CHOICE" && (
        <SystemTransition phaseKey={systemPhase}>
          <Gate
            onEnter={() => {
              applyImpact();
              setSystemPhase("RECOGNIZING");
            }}
          />
        </SystemTransition>
      )}

      {/* ===== AUTH ===== */}
      {systemPhase === "RECOGNIZING" && (
        <SystemTransition phaseKey={systemPhase}>
          <Auth
            onAuthSuccess={(type = "RETURNING") => {
              setHunterStatus(type);
              setSystemMessage(
                type === "RETURNING"
                  ? "WELCOME BACK, HUNTER"
                  : "NEW HUNTER DETECTED"
              );

              setTimeout(() => {
                setSystemMessage(null);
                setSystemPhase("AWAKENING");
              }, 1200);
            }}
          />
        </SystemTransition>
      )}

      {/* ===== AWAKENING ===== */}
      {systemPhase === "AWAKENING" && (
        <SystemTransition phaseKey={systemPhase}>
          <Awakening
            onConfirm={() => {
              applyAwakening();
              setSystemMessage("AWAKENING COMPLETE");

              setTimeout(() => {
                setSystemMessage(null);
                setHunterStatus("AWAKENED");
                setAuraLevel("PRESSURE");
                setSystemPhase("ACTIVE");
              }, 1500);
            }}
          />
        </SystemTransition>
      )}

      {/* ===== HOME ===== */}
      {systemPhase === "ACTIVE" && (
        <SystemTransition phaseKey={systemPhase}>
          <Home
            hunterStatus={hunterStatus}
            auraLevel={auraLevel}
          />
        </SystemTransition>
      )}
    </>
  );
}
