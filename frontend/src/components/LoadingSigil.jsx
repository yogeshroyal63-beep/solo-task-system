export default function LoadingSigil({ progress }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Sigil Ring */}
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full border border-purple-500/40 animate-spinSlow" />
        <div className="absolute inset-4 rounded-full border border-purple-400/30 animate-spinReverse" />
        <div className="absolute inset-8 rounded-full border border-purple-300/20" />

        {/* Progress */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-purple-200 text-sm tracking-widest">
            {progress}%
          </span>
        </div>
      </div>

      {/* Status text */}
      <p className="text-xs tracking-[0.4em] uppercase text-purple-300">
        System Initializing
      </p>
    </div>
  );
}