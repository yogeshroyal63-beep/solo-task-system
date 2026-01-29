export default function AuraButton({ label, onClick, primary = false }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-lg text-xs tracking-[0.4em] uppercase
        ${
          primary
            ? "bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:shadow-[0_0_40px_rgba(168,85,247,1)]"
            : "border border-purple-500/40 text-purple-300 hover:text-purple-100"
        }
        transition-all duration-200`}
    >
      {label}
    </button>
  );
}