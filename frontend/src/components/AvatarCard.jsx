/**
 * ===============================
 * AVATAR CARD — AWAKENING FORM
 * ===============================
 */

export default function AvatarCard({ avatar, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative cursor-pointer
        rounded-3xl overflow-hidden
        border
        transition-all duration-300
        ${
          selected
            ? "border-purple-500 shadow-[0_0_90px_rgba(168,85,247,0.6)] scale-[1.02]"
            : "border-purple-500/20 hover:border-purple-400/60"
        }
        bg-black/70
      `}
    >
      {/* ===== IMAGE ===== */}
      <div className="relative h-72 w-full">
        <img
          src={avatar.image}
          alt={avatar.name}
          className="w-full h-full object-cover opacity-90"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* ===== TEXT ===== */}
      <div className="relative p-6 space-y-2">
        <h3 className="text-lg font-semibold hud-text tracking-wide">
          {avatar.name}
        </h3>

        <p className="text-sm text-purple-300 leading-relaxed">
          {avatar.description}
        </p>
      </div>

      {/* ===== SELECTED INDICATOR ===== */}
      {selected && (
        <div className="absolute top-4 right-4 text-xs tracking-widest text-purple-300">
          SELECTED
        </div>
      )}
    </div>
  );
}
