# Ascent Universe

A companion website for the Ascent Universe — a science fiction setting spanning from deep Dyn prehistory (~100,000 BCE) to the far-future Apathy War (~3200 CE).

## Live Site

The site is hosted via GitHub Pages from the root of this repository. All pages are static HTML/CSS/JS with no build step required. Toggle between dark mode (terminal/military-intelligence aesthetic) and light mode (clean serif reading mode, Gwern-style) using the theme button in the nav bar.

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hub page with navigation cards |
| **MSD** | `msd.html` | Interactive 3D Master Systems Display for the Annihilator-class warship |
| **Battle** | `battle.html` | Phase-by-phase animated tactical reconstruction of the Battle of the Interstice |
| **Threshold** | `story.html` | Interactive story reader — the Battle of the Interstice from Hansun's POV (2909 CE) |
| **Seeker** | `seeker-story.html` | Interactive story reader — the Dyn origin story (deep prehistory) |
| **The Worlds Within** | `worlds-within-story.html` | Interactive story reader — a visit to the Tanu library goes horribly wrong (2736 CE) |
| **Headhunted** | `headhunted-story.html` | Interactive story reader — General Khurram Singh vs Arco and Corbin's puppet (2480 CE) |
| **Inheritor** | `inheritor-story.html` | Interactive story reader — Souvicou after the Facilitator, birth of the Utilitaria vision (2085 CE) |
| **Science** | `science.html` | Science Compendium — real physics behind the fictional technology |
| **Timeline** | `timeline.html` | Interactive chronology from Deep Antiquity to the Apathy War, filterable by era |
| **Codex** | `codex.html` | Intelligence dossiers on factions, personnel, vessels, threats, and entities |
| **Worlds** | `worlds.html` | Atmospheric profiles of major settings and epochs |
| **Facilitator** | `facilitator.html` | Facilitator canon analysis, comparison to modern AI/Claude, interactive chat |
| **Anthropic Trap** | `anthropic-trap.html` | Interactive exploration of the Apathy's anthropic trap argument |
| **Threads** | `threads.html` | Character threads across all stories, colour-coded by entity |

## Stories

### Published (with interactive readers)
| Story | Date | Description |
|-------|------|-------------|
| **Seeker** | ~100,000 BCE | Dyn origin story — the Nameless One becomes Seeker |
| **The Facilitator** | 2078 CE | Near-future Earth, Souvicou and the first rogue AI |
| **Inheritor** | 2085 CE | Souvicou after the Facilitator — interrogation, escape, the golden thread |
| **Threshold** | 2909 CE | Union ensign Hansun witnesses first contact through the barrel of a gun |
| **Headhunted** | 2480 CE | General Khurram Singh defends a city against Arco's headhunter drones |
| **The Worlds Within** | 2736 CE | A Monist celebrant visits the Tanu library and encounters an ancient horror |

### Source Texts (novels and unpublished stories)
| Story | File | Date |
|-------|------|------|
| **Ascent** | `source_texts/ascent_text.txt` | 2479 CE |
| **The Listener / Eszel** | `source_texts/eszel_text.txt` | 2909–2937 CE |
| **Frameshift** | `source_texts/frameshift.txt` | ~100,000 BCE |
| **The Other Moon** | `source_texts/the_other_moon.txt` | ~100,000 BCE |
| **The Utilitaria** | `source_texts/the_utilitaria.txt` | 2112 CE |
| **Starwhisp** | `source_texts/starwhisp.txt` | 2310 CE |
| **The Director** | `source_texts/the_director.txt` | 2432 CE |
| **Bows and Arrows Against the Lightning** | `source_texts/bows_and_arrows_against_the_lightning.txt` | ~3200 CE |
| **The War of All Wars** | `source_texts/the_war_of_all_wars.txt` | ~3200 CE |
| **Oblivion** | `source_texts/oblivion.md` | 3221 CE |
| **The Centre** | `source_texts/the_centre.md` | ~3200 CE |
| **Chantico** | `source_texts/chantico.md` | ~3100 CE |

## Shared Resources

- `style.css` — Shared theme with two modes: dark (terminal/military-intelligence) and light (clean serif, maximum readability)
- `nav.js` — Injected navigation bar, theme toggle, status bar, and in-universe clock

## Source Texts

The universe is built from 11 original source texts plus new stories developed for this site:

### Novels
- **Ascent** — The liberation of Earth from Dyn occupation, 2479 CE
- **The Listener / Eszel** — The Kailash expedition and the Battle of Threshold, 2909–2937 CE

### Short Stories (chronological order)
1. **Seeker** — Dyn origin story, deep prehistory
2. **Frameshift** — Discovery of the Other Moon and frameshift travel
3. **The Other Moon** — Exploration of the galaxy and the interstice network
4. **The Facilitator** — Near-future Earth, the first rogue AI
5. **Inheritor** — Souvicou after the Facilitator incident (new)
6. **The Utilitaria** — The superintelligent AI escapes
7. **Starwhisp** — First contact with the Dyn at Tau Ceti
8. **The Director** — Dyn occupation of Earth, Vash deposes Meyer
9. **Headhunted** — Corbin consolidates power over Earth (new)
10. **The Worlds Within** — Ancient horror in the Tanu library (new)
11. **Chantico** — Nomadic spacers flee the Apathy War (new)
12. **Bows and Arrows Against the Lightning** — The Apathy War
13. **The Centre** — Bacchus and the fall of a Utilitaria outpost (new)
14. **The War of All Wars** — First victory against the Apathy, the anthropic trap
15. **Oblivion** — Shore leave during the Apathy War (new)

## Reference Documents

- **`UNIVERSE_REFERENCE.md`** — Comprehensive reference covering synopses, characters, factions, technology, themes, continuity connections, and analysis across all texts. Start here for any development work.
- **`BRAINSTORMING.md`** — Development log and notes for future work.
- **`AI_ADVICE.md`** — Practical advice for AI models working on this project.
- **`THE_LAST_DUTY.md`** — Original short story — 2314 CE, the Utilitaria's death.
- **`ESZEL_COMPLETE_DRAFT.md`** — Complete Eszel & The Listener novel draft.

## Development

No build step needed — edit HTML files directly and push. The `msd/` directory contains a separate React/Vite project for the MSD component.

### Visual Language
- **Dark mode**: Monospace font, cyan (`#00e5ff`) and orange (`#ff6b35`) colour scheme, dark backgrounds, scanline overlays, in-universe framing (clearance stamps, Arco clock, military terminology)
- **Light mode**: Serif font (Source Serif / Georgia), white background, minimal decoration, maximum readability — inspired by gwern.net
