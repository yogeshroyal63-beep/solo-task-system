import { useState } from "react";

import BackgroundFX from "../components/BackgroundFX";
import AvatarCard from "../components/AvatarCard";
import AuraButton from "../components/AuraButton";
import SystemDialog from "../components/SystemDialog";

/**
 * ===============================
 * AWAKENING — RITUAL OF POWER
 * ===============================
 *
 * This is a one-time decision.
 * The System must warn the user.
 */

export default function Awakening({ onConfirm }) {
  /* ===============================
   * AVAILABLE FORMS
   * =============================== */

  const awakenedForms = {
    male: [
      {
        id: "shadow_sovereign",
        name: "Shadow Sovereign",
        description:
          "One who commands shadows and bends death itself.",
      },
      {
        id: "blade_executor",
        name: "Blade Executor",
        description:
          "A hunter whose blade never hesitates.",
      },
    ],
    female: [
      {
        id: "arcane_empress",
        name: "Arcane Empress",
        description:
          "A vessel of overwhelming magical authority.",
      },
      {
        id: "silent_reaper",
        name: "Silent Reaper",
        description:
          "A presence felt only after death arrives.",
      },
    ],
  };

  /* ===============================
   * STATE
   * =============================== */

  const [selectedForm, setSelectedForm] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ===============================
   * HANDLERS
   * =============================== */

  const selectForm = (form) => {
    setSelectedForm(form);
  };

  /* ===============================
   * RENDER
   * =============================== */

  return (
    <>
      <BackgroundFX />

      <div
        className="min-h-screen flex items-center justify-center text-white"
        data-system-phase="awakening"
      >
        <div className="max-w-6xl w-full mx-6 space-y-12">

          {/* ===== TITLE ===== */}
          <div className="text-center space-y-4">
            <h1 className="text-xl tracking-[0.6em] uppercase text-purple-300 hud-text">
              Awakening
            </h1>
            <p className="text-purple-200 max-w-2xl mx-auto">
              The System will grant you a form.
              This choice will define your existence as a Hunter.
            </p>
          </div>

          {/* ===== MALE FORMS ===== */}
          <section className="space-y-4">
            <h2 className="text-sm tracking-[0.4em] uppercase text-purple-400">
              Male Forms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awakenedForms.male.map((form) => (
                <AvatarCard
                  key={form.id}
                  avatar={form}
                  selected={selectedForm?.id === form.id}
                  onSelect={() => selectForm(form)}
                />
              ))}
            </div>
          </section>

          {/* ===== FEMALE FORMS ===== */}
          <section className="space-y-4">
            <h2 className="text-sm tracking-[0.4em] uppercase text-purple-400">
              Female Forms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awakenedForms.female.map((form) => (
                <AvatarCard
                  key={form.id}
                  avatar={form}
                  selected={selectedForm?.id === form.id}
                  onSelect={() => selectForm(form)}
                />
              ))}
            </div>
          </section>

          {/* ===== CONFIRM BUTTON ===== */}
          <div className="flex items-center justify-end pt-6">
            <AuraButton
              primary
              disabled={!selectedForm}
              label={
                selectedForm
                  ? "Confirm Awakening"
                  : "Select a Form"
              }
              onClick={() => setShowConfirm(true)}
            />
          </div>
        </div>
      </div>

      {/* ===== SYSTEM CONFIRMATION WARNING ===== */}
      {showConfirm && (
        <SystemDialog
          title="SYSTEM WARNING"
          message={`Once awakened, your form cannot be changed.

This decision is irreversible.

Do you wish to proceed?`}
          actions={[
            {
              label: "Cancel",
              onClick: () => setShowConfirm(false),
              primary: false,
            },
            {
              label: "Proceed with Awakening",
              onClick: () => {
                setShowConfirm(false);
                onConfirm();
              },
              primary: true,
            },
          ]}
        />
      )}
    </>
  );
}
