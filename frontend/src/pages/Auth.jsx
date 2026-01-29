import { useState } from "react";

import BackgroundFX from "../components/BackgroundFX";
import AuraInput from "../components/AuraInput";
import AuraButton from "../components/AuraButton";

/**
 * ===============================
 * AUTH — SYSTEM RECOGNITION
 * ===============================
 *
 * This is not a normal auth page.
 * This is where the SYSTEM recognizes:
 * - a returning hunter
 * - or a new awakening candidate
 */

export default function Auth({ onAuthSuccess }) {
  /* ===============================
   * MODE CONTROL
   * =============================== */
  const [mode, setMode] = useState("LOGIN");
  /**
   * LOGIN  -> Returning hunter
   * SIGNUP -> New hunter
   */

  /* ===============================
   * FORM STATE
   * =============================== */
  const [form, setForm] = useState({
    fullName: "",
    nickname: "",
    email: "",
    password: "",
  });

  const update = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  /* ===============================
   * SUBMIT HANDLERS
   * =============================== */

  const handleLogin = () => {
    /**
     * Later this will call backend.
     * For now, recognition is assumed successful.
     */
    onAuthSuccess("RETURNING");
  };

  const handleSignup = () => {
    /**
     * Full name + nickname matter.
     * Nickname becomes the hunter identity.
     */
    onAuthSuccess("NEW");
  };

  /* ===============================
   * RENDER
   * =============================== */

  return (
    <>
      <BackgroundFX />

      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="w-full max-w-xl mx-6">

          {/* ===== SYSTEM PANEL ===== */}
          <div
            className="rounded-2xl border border-purple-500/40
            bg-gradient-to-br from-[#0b0f2a]/95 to-[#060816]/95
            backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.25)]
            p-10 space-y-8"
          >
            {/* ===== TITLE ===== */}
            <div className="space-y-2">
              <h2 className="text-sm tracking-[0.6em] uppercase text-purple-300">
                {mode === "LOGIN"
                  ? "WELCOME BACK, HUNTER"
                  : "HUNTER REGISTRATION"}
              </h2>

              <p className="text-purple-200 text-sm">
                {mode === "LOGIN"
                  ? "The system recognizes your presence."
                  : "Only those with potential may awaken."}
              </p>
            </div>

            {/* ===== FORM ===== */}
            <div className="space-y-6">
              {mode === "SIGNUP" && (
                <>
                  <AuraInput
                    label="Full Name"
                    value={form.fullName}
                    onChange={update("fullName")}
                  />

                  <AuraInput
                    label="Hunter Nickname"
                    value={form.nickname}
                    onChange={update("nickname")}
                  />
                </>
              )}

              <AuraInput
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
              />

              <AuraInput
                label="Password"
                type="password"
                value={form.password}
                onChange={update("password")}
              />
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex items-center justify-between pt-4">
              {/* Mode switch */}
              <button
                onClick={() =>
                  setMode(mode === "LOGIN" ? "SIGNUP" : "LOGIN")
                }
                className="text-xs tracking-[0.4em] uppercase text-purple-300 hover:text-purple-100 transition"
              >
                {mode === "LOGIN"
                  ? "Register as a Hunter"
                  : "Already Recognized"}
              </button>

              {/* Primary action */}
              <AuraButton
                primary
                label={
                  mode === "LOGIN"
                    ? "Enter the Guild"
                    : "Proceed to Awakening"
                }
                onClick={
                  mode === "LOGIN"
                    ? handleLogin
                    : handleSignup
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
