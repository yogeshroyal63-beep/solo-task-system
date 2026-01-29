export default function AuraInput({ label, type = "text", value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs tracking-[0.4em] uppercase text-purple-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-purple-500/30 rounded-lg px-4 py-2
          text-purple-100 outline-none
          focus:border-purple-400
          shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]"
      />
    </div>
  );
}
