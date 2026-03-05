import { useState, useEffect, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import ShipModel from "./ShipModel";
import { ANNIHILATOR, MSD_SECTIONS } from "../data/canonical";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  accent: "#00e5ff",
  accent2: "#ff6b35",
  warn: "#ffaa00",
  dim: "#0a3a4a",
  bg: "#010a0f",
  panelBg: "rgba(0, 16, 24, 0.88)",
  border: "rgba(0, 229, 255, 0.2)",
  textDim: "rgba(0, 229, 255, 0.4)",
  textMid: "rgba(0, 229, 255, 0.6)",
  text: "#00e5ff",
  green: "#00ff88",
};

const mono = "'Courier New', 'Consolas', monospace";

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function ScanLines() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.012) 2px, rgba(0,229,255,0.012) 4px)",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

function StatusDot({ color = C.green, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 8px",
        border: `1px solid ${color}44`,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      <span style={{ fontSize: 8, letterSpacing: 2, color: C.textMid, fontFamily: mono }}>
        {label}
      </span>
    </div>
  );
}

function PanelHeader({ title, status = "NOMINAL" }) {
  const color =
    status === "NOMINAL" ? C.accent : status === "ARMED" ? C.accent2 : C.warn;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        borderBottom: `1px solid ${C.border}`,
        paddingBottom: 6,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: 3,
          color: C.accent,
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: mono,
          fontSize: 9,
          letterSpacing: 2,
          color,
          padding: "2px 6px",
          border: `1px solid ${color}`,
          borderRadius: 2,
        }}
      >
        {status}
      </span>
    </div>
  );
}

function Row({ label, value, sub, accent = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "3px 0",
        borderBottom: "1px solid rgba(0,229,255,0.05)",
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 10,
          color: C.textDim,
          letterSpacing: 1,
          flex: "0 0 auto",
          maxWidth: "42%",
        }}
      >
        {label}
      </span>
      <div style={{ textAlign: "right", flex: 1, marginLeft: 8 }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: accent ? C.accent2 : C.accent,
            letterSpacing: 0.5,
          }}
        >
          {value}
        </span>
        {sub && (
          <div
            style={{
              fontFamily: mono,
              fontSize: 8,
              color: "rgba(0,229,255,0.3)",
              marginTop: 1,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function PowerBar({ label, value, max, unit = "GW", color = C.accent }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: mono,
          fontSize: 9,
          color: C.textDim,
          marginBottom: 2,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>
          {value.toLocaleString()} / {max.toLocaleString()} {unit}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(0,229,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${color}40`,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── SECTION PANELS ───────────────────────────────────────────────────────────

function OverviewPanel() {
  const m = ANNIHILATOR.meta;
  const h = ANNIHILATOR.hull;
  return (
    <div>
      <PanelHeader title="VESSEL IDENTIFICATION" />
      <Row label="CLASS" value={m.name} />
      <Row label="TYPE" value={m.designation} />
      <Row label="BUILDER" value={m.builder} />
      <Row label="ORIGIN" value={m.origin} />
      <Row label="OPERATORS" value={m.operators.slice(0, 2).join(", ")} />
      <Row label="PREDECESSOR" value={m.predecessor} />
      <div style={{ height: 8 }} />
      <PanelHeader title="HULL CHARACTERISTICS" />
      <Row label="LENGTH" value={`${h.length_m} m`} accent />
      <Row
        label="DISPLACEMENT"
        value={`${h.displacement_dry_t.toLocaleString()}t / ${h.displacement_wet_t.toLocaleString()}t`}
        sub="dry / wet"
      />
      <Row label="COMPLEMENT" value={`${h.complement_min} crew`} sub={`Max capacity ${h.complement_max}`} />
      <Row label="PROFILE" value={h.profile} />
    </div>
  );
}

function PowerPanel() {
  const p = ANNIHILATOR.power;
  const s = p.storage;
  return (
    <div>
      <PanelHeader title="POWER ALLOCATION" />
      <PowerBar label="MHD COLUMN" value={1000} max={1000} />
      <PowerBar label="REACTOR α" value={500} max={500} />
      <PowerBar label="REACTOR β" value={500} max={500} />
      <PowerBar
        label="ECELL RESERVE"
        value={4}
        max={4}
        unit="TJ"
        color={C.accent2}
      />
      <div style={{ height: 8 }} />
      <PanelHeader title="POWER SOURCES" />
      {p.sources.map((src, i) => (
        <Row
          key={i}
          label={src.type.toUpperCase()}
          value={`${src.count}× ${src.output_gw} GW`}
          sub={src.name}
        />
      ))}
      <Row
        label="STORED ENERGY"
        value={`${s.total_energy_tj} TJ`}
        sub={`${s.count.toLocaleString()}× ${s.unit_mass_kg}kg ECells`}
      />
    </div>
  );
}

function PropulsionPanel() {
  const pr = ANNIHILATOR.propulsion;
  const c = pr.performance.cruise;
  const pk = pr.performance.peak;
  return (
    <div>
      <PanelHeader title="PROPULSION" status="STANDBY" />
      <Row label="PRIMARY" value="ABC Drive" sub={pr.primary.name} />
      <Row label="UPGRADE" value="MIV Drive" sub={pr.upgrade.note} />
      <Row
        label="MANOEUVRE"
        value={`${pr.manoeuvre.thrusters.count}× Plasma`}
        sub={`${pr.manoeuvre.rcs.count}× RCS (${pr.manoeuvre.rcs.clusters})`}
      />
      <div style={{ height: 8 }} />
      <PanelHeader title="CRUISE PERFORMANCE" />
      <Row label="ACCEL" value={`${c.acceleration_ms2} m/s²`} />
      <Row label="POWER" value={`${c.power_gw.toLocaleString()} GW`} />
      <Row label="Ve" value={`${c.exhaust_velocity_kps.toLocaleString()} kps`} />
      <Row label="Δv" value={`${c.delta_v_kps.toLocaleString()} kps`} accent />
      <div style={{ height: 8 }} />
      <PanelHeader title="PEAK PERFORMANCE" />
      <Row label="ACCEL" value={`${pk.acceleration_ms2} m/s²`} accent />
      <Row label="POWER" value={`${pk.power_gw.toLocaleString()} GW`} />
      <Row label="Ve" value={`${pk.exhaust_velocity_kps} kps`} />
      <Row label="Δv" value={`${pk.delta_v_kps} kps`} accent />
    </div>
  );
}

function ThermalPanel() {
  const th = ANNIHILATOR.thermal;
  return (
    <div>
      <PanelHeader title="THERMAL CONTROL" />
      <Row label="DISPERSION" value={th.dispersion} />
      <Row
        label="RECOVERY"
        value={th.recovery.name}
        sub={`${th.recovery.mass_kg.toLocaleString()} kg`}
      />
      <Row
        label="RADIATORS"
        value={`${th.radiators.count}× ${th.radiators.area_km2} km² graphene`}
        sub="Extensible strake configuration"
      />
      <div style={{ height: 8 }} />
      <PanelHeader title="THERMAL STATUS" />
      <PowerBar label="HULL THERMAL LOAD" value={12} max={100} unit="%" />
      <PowerBar
        label="RADIATOR CAPACITY"
        value={88}
        max={100}
        unit="%"
        color={C.green}
      />
      <PowerBar
        label="RESERVOIR"
        value={95}
        max={100}
        unit="%"
        color={C.accent2}
      />
    </div>
  );
}

function ArmourPanel() {
  const a = ANNIHILATOR.armour;
  return (
    <div>
      <PanelHeader title="DEFENSIVE SYSTEMS" />
      <Row
        label="FORE SHIELD"
        value={`${a.fore.thickness_mm}mm`}
        sub={a.fore.name}
        accent
      />
      <Row
        label="FLANK ARMOUR"
        value={`${a.flanks.thickness_mm}mm`}
        sub={a.flanks.name}
      />
      <div style={{ height: 8 }} />
      <PanelHeader title="ARMOUR INTEGRITY" />
      <PowerBar label="FORE WHIPPLE" value={100} max={100} unit="%" color={C.green} />
      <PowerBar label="PORT FLANK" value={100} max={100} unit="%" color={C.green} />
      <PowerBar label="STBD FLANK" value={100} max={100} unit="%" color={C.green} />
      <PowerBar label="DORSAL" value={100} max={100} unit="%" color={C.green} />
      <PowerBar label="VENTRAL" value={100} max={100} unit="%" color={C.green} />
      <PowerBar label="AFT" value={100} max={100} unit="%" color={C.accent} />
    </div>
  );
}

function SensorsPanel() {
  const s = ANNIHILATOR.sensors;
  const ew = ANNIHILATOR.ew;
  return (
    <div>
      <PanelHeader title="PASSIVE SENSORS" />
      {s.passive.map((p, i) => (
        <Row key={i} label={p.type.toUpperCase()} value={p.name} />
      ))}
      <div style={{ height: 8 }} />
      <PanelHeader title="ACTIVE SENSORS" />
      {s.active.map((a, i) => (
        <Row key={i} label={a.type.toUpperCase()} value={a.name} sub={a.range} />
      ))}
      <div style={{ height: 8 }} />
      <PanelHeader title="REFIT SENSORS" />
      {s.refit.map((r, i) => (
        <Row key={i} label={r.type.toUpperCase()} value={r.name} />
      ))}
      <div style={{ height: 8 }} />
      <PanelHeader title="ELECTRONIC WARFARE" />
      <Row
        label="BURNPULSE"
        value={`${ew.transmitters.count}× ${ew.transmitters.power_mw} MW`}
        sub={ew.transmitters.name}
      />
      <Row label="NOTE" value={ew.note} />
    </div>
  );
}

function WeaponsPanel() {
  const w = ANNIHILATOR.weapons;
  return (
    <div>
      <PanelHeader title="ARMAMENT" status="ARMED" />

      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 3, color: C.accent2, margin: "8px 0 4px" }}>
        ENERGY WEAPONS
      </div>
      {w.energy.map((e, i) => (
        <Row
          key={i}
          label={e.type.toUpperCase()}
          value={`${e.count}× ${e.output_gw ? e.output_gw + " GW" : e.output_tj + " TJ/shot"}`}
          sub={e.name}
          accent
        />
      ))}

      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 3, color: C.accent2, margin: "10px 0 4px" }}>
        GUIDED WEAPONS
      </div>
      <Row
        label="MICROMISSILES"
        value={`${w.guided.micromissile_rails.count}× 30mm rails`}
        sub="EBolt frag / 0.5 Kt F-AM"
        accent
      />
      <Row
        label="HEAVY RAILS"
        value={`${w.guided.heavy_rails.count}× 250mm w/ reloaders`}
        sub="Exodrone launch"
        accent
      />
      <Row
        label="EXODRONES"
        value={w.guided.exodrone.model}
        sub={`${w.guided.exodrone.slots} — ${w.guided.exodrone.payloads.length} payload types`}
      />
      <Row
        label="TORPEDOES"
        value={w.guided.torpedo.model}
        sub={w.guided.torpedo.warheads.map((h) => `${h.name}: ${h.yield}`).join(" | ")}
      />

      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 3, color: C.accent2, margin: "10px 0 4px" }}>
        KINETIC WEAPONS
      </div>
      {w.kinetic.map((k, i) => (
        <Row
          key={i}
          label={k.mount.toUpperCase()}
          value={`${k.count}× ${k.name.split(" ").slice(1, 3).join(" ")}`}
          sub={k.role}
          accent
        />
      ))}
    </div>
  );
}

// ─── STATUS BAR ───────────────────────────────────────────────────────────────

function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const yr = now.getFullYear() + 750;
      const pad = (n) => String(n).padStart(2, "0");
      setTime(
        `${yr}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(
          now.getHours()
        )}:${pad(now.getMinutes())}:${pad(now.getSeconds())} UST`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 28,
        background: "rgba(0,16,24,0.92)",
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 10,
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: 2,
      }}
    >
      <span style={{ color: C.textDim }}>
        ARCO INTERSTELLAR AGENCY — ANNIHILATOR-CLASS MSD v4.7.2
      </span>
      <span style={{ color: C.accent }}>{time}</span>
      <span style={{ color: C.textDim }}>
        SECURE CHANNEL — CLEARANCE: DELTA
      </span>
    </div>
  );
}

// ─── QUICK READOUT ────────────────────────────────────────────────────────────

function QuickReadout() {
  const stats = [
    ["MASS", "4,000 t"],
    ["LENGTH", "200 m"],
    ["POWER", "1,000 GW"],
    ["STORED", "4 TJ"],
    ["ACCEL", "200 m/s²"],
    ["Δv", "6,931 kps"],
  ];
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 12,
        background: C.panelBg,
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        padding: 10,
        zIndex: 10,
        backdropFilter: "blur(12px)",
        width: 200,
      }}
    >
      <div
        style={{
          fontSize: 8,
          letterSpacing: 3,
          color: C.textDim,
          marginBottom: 6,
          fontFamily: mono,
        }}
      >
        QUICK READOUT
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
          fontSize: 9,
          fontFamily: mono,
        }}
      >
        {stats.map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: C.textDim }}>{l}</span>
            <span style={{ color: C.accent }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────

function Scene({ highlight }) {
  return (
    <Canvas
      camera={{ position: [60, 40, 80], fov: 40, near: 1, far: 1000 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 100, 400]} />

      <ambientLight intensity={0.4} color={0x112244} />
      <directionalLight position={[50, 30, 40]} intensity={0.8} color={0x88ccff} />
      <directionalLight position={[-40, -20, -30]} intensity={0.3} color={0x00e5ff} />
      <pointLight position={[0, 0, 70]} intensity={1} distance={200} color={0x00ccff} />

      <Stars radius={200} depth={100} count={3000} factor={2} fade speed={0.5} />

      <gridHelper
        args={[300, 40, 0x003344, 0x001a22]}
        position={[0, -30, 0]}
        material-transparent
        material-opacity={0.25}
      />

      <Suspense fallback={null}>
        <ShipModel highlight={highlight} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={50}
        maxDistance={250}
        autoRotate={false}
      />
    </Canvas>
  );
}

// ─── NAV TABS ─────────────────────────────────────────────────────────────────

const TAB_LABELS = {
  overview: "IDENT",
  power: "POWER",
  propulsion: "DRIVE",
  thermal: "THERMAL",
  armour: "DEFENCE",
  sensors: "SENSORS",
  weapons: "WEAPONS",
};

// ─── MAIN MSD COMPONENT ──────────────────────────────────────────────────────

export default function MSD() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderPanel = useCallback(() => {
    switch (activeSection) {
      case "overview":
        return <OverviewPanel />;
      case "power":
        return <PowerPanel />;
      case "propulsion":
        return <PropulsionPanel />;
      case "thermal":
        return <ThermalPanel />;
      case "armour":
        return <ArmourPanel />;
      case "sensors":
        return <SensorsPanel />;
      case "weapons":
        return <WeaponsPanel />;
      default:
        return <OverviewPanel />;
    }
  }, [activeSection]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: mono,
      }}
    >
      <ScanLines />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "rgba(0,16,24,0.92)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 10,
          gap: 16,
        }}
      >
        {/* Diamond icon */}
        <div
          style={{
            width: 10,
            height: 10,
            background: C.accent,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              color: C.accent,
              fontWeight: 700,
            }}
          >
            ANNIHILATOR-CLASS
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: 3,
              color: C.textDim,
              marginTop: -1,
            }}
          >
            MASTER SYSTEMS DISPLAY — IP ASSAULT VEHICLE
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <StatusDot color={C.green} label="HULL" />
          <StatusDot color={C.green} label="LIFE" />
          <StatusDot color={C.accent2} label="WEAP" />
          <StatusDot color={C.warn} label="DRIVE" />
        </div>
      </div>

      {/* 3D Viewport */}
      <Scene highlight={activeSection} />

      {/* Navigation */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 10,
        }}
      >
        {MSD_SECTIONS.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            style={{
              background:
                activeSection === sec
                  ? "rgba(0,229,255,0.12)"
                  : "rgba(0,16,24,0.75)",
              border: `1px solid ${activeSection === sec ? C.accent : C.border}`,
              color: activeSection === sec ? C.accent : C.textDim,
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: 3,
              padding: "7px 14px",
              cursor: "pointer",
              textTransform: "uppercase",
              textAlign: "left",
              borderRadius: 1,
              transition: "all 0.2s ease",
              width: 110,
            }}
          >
            {TAB_LABELS[sec]}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 12,
          width: 360,
          maxHeight: "calc(100vh - 110px)",
          overflowY: "auto",
          background: C.panelBg,
          border: `1px solid ${C.border}`,
          borderRadius: 2,
          padding: 14,
          zIndex: 10,
          backdropFilter: "blur(16px)",
          scrollbarWidth: "thin",
          scrollbarColor: `${C.dim} transparent`,
        }}
      >
        {renderPanel()}
      </div>

      <QuickReadout />
      <StatusBar />
    </div>
  );
}
