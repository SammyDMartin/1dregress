import { useState } from "react";
import MSD from "./components/MSD";
import BattleSim from "./components/BattleSim";

const mono = "'Courier New', 'Consolas', monospace";

const views = [
  { id: "msd", label: "MASTER SYSTEMS DISPLAY" },
  { id: "battle", label: "BATTLE RECONSTRUCTION" },
];

export default function App() {
  const [view, setView] = useState("msd");

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* View switcher */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          gap: 2,
          background: "rgba(0, 10, 15, 0.9)",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          borderRadius: 3,
          padding: 2,
        }}
      >
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              background:
                view === v.id ? "rgba(0,229,255,0.12)" : "transparent",
              border: "none",
              color:
                view === v.id ? "#00e5ff" : "rgba(0,229,255,0.35)",
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: 2,
              padding: "6px 14px",
              cursor: "pointer",
              borderRadius: 2,
              transition: "all 0.2s ease",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === "msd" ? <MSD /> : <BattleSim />}
    </div>
  );
}
