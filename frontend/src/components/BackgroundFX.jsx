export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0b1025] to-[#120a2a]" />

      {/* Perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(800px) rotateX(65deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Data corridor glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-3xl opacity-60" />

      {/* Light streaks */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-pulseSlow" />
      <div className="absolute top-0 left-[48%] w-[1px] h-full bg-gradient-to-b from-transparent via-pink-400/30 to-transparent animate-pulseSlow" />

      {/* Ambient glow blobs */}
      <div className="absolute top-[-200px] left-1/4 w-[500px] h-[500px] bg-purple-600/30 blur-[160px] animate-pulseSlow" />
      <div className="absolute bottom-[-200px] right-1/4 w-[500px] h-[500px] bg-pink-600/20 blur-[160px] animate-pulseSlow" />

      {/* Horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
    </div>
  );
}