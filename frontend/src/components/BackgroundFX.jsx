export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0b1025] to-[#120a2a]" />

      {/* particle noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px] opacity-[0.15] animate-floatSlow" />

      {/* neon glow blobs */}
      <div className="absolute top-[-200px] left-1/4 w-[500px] h-[500px] bg-purple-600/30 blur-[160px] animate-pulseSlow" />
      <div className="absolute bottom-[-200px] right-1/4 w-[500px] h-[500px] bg-pink-600/20 blur-[160px] animate-pulseSlow delay-1000" />

      {/* horizon light */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
    </div>
  );
}
