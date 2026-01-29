import { useState } from "react";

import BackgroundFX from "../components/BackgroundFX";
import AuraInput from "../components/AuraInput";
import AuraButton from "../components/AuraButton";

/**
 * ===============================
 * AUTH — SYSTEM RECOGNITION
 * ===============================
 */

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("LOGIN");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    nickname: "",
    email: "",
    password: "",
  });

  const update = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ===============================
   * LOGIN
   * =============================== */
  const handleLogin = () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Enter your credentials");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!user) {
      setError("Check your credentials");
      return;
    }

    localStorage.setItem(
      "hunter",
      JSON.stringify(user)
    );

    onAuthSuccess("RETURNING");
  };

  /* ===============================
   * SIGNUP
   * =============================== */
  const handleSignup = () => {
    setError("");

    if (
      !form.fullName ||
      !form.nickname ||
      !form.email ||
      !form.password
    ) {
      setError("Enter all credentials");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    const exists = users.find(
      (u) => u.email === form.email
    );

    if (exists) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      fullName: form.fullName,
      nickname: form.nickname,
      email: form.email,
      password: form.password,
      awakenedForm: null,
      level: 1,
      xp: 0,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
    localStorage.setItem(
      "hunter",
      JSON.stringify(newUser)
    );

    onAuthSuccess("NEW");
  };

  return (
    <>
      <BackgroundFX />

      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="w-full max-w-xl mx-6">
          <div
            className="rounded-2xl border border-purple-500/40
            bg-gradient-to-br from-[#0b0f2a]/95 to-[#060816]/95
            backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.25)]
            p-10 space-y-8"
          >
            {/* TITLE */}
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

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            {/* FORM */}
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

            {/* ACTIONS */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() =>
                  setMode(
                    mode === "LOGIN"
                      ? "SIGNUP"
                      : "LOGIN"
                  )
                }
                className="text-xs tracking-[0.4em] uppercase text-purple-300 hover:text-purple-100 transition"
              >
                {mode === "LOGIN"
                  ? "Register as a Hunter"
                  : "Already Recognized"}
              </button>

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
