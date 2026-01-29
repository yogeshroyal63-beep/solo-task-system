/**
 * ===============================
 * SYSTEM OVERLAY — AUTHORITATIVE MESSAGE
 * ===============================
 * Always centered
 * Always visible
 * Always above everything
 */

export default function SystemOverlay({ text }) {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        pointer-events-none
      "
    >
      <div
        className="
          max-w-xl mx-4
          rounded-2xl
          bg-black/80
          border border-purple-500/30
          px-8 py-6
          text-center
          backdrop-blur-xl
          shadow-[0_0_60px_rgba(168,85,247,0.35)]
          animate-systemPop
        "
      >
        <p
          className="
            text-purple-200
            text-sm md:text-base
            tracking-[0.3em]
            uppercase
            leading-relaxed
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}