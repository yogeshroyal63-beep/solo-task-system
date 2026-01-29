import { useState, useRef } from "react";

import AuraField from "./components/AuraField";
import CanvasAura from "./components/CanvasAura";
import SystemOverlay from "./components/SystemOverlay";
import SystemTransition from "./components/SystemTransition";

import Boot from "./pages/Boot";
import Gate from "./pages/Gate";
import Auth from "./pages/Auth";
import Awakening from "./pages/Awakening";
import Home from "./pages/Home";

export default function App() {
  const [systemPhase, setSystemPhase] = useState("INITIALIZING");
  const [auraLevel, setAuraLevel] = useState("DORMANT");
  const [systemMessage, setSystemMessage] = useState(null);

  const canvasAuraRef = useRef(null);

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
      <CanvasAura ref={canvasAuraRef} />
      <AuraField intensity={auraLevel.toLowerCase()} />

      {systemMessage && (
        <SystemOverlay text={systemMessage} />
      )}

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

      {systemPhase === "RECOGNIZING" && (
        <SystemTransition phaseKey={systemPhase}>
          <Auth
            onAuthSuccess={(type) => {
              setSystemMessage(
                type === "RETURNING"
                  ? "WELCOME BACK, HUNTER"
                  : "NEW HUNTER DETECTED"
              );

              setTimeout(() => {
                setSystemMessage(null);

                if (type === "RETURNING") {
                  setSystemPhase("ACTIVE");
                } else {
                  setSystemPhase("AWAKENING");
                }
              }, 1200);
            }}
          />
        </SystemTransition>
      )}

      {systemPhase === "AWAKENING" && (
        <SystemTransition phaseKey={systemPhase}>
          <Awakening
            onConfirm={() => {
              applyAwakening();
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

      {systemPhase === "ACTIVE" && (
        <SystemTransition phaseKey={systemPhase}>
          <Home />
        </SystemTransition>
      )}
    </>
  );
}
