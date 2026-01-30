/**
 * ===============================
 * CONSISTENCY GRAPH — SYSTEM ANALYTICS
 * ===============================
 * Large cinematic area graph (no bars)
 */

export default function ConsistencyGraph({ data = [] }) {
  /**
   * data = [
   *   { day: "Mon", value: 0.6 },
   *   { day: "Tue", value: 0.8 },
   *   ...
   * ]
   */

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - d.value * 100;
    return `${x},${y}`;
  });

  const areaPath = `
    M 0 100
    L ${points.join(" L ")}
    L 100 100
    Z
  `;

  const linePath = `M ${points.join(" L ")}`;

  return (
    <div className="relative w-full h-full">

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Glow */}
        <path
          d={areaPath}
          fill="url(#areaGlow)"
          opacity="0.45"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#a855f7"
          strokeWidth="1.8"
        />

        <defs>
          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Overlay text */}
      <div className="absolute bottom-3 right-4 text-xs tracking-widest text-purple-300">
        CONSISTENCY ANALYTICS
      </div>
    </div>
  );
}
