export default function Navbar({ activeTab, onChange }) {
  const items = [
    { key: "quests", label: "Quest" },
    { key: "rank", label: "Rank" },
    { key: "home", label: "Home" },
    { key: "myquests", label: "My Quest" },
    { key: "achievements", label: "Achievements" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-purple-500/20">
      <div className="flex justify-around py-3 text-xs">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`transition-all ${
              activeTab === item.key
                ? "text-purple-100 font-semibold"
                : "text-purple-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
