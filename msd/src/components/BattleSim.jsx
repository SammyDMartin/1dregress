import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { BATTLE, UNION_DESTROYER } from "../data/canonical";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  accent: "#00e5ff",
  accent2: "#ff6b35",
  warn: "#ffaa00",
  bg: "#010a0f",
  panelBg: "rgba(0, 16, 24, 0.88)",
  border: "rgba(0, 229, 255, 0.2)",
  textDim: "rgba(0, 229, 255, 0.4)",
  text: "#00e5ff",
  green: "#00ff88",
  red: "#ff3355",
  unionBlue: "#3388ff",
  arcoRed: "#ff4444",
};
const mono = "'Courier New', 'Consolas', monospace";

// ─── BATTLE SIMULATION STATE ──────────────────────────────────────────────────

const PHASES = BATTLE.timeline.map((ev, i) => ({
  ...ev,
  index: i,
}));

// Ship positions for tactical display — simplified 2D projection
function generateUnionFleet() {
  const ships = [];
  for (let bg = 0; bg < 10; bg++) {
    const angle = (bg / 10) * Math.PI * 2;
    const r = 180 + Math.random() * 40;
    const bx = Math.cos(angle) * r;
    const by = Math.sin(angle) * r;
    // Destroyer
    ships.push({
      id: `dd-${bg}`,
      type: "destroyer",
      label: bg === 0 ? "ISIDORE" : `DD-${bg + 1}`,
      x: bx,
      y: by,
      alive: true,
      highlight: bg === 0,
    });
    // 9 corvettes per DD
    for (let c = 0; c < 9; c++) {
      const ca = ((c / 9) * Math.PI * 2) + angle;
      const cr = 15 + Math.random() * 10;
      ships.push({
        id: `cv-${bg}-${c}`,
        type: "corvette",
        label: null,
        x: bx + Math.cos(ca) * cr,
        y: by + Math.sin(ca) * cr,
        alive: true,
        highlight: false,
      });
    }
  }
  return ships;
}

function generateArcoFleet() {
  return [
    { id: "inc-1", type: "incisor", label: "INCISOR α", x: 0, y: -20, alive: true },
    { id: "inc-2", type: "incisor", label: "INCISOR β", x: -30, y: 10, alive: true },
    { id: "inc-3", type: "incisor", label: "INCISOR γ", x: 30, y: 10, alive: true },
    { id: "ann-1", type: "annihilator", label: "ANNIHILATOR", x: 0, y: 30, alive: true },
  ];
}

// Determine ship states at each phase
function applyPhase(phase, unionShips, arcoShips) {
  const union = unionShips.map((s) => ({ ...s }));
  const arco = arcoShips.map((s) => ({ ...s }));

  if (phase >= 6) {
    // DUSTER STRIKE — kill ~20 union ships
    let killed = 0;
    for (const s of union) {
      if (s.alive && s.type === "corvette" && Math.random() < 0.22 && killed < 22) {
        s.alive = false;
        killed++;
      }
    }
  }
  if (phase >= 8) {
    // CLOSE RANGE — more losses
    let killed = 0;
    for (const s of union) {
      if (s.alive && Math.random() < 0.15 && killed < 10) {
        s.alive = false;
        killed++;
      }
    }
  }
  if (phase >= 9) {
    // EXODRONE SWARM — heavy losses
    let killed = 0;
    for (const s of union) {
      if (s.alive && Math.random() < 0.3 && killed < 20) {
        s.alive = false;
        killed++;
      }
    }
  }
  if (phase >= 10) {
    // MASSACRE — devastation
    let killed = 0;
    for (const s of union) {
      if (s.alive && s.id !== "dd-0" && Math.random() < 0.5 && killed < 25) {
        s.alive = false;
        killed++;
      }
    }
  }
  if (phase >= 11) {
    // ISIDORE'S STAND — Isidore kills Incisor γ
    const inc3 = arco.find((s) => s.id === "inc-3");
    if (inc3) inc3.alive = false;
  }
  if (phase >= 12) {
    // WITHDRAWAL — remaining union ships scatter
    for (const s of union) {
      if (s.alive && s.id !== "dd-0") {
        s.x += (Math.random() - 0.5) * 80;
        s.y += (Math.random() - 0.5) * 80;
      }
    }
  }

  return { union, arco };
}

// ─── EFFECTS LAYER ────────────────────────────────────────────────────────────

function drawEffects(ctx, phase, w, h, t) {
  const cx = w / 2;
  const cy = h / 2;

  // Interstice — central wormhole
  ctx.save();
  ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 + Math.sin(t * 2) * 0.1})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 18 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = `rgba(0, 229, 255, 0.15)`;
  ctx.beginPath();
  ctx.arc(cx, cy, 24 + Math.cos(t * 2) * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Label
  ctx.fillStyle = C.textDim;
  ctx.font = `9px ${mono}`;
  ctx.textAlign = "center";
  ctx.fillText("INTERSTICE", cx, cy + 35);

  // Torpedo streaks (phases 5-7)
  if (phase >= 4 && phase <= 7) {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.5;
      const r1 = 40 + (t * 20 + i * 8) % 120;
      const r2 = r1 + 15;
      ctx.strokeStyle = `rgba(255, 170, 0, ${0.3 - (r1 / 400)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
    }
  }

  // X-ray beams (phase 6+)
  if (phase >= 5 && phase <= 8) {
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + t;
      const len = 120 + Math.sin(t * 5 + i) * 30;
      ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 + Math.sin(t * 8 + i * 2) * 0.1})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 20, cy + Math.sin(angle) * 20);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.stroke();
    }
  }

  // Duster streams (phase 7+)
  if (phase >= 6 && phase <= 11) {
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2 + Math.sin(t * 0.3) * 0.2;
      ctx.strokeStyle = `rgba(255, 68, 68, 0.08)`;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 25, cy + Math.sin(angle) * 25);
      ctx.lineTo(cx + Math.cos(angle) * 200, cy + Math.sin(angle) * 200);
      ctx.stroke();
    }
  }

  // Exodrone swarm (phase 9+)
  if (phase >= 9 && phase <= 11) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 160;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.fillStyle = `rgba(255, 107, 53, ${0.3 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }

  // Explosions (phase 10+)
  if (phase >= 10 && phase <= 12) {
    for (let i = 0; i < 6; i++) {
      const ex = cx + (Math.sin(t * 0.7 + i * 1.1) * 140);
      const ey = cy + (Math.cos(t * 0.9 + i * 1.3) * 140);
      const er = 3 + Math.sin(t * 6 + i) * 2;
      const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, er * 3);
      grad.addColorStop(0, `rgba(255, 200, 100, ${0.4 + Math.sin(t * 8 + i) * 0.2})`);
      grad.addColorStop(1, "rgba(255, 100, 50, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ex, ey, er * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// ─── TACTICAL CANVAS ──────────────────────────────────────────────────────────

function TacticalDisplay({ phase, unionFleet, arcoFleet }) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  // Deterministic state for this phase
  const { union, arco } = useMemo(
    () => applyPhase(phase, unionFleet, arcoFleet),
    [phase, unionFleet, arcoFleet]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.016;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const scale = 0.9;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = "rgba(0, 229, 255, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let i = 0; i < h; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }

      // Range rings
      [80, 160, 240].forEach((r) => {
        ctx.strokeStyle = "rgba(0, 229, 255, 0.06)";
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Effects layer
      drawEffects(ctx, phase, w, h, t);

      // Draw Union ships
      union.forEach((s) => {
        if (!s.alive) return;
        const sx = cx + s.x * scale;
        const sy = cy + s.y * scale;

        if (s.type === "destroyer") {
          // Square icon
          const sz = s.highlight ? 5 : 4;
          ctx.fillStyle = s.highlight ? "#66aaff" : C.unionBlue;
          ctx.globalAlpha = s.highlight ? 1 : 0.7;
          ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);
          ctx.globalAlpha = 1;
          if (s.label && s.highlight) {
            ctx.fillStyle = "#66aaff";
            ctx.font = `bold 8px ${mono}`;
            ctx.textAlign = "center";
            ctx.fillText(s.label, sx, sy - 8);
          }
        } else {
          // Dot for corvette
          ctx.fillStyle = C.unionBlue;
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Draw Arco ships
      arco.forEach((s) => {
        if (!s.alive) return;
        const sx = cx + s.x * scale;
        const sy = cy + s.y * scale;
        const sz = s.type === "annihilator" ? 8 : 6;

        // Diamond icon
        ctx.fillStyle = s.type === "annihilator" ? C.arcoRed : "#cc3333";
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        ctx.restore();

        // Glow
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 2);
        grad.addColorStop(0, `rgba(255, 68, 68, 0.2)`);
        grad.addColorStop(1, "rgba(255, 68, 68, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 2, 0, Math.PI * 2);
        ctx.fill();

        if (s.label) {
          ctx.fillStyle = C.arcoRed;
          ctx.font = `bold 8px ${mono}`;
          ctx.textAlign = "center";
          ctx.fillText(s.label, sx, sy - sz - 4);
        }
      });

      // Dead ship markers (X)
      [...union, ...arco].forEach((s) => {
        if (s.alive) return;
        const sx = cx + s.x * scale;
        const sy = cy + s.y * scale;
        if (sx < 0 || sx > w || sy < 0 || sy > h) return;
        ctx.strokeStyle = "rgba(255, 50, 80, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx - 3, sy - 3);
        ctx.lineTo(sx + 3, sy + 3);
        ctx.moveTo(sx + 3, sy - 3);
        ctx.lineTo(sx - 3, sy + 3);
        ctx.stroke();
      });
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, union, arco]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    />
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────

function Timeline({ phase, setPhase, playing, setPlaying }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
        maxHeight: "100%",
        scrollbarWidth: "thin",
        scrollbarColor: `${C.border} transparent`,
      }}
    >
      {PHASES.map((ev, i) => (
        <button
          key={i}
          onClick={() => {
            setPhase(i);
            setPlaying(false);
          }}
          style={{
            background: i === phase ? "rgba(0,229,255,0.1)" : "transparent",
            border: `1px solid ${i === phase ? C.accent : "transparent"}`,
            borderLeft: `3px solid ${i === phase ? C.accent : i < phase ? C.green + "60" : C.border}`,
            color: i === phase ? C.accent : i < phase ? C.textDim : "rgba(0,229,255,0.25)",
            fontFamily: mono,
            fontSize: 9,
            padding: "6px 8px",
            cursor: "pointer",
            textAlign: "left",
            borderRadius: 1,
            transition: "all 0.15s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ letterSpacing: 2, opacity: 0.6 }}>{ev.t}</span>
            <span style={{ letterSpacing: 2 }}>{ev.label}</span>
          </div>
          <div style={{ fontSize: 8, opacity: 0.7, lineHeight: 1.3 }}>{ev.event}</div>
        </button>
      ))}
    </div>
  );
}

// ─── ORDER OF BATTLE PANEL ────────────────────────────────────────────────────

function OOBPanel({ phase }) {
  const { union: unionForces, arco: arcoForces } = useMemo(() => {
    // Calculate losses at each phase
    let unionDD = 10,
      unionCV = 90,
      arcoInc = 3,
      arcoAnn = 1;

    if (phase >= 6) { unionCV -= 15; unionDD -= 1; }
    if (phase >= 8) { unionCV -= 8; unionDD -= 1; }
    if (phase >= 9) { unionCV -= 15; unionDD -= 2; }
    if (phase >= 10) { unionCV -= 25; unionDD -= 3; }
    if (phase >= 11) { arcoInc -= 1; }
    if (phase >= 12) { unionCV -= 15; unionDD -= 1; }

    unionDD = Math.max(unionDD, phase >= 11 ? 1 : 2);
    unionCV = Math.max(unionCV, 5);

    return {
      union: { dd: unionDD, cv: unionCV },
      arco: { inc: arcoInc, ann: arcoAnn },
    };
  }, [phase]);

  const unionTotal = unionForces.dd + unionForces.cv;
  const arcoTotal = arcoForces.inc + arcoForces.ann;

  return (
    <div style={{ fontFamily: mono, fontSize: 9 }}>
      <div
        style={{
          letterSpacing: 3,
          color: C.accent,
          fontSize: 10,
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: 4,
          marginBottom: 6,
        }}
      >
        ORDER OF BATTLE
      </div>

      {/* Union */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ color: C.unionBlue, letterSpacing: 2, marginBottom: 4 }}>
          ■ UNION FIRST FLEET
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: C.textDim, padding: "2px 0" }}>
          <span>Destroyers</span>
          <span style={{ color: unionForces.dd < 10 ? C.red : C.green }}>
            {unionForces.dd} / 10
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: C.textDim, padding: "2px 0" }}>
          <span>Corvettes</span>
          <span style={{ color: unionForces.cv < 90 ? C.red : C.green }}>
            {unionForces.cv} / 90
          </span>
        </div>
        <div
          style={{
            height: 3,
            background: "rgba(0,229,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(unionTotal / 100) * 100}%`,
              background: unionTotal < 50 ? C.red : C.unionBlue,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Arco */}
      <div>
        <div style={{ color: C.arcoRed, letterSpacing: 2, marginBottom: 4 }}>
          ◆ ARCO SUB-CONSTELLATION
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: C.textDim, padding: "2px 0" }}>
          <span>Incisor-class</span>
          <span style={{ color: arcoForces.inc < 3 ? C.warn : C.green }}>
            {arcoForces.inc} / 3
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: C.textDim, padding: "2px 0" }}>
          <span>Annihilator-class</span>
          <span style={{ color: C.green }}>{arcoForces.ann} / 1</span>
        </div>
        <div
          style={{
            height: 3,
            background: "rgba(0,229,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(arcoTotal / 4) * 100}%`,
              background: arcoTotal < 4 ? C.warn : C.arcoRed,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────

function DetailPanel({ phase }) {
  const ev = PHASES[phase];
  if (!ev) return null;
  return (
    <div style={{ fontFamily: mono }}>
      <div
        style={{
          letterSpacing: 3,
          color: C.accent,
          fontSize: 10,
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: 4,
          marginBottom: 6,
        }}
      >
        SITUATION REPORT
      </div>
      <div style={{ fontSize: 9, color: C.textDim, letterSpacing: 2, marginBottom: 4 }}>
        {ev.t} — {ev.label}
      </div>
      <div style={{ fontSize: 11, color: C.accent, marginBottom: 6, lineHeight: 1.4 }}>
        {ev.event}
      </div>
      <div style={{ fontSize: 10, color: C.textDim, lineHeight: 1.5 }}>{ev.detail}</div>
    </div>
  );
}

// ─── MAIN BATTLE SIM ──────────────────────────────────────────────────────────

export default function BattleSim() {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Generate fleets once
  const unionFleet = useMemo(() => generateUnionFleet(), []);
  const arcoFleet = useMemo(() => generateArcoFleet(), []);

  // Auto-advance
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setPhase((p) => {
          if (p >= PHASES.length - 1) {
            setPlaying(false);
            return p;
          }
          return p + 1;
        });
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: mono,
        display: "grid",
        gridTemplateColumns: "220px 1fr 280px",
        gridTemplateRows: "48px 1fr 40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          gridColumn: "1 / -1",
          background: "rgba(0,16,24,0.92)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: C.accent2,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
        <div>
          <div style={{ fontSize: 14, letterSpacing: 4, color: C.accent, fontWeight: 700 }}>
            BATTLE OF THE INTERSTICE
          </div>
          <div style={{ fontSize: 8, letterSpacing: 3, color: C.textDim, marginTop: -1 }}>
            TACTICAL RECONSTRUCTION — 41-51 MINUTES
          </div>
        </div>
        <div style={{ flex: 1 }} />

        {/* Playback controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => {
              setPhase(0);
              setPlaying(false);
            }}
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              color: C.textDim,
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: 2,
              padding: "4px 10px",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            RESET
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            style={{
              background: playing ? "rgba(255,107,53,0.15)" : "rgba(0,229,255,0.1)",
              border: `1px solid ${playing ? C.accent2 : C.accent}`,
              color: playing ? C.accent2 : C.accent,
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: 2,
              padding: "4px 14px",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            {playing ? "PAUSE" : "PLAY"}
          </button>
          <span style={{ fontSize: 9, color: C.textDim, letterSpacing: 2 }}>
            PHASE {phase + 1}/{PHASES.length}
          </span>
        </div>
      </div>

      {/* Left: Timeline */}
      <div
        style={{
          background: C.panelBg,
          borderRight: `1px solid ${C.border}`,
          padding: 8,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(0,229,255,0.1) transparent`,
        }}
      >
        <Timeline phase={phase} setPhase={setPhase} playing={playing} setPlaying={setPlaying} />
      </div>

      {/* Center: Tactical display */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <TacticalDisplay phase={phase} unionFleet={unionFleet} arcoFleet={arcoFleet} />
        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.008) 2px, rgba(0,229,255,0.008) 4px)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Right: Info panels */}
      <div
        style={{
          background: C.panelBg,
          borderLeft: `1px solid ${C.border}`,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(0,229,255,0.1) transparent`,
        }}
      >
        <DetailPanel phase={phase} />
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
          <OOBPanel phase={phase} />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: "1 / -1",
          background: "rgba(0,16,24,0.92)",
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          fontSize: 10,
          letterSpacing: 2,
        }}
      >
        <span style={{ color: C.textDim }}>
          UNION HUMAN DEFENCE FLEET — TACTICAL RECONSTRUCTION
        </span>
        <span style={{ color: C.accent }}>{PHASES[phase]?.t || ""}</span>
        <span style={{ color: C.textDim }}>
          {BATTLE.outcome}
        </span>
      </div>
    </div>
  );
}
