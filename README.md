# Ascent Universe

A companion website for the Ascent Universe — a science fiction setting spanning from deep Dyn prehistory (~100,000 BCE) to the far-future Apathy War (~3200 CE).

## Authorship

The Ascent Universe is a human-authored science fiction project. The original novels and short stories were written by the author over several years. Some newer short stories and editorial work on this site were done collaboratively with Claude (Anthropic).

| Attribution | Meaning |
|-------------|---------|
| **Human** | Written entirely by the author |
| **AI-assisted** | Plotted by the author, drafted/expanded collaboratively with Claude |
| **AI-edited** | Human-written original, with AI-assisted revision and assembly |

### Stories by attribution

| Story | Date | Attribution |
|-------|------|-------------|
| Frameshift | ~100,000 BCE | Human |
| The Other Moon | ~100,000 BCE | Human |
| Seeker | ~100,000 BCE | Human |
| The Facilitator | 2078 CE | Human |
| **Inheritor** | 2085 CE | **AI-assisted** |
| The Utilitaria | 2112 CE | Human |
| Starwhisp | 2310 CE | Human |
| **The Last Duty** | 2314 CE | **AI-assisted** |
| The Director | 2432 CE | Human |
| Ascent (novel) | 2479 CE | Human |
| **Headhunted** | 2480 CE | **AI-assisted** |
| **The Worlds Within** | 2736 CE | **AI-assisted** |
| Threshold | 2909 CE | Human |
| Eszel & The Listener (novel) | 2909–2937 CE | Human, **AI-edited** |
| Bows and Arrows Against the Lightning | ~3200 CE | Human |
| The War of All Wars | ~3200 CE | Human |

The website itself (HTML/CSS/JS, interactive readers, MSD, battle simulation, codex, etc.) was built collaboratively with Claude.

## Live Site

Hosted via GitHub Pages. All pages are static HTML/CSS/JS with no build step. Two display modes:
- **Dark mode** — terminal/military-intelligence aesthetic (monospace, cyan/orange)
- **Light mode** — clean, simple reading mode (system fonts, minimal decoration)

Toggle using the theme button in the nav bar.

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hub page with navigation cards |
| **Stories** | `stories.html` | Chronological index of all fiction with attribution |
| **Reader** | `reader.html` | Lightweight markdown/text reader for source texts |
| **MSD** | `msd.html` | Interactive 3D Master Systems Display for the Annihilator-class warship |
| **Battle** | `battle.html` | Phase-by-phase animated tactical reconstruction of the Battle of the Interstice |
| **Science** | `science.html` | Science Compendium — real physics behind the fictional technology |
| **Timeline** | `timeline.html` | Interactive chronology from Deep Antiquity to the Apathy War |
| **Codex** | `codex.html` | Intelligence dossiers on factions, personnel, vessels, and threats |
| **Worlds** | `worlds.html` | Atmospheric profiles of major settings and epochs |
| **Facilitator** | `facilitator.html` | Facilitator canon analysis, comparison to modern AI, interactive chat |
| **Anthropic Trap** | `anthropic-trap.html` | Interactive exploration of the Apathy's anthropic trap argument |
| **Threads** | `threads.html` | Character threads across all stories, colour-coded by entity |

## Shared Resources

- `style.css` — Shared theme with dark and light modes
- `nav.js` — Injected navigation bar, theme toggle, status bar, and in-universe clock

## Reference Documents

- **`UNIVERSE_REFERENCE.md`** — Comprehensive reference: synopses, characters, factions, technology, themes, continuity
- **`BRAINSTORMING.md`** — Development log and notes
- **`AI_ADVICE.md`** — Practical advice for AI models working on this project

## Development

No build step needed — edit HTML files directly and push. The `msd/` directory contains a separate React/Vite project for the MSD component.
