/**
 * ===============================
 * TELEMETRY GRAPH — HUD STYLE
 * ===============================
 * Multi-layer graph:
 * - Area fill
 * - Bar histogram
 * - Curve overlay
 * - Glow
 */

export default function TelemetryGraph() {
  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(168,85,247,0.2)_1px,transparent_1px),linear-gradient(to_top,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <svg
        viewBox="0 0 100 40"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* AREA FILL */}
        <path
          d="M0 28 C10 18,20 32,30 22 S50 8,60 20 S80 36,100 18 L100 40 L0 40 Z"
          fill="url(#areaGlow)"
        />

        {/* BAR GRAPH */}
        {[5, 12, 18, 22, 16, 25, 30, 28, 34, 26, 30].map((h, i) => (
          <rect
            key={i}
            x={i * 9}
            y={40 - h}
            width="5"
            height={h}
            rx="1"
            fill="rgba(168,85,247,0.35)"
          />
        ))}

        {/* CURVE LINE */}
        <path
          d="M0 26 C10 14,20 30,30 20 S50 6,60 18 S80 34,100 16"
          fill="none"
          stroke="#d946ef"
          strokeWidth="1.8"
        />

        {/* DEFINITIONS */}
        <defs>
          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* LABEL */}
      <div className="absolute bottom-3 right-4 text-xs tracking-widest text-purple-300">
        SYSTEM TELEMETRY
      </div>
    </div>
  );
}
