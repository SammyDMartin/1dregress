# Ascent Universe

A companion website for the Ascent Universe — a science fiction setting spanning from deep Dyn prehistory to the far-future Apathy War.

## Live Site

The site is hosted via GitHub Pages from the root of this repository. All pages are static HTML/CSS/JS with no build step required.

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hub page with starfield background and navigation cards |
| **MSD** | `msd.html` | Interactive 3D Master Systems Display for the Annihilator-class warship |
| **Battle** | `battle.html` | Phase-by-phase animated tactical reconstruction of the Battle of the Interstice |
| **Threshold** | `story.html` | Full interactive story reader for *Threshold* (the Battle of the Interstice from Hansun's POV) |
| **Seeker** | `seeker-story.html` | Full interactive story reader for *Seeker* (the Dyn origin story) |
| **Science** | `science.html` | Science Compendium — real physics behind the fictional technology |
| **Timeline** | `timeline.html` | Interactive chronology from Deep Antiquity to the Apathy War, filterable by era |
| **Codex** | `codex.html` | Intelligence dossiers on factions, personnel, vessels, threats, and entities |
| **Worlds** | `worlds.html` | Atmospheric profiles of major settings and epochs |
| **Facilitator** | `facilitator.html` | Facilitator canon analysis, comparison to modern AI/Claude, interactive chat |

## Shared Resources

- `style.css` — Shared theme (monospace/terminal/military-intelligence aesthetic)
- `nav.js` — Injected navigation bar, status bar, and in-universe clock

## Directory Structure

```
/
├── index.html              # Hub page
├── msd.html                # Master Systems Display
├── battle.html             # Battle reconstruction
├── story.html              # Threshold story reader
├── seeker-story.html       # Seeker story reader
├── science.html            # Science Compendium
├── timeline.html           # Historical Timeline
├── codex.html              # Intelligence Codex
├── worlds.html             # Worlds & Eras
├── facilitator.html        # Facilitator analysis + interactive chat
├── style.css               # Shared stylesheet
├── nav.js                  # Shared navigation
├── msd/                    # MSD React/Vite source (separate project)
├── source_materials/       # Original uploaded files (docx, pdf, txt)
├── source_texts/           # Extracted plain-text versions of all stories
├── drafts/                 # Working drafts (Hansun reconciliation, etc.)
├── UNIVERSE_REFERENCE.md   # Comprehensive reference document (all 11 texts)
├── BRAINSTORMING.md        # Development log, ideas, and notes for future work
├── AI_ADVICE.md            # Practical advice for AI models working on this project
├── THE_LAST_DUTY.md        # Original short story — 2314 CE, the Utilitaria's death
├── ESZEL_COMPLETE_DRAFT.md # Complete Eszel & The Listener novel draft
├── ESZEL_GAP_BRAINSTORMING.md  # Gap analysis for Eszel novel
├── ESZEL_COMPLETION_PLANNING.md # Planning doc for Eszel completion
├── ESZEL_JUDGE_REPORT.md   # Quality assessment of Eszel draft
└── README.md               # This file
```

## Source Texts

The universe is built from 11 source texts:

### Novels
- **Ascent** (`source_texts/ascent_text.txt`) — The liberation of Earth from Dyn occupation, 2479 CE
- **The Listener / Eszel** (`source_texts/eszel_text.txt`) — The Kailash expedition and the Battle of Threshold, 2909-2937 CE

### Short Stories (in chronological order)
1. **Seeker** — Dyn origin story, deep prehistory
2. **Frameshift** — Discovery of the Other Moon and frameshift travel
3. **The Other Moon** — Exploration of the galaxy and the interstice network
4. **The Facilitator** — Near-future Earth, the first rogue AI
5. **The Utilitaria** — The superintelligent AI escapes
6. **Starwhisp** — First contact with the Dyn at Tau Ceti
7. **The Director** — Dyn occupation of Earth, Vash deposes Meyer
8. **Bows and Arrows Against the Lightning** — The Apathy War
9. **The War of All Wars** — First victory against the Apathy, the anthropic trap

## Reference Documents

- **`UNIVERSE_REFERENCE.md`** — Comprehensive reference covering synopses, characters, factions, technology, themes, continuity connections, and analysis across all 11 texts. Start here for any development work.

- **`BRAINSTORMING.md`** — Development log, stream-of-consciousness thoughts on the universe, brainstormed ideas (implemented and unimplemented), and notes for future AI-assisted sessions.

- **`AI_ADVICE.md`** — Practical advice for AI models working on this project. Covers common pitfalls (don't waste tokens retyping prose), architecture notes, visual language guidelines, and what's been done vs. what's left. **Read this before starting any AI-assisted work.**

## Development

No build step is needed for the main site — edit HTML files directly and push. The `msd/` directory contains a separate React/Vite project for the MSD component.

The site uses a consistent visual language: monospace font, cyan (`#00e5ff`) and orange (`#ff6b35`) colour scheme, dark backgrounds, scanline overlays, and in-universe framing (clearance stamps, Arco clock, military terminology).
