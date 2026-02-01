/**
 * ===============================
 * CONSISTENCY GRAPH — PRESSURE AREA
 * ===============================
 * Heavy, intimidating, cinematic
 */

export default function ConsistencyGraph({ data = [] }) {
  // fallback demo data (7 days)
  const values = data.length
    ? data
    : [30, 45, 40, 70, 60, 85, 75];

  const max = Math.max(...values);

  // Build SVG path
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - (v / max) * 80; // keep bottom padding
    return `${x},${y}`;
  });

  const areaPath = `
    M 0,100
    L ${points.join(" L ")}
    L 100,100
    Z
  `;

  const linePath = `
    M ${points.join(" L ")}
  `;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      {/* Glow */}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(168,85,247,0.8)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0.05)" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* AREA */}
      <path
        d={areaPath}
        fill="url(#areaGrad)"
      />

      {/* LINE */}
      <path
        d={linePath}
        fill="none"
        stroke="#a855f7"
        strokeWidth="2.5"
        filter="url(#glow)"
      />
    </svg>
  );
}
