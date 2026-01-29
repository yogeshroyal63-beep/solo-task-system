export default function SmokeLayer({ intensity = "low" }) {
  const opacity =
    intensity === "high"
      ? "opacity-30"
      : intensity === "medium"
      ? "opacity-20"
      : "opacity-10";

  return (
    <div
      className={`
        pointer-events-none
        fixed inset-0 z-10
        ${opacity}
        mix-blend-screen
      `}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat animate-smoke" />
    </div>
  );
}
