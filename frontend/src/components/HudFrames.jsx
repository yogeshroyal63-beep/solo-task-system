/**
 * ===============================
 * HUD FRAME — SYSTEM PANEL
 * ===============================
 * Purely visual. No logic.
 */

export default function HudFrame({ children }) {
  return (
    <div className="relative">

      {/* OUTER FRAME */}
      <div className="
        relative
        rounded-3xl
        border border-purple-500/50
        bg-gradient-to-br from-black/85 to-[#07021a]/95
        backdrop-blur-xl
        shadow-[0_0_140px_rgba(168,85,247,0.45)]
        p-10
      ">

        {/* INNER FRAME LINE */}
        <div className="
          absolute inset-2
          rounded-2xl
          border border-purple-500/20
          pointer-events-none
        " />

        {/* CORNERS */}
        <FrameCorner pos="tl" />
        <FrameCorner pos="tr" />
        <FrameCorner pos="bl" />
        <FrameCorner pos="br" />

        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ===============================
 * FRAME CORNERS
 * =============================== */
function FrameCorner({ pos }) {
  const base = "absolute w-6 h-6 border-purple-400";
  const map = {
    tl: "top-0 left-0 border-t-2 border-l-2",
    tr: "top-0 right-0 border-t-2 border-r-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
  };

  return (
    <div className={`${base} ${map[pos]}`} />
  );
}
