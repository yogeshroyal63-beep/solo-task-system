export default function HudPanel({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* outer glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-500/40 blur-sm opacity-70" />

      {/* frame */}
      <div className="relative rounded-2xl border border-purple-400/40 bg-gradient-to-br from-[#0e1330]/90 to-[#090b1f]/90 backdrop-blur-md">

        {/* inner glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(168,85,247,0.15)] pointer-events-none" />

        {/* corner accents */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-purple-400/70 rounded-tl-2xl" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-400/70 rounded-tr-2xl" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-400/70 rounded-bl-2xl" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-purple-400/70 rounded-br-2xl" />

        {/* content */}
        <div className="relative p-6">
          {children}
        </div>
      </div>
    </div>
  );
}