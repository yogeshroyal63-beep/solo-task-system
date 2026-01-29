import { useState, useRef, useEffect } from "react";

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
 * FLOW IS AUTHORITATIVE
 * UI IS UNTOUCHED
 */

export default function App() {
  /* ===============================
   * SYSTEM STATE
   * =============================== */
  const [systemPhase, setSystemPhase] = useState("INITIALIZING");
  const [auraLevel, setAuraLevel] = useState("DORMANT");
  const [systemMessage, setSystemMessage] = useState(null);

  // 🔑 THIS WAS MISSING BEFORE
  const [hunter, setHunter] = useState(null);

  const canvasAuraRef = useRef(null);

  /* ===============================
   * LOAD HUNTER FROM STORAGE
   * =============================== */
  useEffect(() => {
    const stored = localStorage.getItem("hunter");
    if (stored) {
      setHunter(JSON.parse(stored));
    }
  }, []);

  /* ===============================
   * AURA HELPERS
   * =============================== */
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

  /* ===============================
   * RENDER
   * =============================== */
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
            onAuthSuccess={(type) => {
              const storedHunter = JSON.parse(
                localStorage.getItem("hunter")
              );
              setHunter(storedHunter);

              setSystemMessage(
                type === "RETURNING"
                  ? "WELCOME BACK, HUNTER"
                  : "NEW HUNTER DETECTED"
              );

              setTimeout(() => {
                setSystemMessage(null);

                if (type === "RETURNING") {
                  // LOGIN → HOME
                  setSystemPhase("ACTIVE");
                } else {
                  // SIGNUP → AWAKENING
                  setSystemPhase("AWAKENING");
                }
              }, 1200);
            }}
          />
        </SystemTransition>
      )}

      {/* ===== AWAKENING ===== */}
      {systemPhase === "AWAKENING" && hunter && (
        <SystemTransition phaseKey={systemPhase}>
          <Awakening
            onConfirm={(chosenForm) => {
              applyAwakening();

              const updatedHunter = {
                ...hunter,
                awakenedForm: chosenForm,
              };

              localStorage.setItem(
                "hunter",
                JSON.stringify(updatedHunter)
              );
              setHunter(updatedHunter);

              setSystemMessage("AWAKENING COMPLETE");

              setTimeout(() => {
                setSystemMessage(null);
                setAuraLevel("PRESSURE");
                setSystemPhase("ACTIVE");
              }, 1500);
            }}
          />
        </SystemTransition>
      )}

      {/* ===== HOME ===== */}
      {systemPhase === "ACTIVE" && hunter && (
        <SystemTransition phaseKey={systemPhase}>
          <Home hunter={hunter} />
        </SystemTransition>
      )}
    </>
  );
}
