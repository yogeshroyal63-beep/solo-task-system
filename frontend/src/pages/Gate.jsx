import AuraButton from "../components/AuraButton";

/**
 * ===============================
 * GATE — ENTER THE HUNTER'S GUILD
 * ===============================
 * Must be perfectly centered.
 * No min-h-screen.
 * No margins.
 * No padding hacks.
 */

export default function Gate({ onEnter }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-6">
      <div
        className="
          w-full max-w-xl
          rounded-2xl
          bg-black/80
          border border-purple-500/30
          px-8 py-10
          text-center
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(168,85,247,0.35)]
        "
      >
        {/* ===== TITLE ===== */}
        <h1
          className="
            text-purple-300
            text-sm
            tracking-[0.5em]
            uppercase
            mb-6
          "
        >
          System Notice
        </h1>

        {/* ===== MESSAGE ===== */}
        <p className="text-purple-200 text-sm leading-relaxed mb-10">
          Once you enter the Hunter&apos;s Guild, there is no turning back.
          <br />
          <br />
          Do you still wish to proceed?
        </p>

        {/* ===== ACTIONS ===== */}
        <div className="flex items-center justify-center gap-6">
          <button
            className="
              text-purple-400
              text-xs
              tracking-widest
              uppercase
              hover:text-purple-200
              transition
            "
          >
            Leave
          </button>

          <AuraButton
            primary
            label="Enter the Guild"
            onClick={onEnter}
          />
        </div>
      </div>
    </div>
  );
}
