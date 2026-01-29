import HudPanel from "./HudPanel";

export default function StatsStrip() {
  const stats = [
    { label: "Tasks Today", value: "3" },
    { label: "Current Streak", value: "5 Days" },
    { label: "Focus Time", value: "1h 45m" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <HudPanel key={s.label}>
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-purple-300 mb-1">
              {s.label}
            </p>
            <p className="text-lg font-bold text-purple-100 hud-text">
              {s.value}
            </p>
          </div>
        </HudPanel>
      ))}
    </div>
  );
}