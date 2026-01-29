/**
 * ===============================
 * AURA FIELD — WORLD BACKGROUND
 * ===============================
 * This is the SYSTEM SPACE.
 * Everything exists inside this darkness.
 */

export default function AuraField({ intensity = "dormant" }) {
  const auraMap = {
    dormant: "opacity-30",
    pressure: "opacity-40",
    impact: "opacity-60",
    sovereign: "opacity-80",
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* ===== BASE DARK WORLD ===== */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#050510]
          via-[#0b0f2a]
          to-[#120a2a]
        "
      />

      {/* ===== AURA CORE ===== */}
      <div
        className={`
          absolute inset-0
          transition-opacity duration-700
          ${auraMap[intensity] || auraMap.dormant}
        `}
      >
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_65%)]
          "
        />
      </div>

      {/* ===== VIGNETTE (DEPTH) ===== */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85))]
        "
      />

      {/* ===== NOISE (SUBTLE) ===== */}
      <div
        className="
          absolute inset-0
          opacity-[0.05]
          bg-[url('/noise.png')]
          mix-blend-overlay
          pointer-events-none
        "
      />
    </div>
  );
}