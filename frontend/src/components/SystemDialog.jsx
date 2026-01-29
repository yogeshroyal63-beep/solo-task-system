export default function SystemDialog({ title, message, actions }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-xl w-full mx-6">
        {/* Frame */}
        <div className="relative rounded-2xl border border-purple-500/40 bg-gradient-to-br from-[#0b0f2a]/95 to-[#060816]/95 backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.25)] p-10">

          {/* Title */}
          <h2 className="text-sm tracking-[0.6em] uppercase text-purple-300 mb-6">
            {title}
          </h2>

          {/* Message */}
          <p className="text-lg leading-relaxed text-purple-100 mb-10">
            {message}
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-6">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`px-6 py-2 text-xs tracking-[0.4em] uppercase rounded-lg
                  ${action.primary
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:shadow-[0_0_30px_rgba(168,85,247,1)]"
                    : "text-purple-300 hover:text-purple-100"}
                  transition-all duration-200
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
