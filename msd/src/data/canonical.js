/**
 * CANONICAL DATA — Annihilator-Class IP Assault Vehicle
 * Source: Ship specification table + "Threshold" story text
 *
 * All values below are taken directly from the original spec sheet
 * or quoted/referenced from the story. Non-canonical inferences
 * are clearly marked [INFERRED].
 */

// ─── ANNIHILATOR-CLASS (CANONICAL) ────────────────────────────────────────────

export const ANNIHILATOR = {
  meta: {
    name: "Annihilator-Class IP Assault Vehicle",
    designation: "SC3 Interplanetary Assault Ship",
    builder: "Arco Cooperative Holdings",
    origin: "Inner Halo, Mercury",
    operators: ["Arco Interstellar Agency", "Union Human Defence Fleet", "Various others"],
    predecessor: "Arsonist-Class IP Assault Vehicle",
  },

  hull: {
    length_m: 200,
    displacement_dry_t: 2000,
    displacement_wet_t: 4000,
    complement_min: 11,
    complement_max: 285,
    // Story: "elongated pyramids with sweeping lines like darts,
    //         ridged with projectors and weapons hardpoints"
    // Story: "a gaping central tube running along its main axis"
    profile: "Elongated pyramid, dart-like sweeping lines",
    spinal_mount: true,
  },

  power: {
    continuous_output_gw: 1000,
    sources: [
      {
        name: "2740-model Drive-Linked MHD Column",
        type: "MHD",
        output_gw: 1000,
        count: 1,
      },
      {
        name: "Aneutronic Spheromak Reactor",
        type: "Fusion",
        output_gw: 500,
        count: 2,
      },
    ],
    storage: {
      name: "ECell Array",
      count: 100000,
      unit_mass_kg: 1,
      total_energy_tj: 4,
    },
  },

  propulsion: {
    primary: {
      name: "2740-model External-Matrix Doped-Beam ABC Drive",
      type: "Antimatter Beamed-Core",
      note: "Standard fit",
    },
    upgrade: {
      name: "2785-model Monopole-Implosion Vacuum (MIV) Drive",
      type: "MIV",
      note: "False vacuum decay energy extraction",
    },
    manoeuvre: {
      thrusters: { name: "Gimballed Electrothermal Plasma Rockets", count: 4 },
      rcs: { name: "Electrothermal RCS Nozzles", count: 64, clusters: "16×4" },
    },
    performance: {
      cruise: {
        acceleration_ms2: 4,
        power_gw: 72600,
        exhaust_velocity_kps: 10000,
        delta_v_kps: 6931,
      },
      peak: {
        acceleration_ms2: 200,
        power_gw: 181000,
        exhaust_velocity_kps: 500,
        delta_v_kps: 347,
      },
    },
  },

  thermal: {
    dispersion: "Carbon nanofluid centralised thermal dispersion system",
    recovery: {
      name: "ECell-linked thermal recovery reservoir",
      mass_kg: 100000,
    },
    radiators: {
      name: "Extensible graphene strake radiator",
      count: 4,
      area_km2: 1, // each
      // Story: "Strakes glowed luminous white along each ship's leading edges
      //         — radiators made of some unknown, extraordinarily heat-tolerant substance."
    },
  },

  armour: {
    fore: {
      name: "Hyperdiamond Whipple Shield",
      thickness_mm: 750,
    },
    flanks: {
      name: "Hyperdiamond w/ Dispersive Layer",
      thickness_mm: 200,
    },
  },

  sensors: {
    passive: [
      { name: "Single-Photon Hull Skein", type: "Photon detection" },
      {
        name: "Triply Redundant Telescope Array",
        type: "Optical/UV/X-ray",
        range: "1–1000 Å single-photon cameras",
      },
      { name: "Particle Multiplier Imager Tubes", type: "Particle detection" },
    ],
    active: [
      {
        name: "LIDAR & Phased-Array Hull Radar",
        range: "1–1000 Å",
        type: "Active EM",
      },
    ],
    refit: [
      { name: "Monomatrix Fleck Neutrino Camera", type: "Neutrino imaging" },
      { name: "Gravitational Wave Detector", type: "Gravitational" },
    ],
  },

  ew: {
    transmitters: {
      name: "2710-model Multipurpose Transmitter (Burnpulse Array)",
      count: 8,
      power_mw: 200,
    },
    note: "Laser weapons can be repurposed as EW systems",
  },

  weapons: {
    energy: [
      {
        name: "2710-model Class 1 Continuous UV Laser Emitter",
        count: 32,
        output_gw: 5,
        type: "Ultraviolet laser",
        role: "Close-range / point defence / EW",
        // Story: "disturbingly organic, eyelid-like structures opened and closed
        //         along the ship's flanks, each one an emitter throwing out
        //         multiple independent beams of hard radiation"
      },
      {
        name: "2712-model Class 2 Burst Long-Range X-Ray Laser",
        count: 4,
        output_gw: 100,
        type: "X-ray laser",
        role: "Long-range strike / torpedo interception",
        // Story: "torpedoes blinked out of existence, killed by perfectly aimed
        //         beams of hard radiation" — across tens of thousands of km
      },
      {
        name: "2707-model Neutralizer Burst Proton Beam Effector",
        count: 1,
        output_tj: 1, // per shot
        type: "Proton beam",
        role: "Heavy strike",
        alternate: true, // OR with X-ray lasers
      },
    ],
    guided: {
      micromissile_rails: {
        name: "Low-Impulse 30mm Launch Rail",
        count: 16,
        munitions: [
          { name: "EBolt Fragmentation Micromissile", yield: "Kinetic/frag" },
          { name: "F-AM Micromissile", yield: "0.5 Kt" },
        ],
      },
      heavy_rails: {
        name: "Low-Impulse 250mm Launch Rail w/ Rapid Reloader",
        count: 4,
      },
      exodrone: {
        model: "ACH 2705-model Exodrone Platform",
        drive: "High-doping ABC drive (fixed injector)",
        sensors: "Standard sensor package",
        // Story: "projectiles approaching at more than two hundred Gs.
        //         Then they accelerated still further." — laser-propelled
        acceleration_g: 200, // minimum, story indicates higher
        payloads: [
          "ECell-Laser",
          "F-AM (Focussed-Antimatter)",
          "ECell-Beam",
          "Flechette",
          "Electronic-Warfare",
          "Oneshot Coil Gun",
          "Pure-Fusion / Casaba-Fusion",
          "AP-AM (Augmented-Penetration Antimatter)",
        ],
        slots: "2–4 payloads per drone",
      },
      torpedo: {
        model: "ACH 2703-model Long-Range Standoff Torpedo",
        drive: "Low-doping ABC drive (fixed injector)",
        sensors: "Standard sensor package",
        warheads: [
          { name: "Plasma", yield: "15 Kt" },
          { name: "Fusion", yield: "25 Mt" },
          { name: "F-AM Primary", yield: "30 Gt" },
          { name: "Flechette", yield: "Kinetic" },
        ],
      },
    },
    kinetic: [
      {
        name: "ACH 500mm Burst Spine-Mounted Diamond Duster",
        type: "Hypervelocity mass projector",
        count: 1,
        mount: "Spinal",
        role: "Primary kinetic — micron-particle stream",
        alternate: true, // OR with 100mm turrets
        // Story: "secondary anti-collision sensors on the Jayapal registering
        //         a stream of incoming dust particles" — too small for radar,
        //         multiple hull breaches milliseconds apart
      },
      {
        name: "ACH 100mm Burst High-Energy Ballistic Turret",
        count: 4,
        mount: "Turret",
        role: "Secondary kinetic",
        alternate: true, // OR with Diamond Duster
      },
      {
        name: "ACH 2mm Continuous Low-Energy Ballistic Turret",
        count: 32,
        mount: "Turret",
        role: "Point defence / CIWS",
      },
    ],
  },
};

// ─── INCISOR-CLASS (CANONICAL — from story) ──────────────────────────────────
// Story: "initial three were somewhat smaller than the boxy forms of the Union craft"
// Story: Same weapon types as Annihilator but fewer; same dart-like profile
// Three deployed in the battle, one destroyed by Isidore

export const INCISOR = {
  meta: {
    name: "Incisor-Class", // [INFERRED name from story context]
    designation: "SC2 Interplanetary Assault Ship", // [INFERRED — smaller than Annihilator]
    builder: "Arco Cooperative Holdings",
    operators: ["Arco Interstellar Agency"],
  },
  hull: {
    length_m: 150, // [INFERRED — "somewhat smaller"]
    profile: "Elongated pyramid, dart-like — same family as Annihilator",
  },
  propulsion: {
    // Story: "drive plumes far outshining any in the Union fleet"
    // Story: "accelerating at rates that would surely kill any human onboard"
    // [INFERRED] likely ABC drive, possibly unmanned or heavily augmented crew
    type: "ABC Drive",
    acceleration_combat_g: 50, // [INFERRED — "surely kill any human"]
  },
  weapons: {
    // Story describes same weapon types but from smaller platforms
    energy: "X-ray lasers, UV lasers (fewer than Annihilator)",
    kinetic: "Diamond Duster spinal mount (confirmed from story)",
    guided: "Exodrones, micromissiles",
    // Story: "eyelid-like structures opened and closed along the ship's flanks"
  },
  notes: "3 deployed in battle. 1 destroyed by USC Isidore's final attack.",
};

// ─── UNION SHIPS (EXTRAPOLATED FROM STORY) ────────────────────────────────────

export const UNION_DESTROYER = {
  meta: {
    name: "Union Destroyer (Isidore-class)", // [INFERRED class name from lead ship]
    designation: "Destroyer",
    operators: ["Union Human Defence Fleet"],
  },
  hull: {
    // Story: "boxy, almost trilaterally symmetric towers, bristling with
    //         torpedo tubes and gun turrets"
    profile: "Boxy trilaterally symmetric tower",
    // Story: "somewhat smaller" — Incisors are smaller, so Union DDs are ~150-200m
    length_m: 180, // [INFERRED]
  },
  propulsion: {
    // Story: "fusion drive" — "flooding its plume with dense hydrocarbon slush"
    // Story: "ten Gs" standard combat, "thirty Gs" emergency (lethal to crew)
    type: "Fusion drive (hydrocarbon slush augmented)",
    acceleration_combat_g: 10,
    acceleration_emergency_g: 30, // lethal — crew died
    // Story: "melting the entire reaction chamber and nozzle in less than a minute"
    // at 30G — drive is single-use at that thrust
  },
  crew_systems: {
    // Story: breathable liquid flooding CIC for high-G
    // Story: "gimballed acceleration couch", "G-rig"
    // Story: IV line with anti-G-LOC drugs
    // Story: subvocal comms via mic
    acceleration_fluid: true,
    g_rig: true,
    pharmacological_aids: true,
  },
  weapons: {
    torpedoes: {
      types: ["Kinetic buckshot", "Fusion warheads"],
      // Story: "launched a single round" — railgun warning shot
      // Story: "every remaining torpedo" — finite magazine, exhaustible
      note: "Finite magazine, standard guidance, autoseek capable",
    },
    railguns: {
      // Story: "main railgun batteries", "the guns fired, causing the lights
      //         in the CIC to dip briefly"
      type: "Railgun turrets",
      note: "High power draw, effective at close range",
    },
    pdc: {
      // Story: "rapid-fire kinetic cannons", "PDCs whirred"
      type: "Point Defence Cannons",
      note: "Kinetic CIWS, limited effective range vs advanced missiles",
    },
  },
  sensors: {
    // Story: "radar switched to submillimeter waves" — adaptable
    // Story: standard radar missed duster particles
    radar: "Standard + submillimeter (adaptive)",
    // Story: "anti-collision sensors" — secondary system detected dust
    secondary: "Anti-collision particle sensors",
  },
  armour: {
    // Story: "scoring gashes in their armour" — survived laser hits
    // Story: "spun in a tight corkscrew, dissipating the laser energy"
    // Story: "They were tough and could probably take more of a beating"
    note: "Substantial armour, survives glancing laser hits, good thermal mass",
  },
};

export const UNION_CORVETTE = {
  meta: {
    name: "Union Corvette",
    designation: "Unmanned Corvette",
    operators: ["Union Human Defence Fleet"],
  },
  hull: {
    // Story: "nine unmanned corvettes" per destroyer
    unmanned: true,
    // [INFERRED] smaller than destroyers
    length_m: 60, // [INFERRED]
  },
  propulsion: {
    // Story: "escorting unmanned corvettes accelerating harder and diverging"
    // Higher G tolerance than crewed ships
    type: "Fusion drive",
    acceleration_combat_g: 20, // [INFERRED — "harder" than 10G]
  },
  weapons: {
    // Story: "Similar to destroyers but smaller" — [INFERRED]
    note: "Reduced weapon loadout, screening/escort role",
  },
};

// ─── BATTLE OF THE INTERSTICE — ORDER OF BATTLE ──────────────────────────────

export const BATTLE = {
  name: "Battle of the Interstice",
  // Story: "they may have only a few hours to respond" — and it was "only hours"
  duration_minutes: 51, // from story title "41–51 minutes" for main engagement

  timeline: [
    {
      t: "T-0:00",
      label: "ATBARAH INCIDENT",
      event: "Kosmohansa vessel Atbarah accelerates toward interstice",
      detail: "Human Purity Front (Strivers) suicide attack. Defence grid hacked. Stations destroyed.",
    },
    {
      t: "T+0:00",
      label: "TRANSIT",
      event: "Atbarah enters interstice",
      detail: "Crew already dead from acceleration. Ship impacts habitat on far side.",
    },
    {
      t: "T+0:05",
      label: "AFTERMATH",
      event: "~200,000 casualties on far side",
      detail: "Union fleet establishes blockade. First Fleet forms cordon.",
    },
    {
      t: "T+4:00",
      label: "EMERGENCE",
      event: "Four Arco warships emerge from interstice",
      detail: "3× Incisor-class, 1× Annihilator-class. Coasting, drives stilled.",
    },
    {
      t: "T+4:02",
      label: "DETECTION",
      event: "Union forces detect intrusion",
      detail: "Magnified sensor view of warped interstice space.",
    },
    {
      t: "T+4:05",
      label: "SABOTAGE",
      event: "Striver malware forces torpedo launch",
      detail: "Torpedoes fire without orders. Comms handshake fails. Network compromised.",
    },
    {
      t: "T+4:08",
      label: "JAMMING",
      event: "Arco ships jam all communications",
      detail: "Grey 'invalid' icons over half of fleet network links.",
    },
    {
      t: "T+4:10",
      label: "FIRST BLOOD",
      event: "Arco X-ray lasers destroy all torpedoes",
      detail: "Perfectly aimed across tens of thousands of km. Like snow melting.",
    },
    {
      t: "T+4:15",
      label: "DUSTER STRIKE",
      event: "Invisible kinetic barrage destroys Union ships",
      detail: "Diamond Duster micro-particles undetectable by standard radar. Multiple hull breaches milliseconds apart.",
    },
    {
      t: "T+4:20",
      label: "ADAPTATION",
      event: "Hansun identifies duster weapon via collision sensors",
      detail: "Fleet switches to submillimeter radar. Dust streams become visible.",
    },
    {
      t: "T+4:25",
      label: "CLOSE RANGE",
      event: "Union fleet closes to railgun range",
      detail: "PDCs engage. Lasers score armour but Union ships survive.",
    },
    {
      t: "T+4:30",
      label: "EXODRONE SWARM",
      event: "Annihilator launches smart missile / exodrone salvo",
      detail: "200+ G acceleration. Laser-propelled. Antimatter warheads. Submunitions with own drives.",
    },
    {
      t: "T+4:35",
      label: "MASSACRE",
      event: "Union fleet overwhelmed by missile swarm",
      detail: "Hundreds of contacts. AM warheads, particle beams, EW, kinetics. Fighting blind.",
    },
    {
      t: "T+4:45",
      label: "ISIDORE'S STAND",
      event: "USC Isidore plays dead, then attacks at 30G",
      detail: "Emergency burn destroys drive. All crew killed except Hansun. One Incisor destroyed.",
    },
    {
      t: "T+4:51",
      label: "WITHDRAWAL",
      event: "Arco ships return through interstice",
      detail: "3 of 4 ships return. Mission: punitive strike accomplished.",
    },
  ],

  forces: {
    union: {
      name: "Union First Fleet",
      composition: [
        { type: "Destroyer", class: "Isidore-class", count: 10 },
        { type: "Corvette", class: "Unmanned", count: 90, note: "9 per destroyer" },
      ],
      total_ships: 100,
      losses: {
        destroyed: 67, // "more than two thirds"
        // Story: Isidore severely damaged, crew dead except Hansun
        note: "Fleet scattered. Survivors fled to inhabited worlds or fleet bases.",
      },
    },
    arco: {
      name: "Arco Battle Sub-Constellation",
      commander: "Honed Aspect (Dyn officer)",
      composition: [
        { type: "Assault Ship", class: "Incisor-class", count: 3 },
        { type: "Assault Ship", class: "Annihilator-class", count: 1 },
      ],
      total_ships: 4,
      losses: {
        destroyed: 1, // one Incisor
        note: "Annihilator undamaged. Punitive strike — deliberate, calculated response.",
      },
    },
  },

  outcome: "Decisive Arco victory. Union fleet destroyed for minimal losses. Interpreted as deliberate punitive action, not invasion.",

  // Story: Admiral Aumonier's analysis
  strategic_context:
    "Arco forces jammed comms after Striver malware forced Union torpedo launch. " +
    "Admiral Aumonier concluded the attack was a calculated lesson: " +
    "'Someone from our side killed a quarter million of their citizens. They don't care who did it. " +
    "They don't care why they did it. What they care about is how it looks.'",
};

// ─── MSD DISPLAY DATA (derived from canonical for UI) ─────────────────────────

export const MSD_SECTIONS = [
  "overview",
  "power",
  "propulsion",
  "thermal",
  "armour",
  "sensors",
  "weapons",
];

export const MSD_STATUS = {
  hull: { label: "HULL", status: "nominal" },
  life: { label: "LIFE", status: "nominal" },
  weap: { label: "WEAP", status: "armed" },
  drive: { label: "DRIVE", status: "standby" },
};
