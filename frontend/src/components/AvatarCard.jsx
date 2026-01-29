/**
 * ===============================
 * AVATAR CARD — AWAKENED FORM
 * ===============================
 *
 * Responsibilities:
 * - Show character silhouette
 * - Respond to hover
 * - Lock selection visually
 * - Suppress non-selected forms
 */

export default function AvatarCard({ avatar, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden
        border transition-all duration-300 ease-out
        ${
          selected
            ? "border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.7)] scale-[1.02]"
            : "border-purple-500/30 hover:border-purple-400/60 hover:scale-[1.01]"
        }
      `}
    >
      {/* ===== CHARACTER VISUAL ===== */}
      <div className="relative h-56 bg-gradient-to-b from-[#0b0f2a] to-[#050817]">
        {/* Silhouette */}
        <div
          className={`
            absolute inset-0 bg-center bg-no-repeat bg-contain
            transition-all duration-300
            ${
              selected
                ? "opacity-100"
                : "opacity-70 group-hover:opacity-90"
            }
          `}
          style={{
            backgroundImage: "url('/placeholder-avatar.png')",
          }}
        />

        {/* Aura overlay */}
        <div
          className={`
            absolute inset-0 transition-opacity duration-300
            ${
              selected
                ? "bg-purple-500/10"
                : "bg-black/30"
            }
          `}
        />
      </div>

      {/* ===== INFO ===== */}
      <div className="p-4 text-center space-y-2 bg-black/60 backdrop-blur-md">
        <p className="text-sm tracking-widest uppercase text-purple-200">
          {avatar.name}
        </p>

        <p className="text-xs text-purple-400">
          {avatar.description}
        </p>
      </div>

      {/* ===== LOCK INDICATOR ===== */}
      {selected && (
        <div className="absolute top-3 right-3 text-purple-300 text-xs tracking-widest">
          SELECTED
        </div>
      )}
    </div>
  );
}