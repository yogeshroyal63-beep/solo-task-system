/**
 * ===============================
 * SYSTEM GRAPH — ANALYTICS
 * ===============================
 * Area + Bar hybrid graph
 * Matches reference image style
 */

export default function SystemGraph({ data }) {
  /**
   * data example:
   * [20, 40, 35, 60, 55, 80, 70]
   */

  const max = Math.max(...data);

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  });

  const areaPath = `
    M 0 100
    L ${points.join(" L ")}
    L 100 100
    Z
  `;

  return (
    <div className="relative w-full h-full">

      {/* SVG GRAPH */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* AREA */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          opacity="0.6"
        />

        {/* LINE */}
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#a855f7"
          strokeWidth="1.8"
        />

        {/* BARS */}
        {data.map((v, i) => {
          const barHeight = (v / max) * 100;
          const barWidth = 4;
          const x = (i / data.length) * 100 + 2;
          const y = 100 - barHeight;

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="rgba(168,85,247,0.35)"
            />
          );
        })}

        {/* GRADIENT */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* LABEL */}
      <div className="absolute bottom-3 right-4 text-[10px] tracking-[0.4em] text-purple-300 uppercase">
        System Growth
      </div>
    </div>
  );
}
