# Changelog — Ascent Universe Website

All notable changes to the Ascent Universe companion website.

---

## Session 11 (2026-03-07) — Visual Polish & Quality Review

Quality pass across the entire site: light mode support, visual consistency, navigation, content gaps, and broken links.

### Front Page
- Removed "ANNIHILATOR-CLASS" subtitle, added "Companion Archive" title
- Added intro paragraph with link to ascentuniverse.wordpress.com
- Reorganized cards into 4 sections: READ, EXPLORE, EXPERIENCE, SIMULATE

### Visual Style
- Fixed light mode across all content pages: codex, timeline, worlds, threads, battle, facilitator, utilitaria-chat, anthropic-trap, ai-analysis
- Replaced hard-coded `rgba(200,220,230,...)` text colors with CSS variable overrides for light mode
- Fixed chat input backgrounds (`rgba(0,0,0,0.3)`) for light mode
- Fixed invisible `rgba(255,255,255,0.03)` borders in ai-analysis
- Added light mode scrollbar-color override
- Replaced hard-coded `#00e5ff` card icon colors with `var(--accent)`

### Navigation
- Reorganized nav bar links to match front page sections (READ / EXPLORE / EXPERIENCE / SIMULATE)
- Added visual separators between nav sections
- Mobile: separators become horizontal dividers

### Content Fixes
- Added 3 missing timeline entries: Inheritor (2085 CE), The Last Duty (2314 CE), Headhunted (2480 CE)
- Fixed broken Threshold story link (threshold-story.html doesn't exist — now points to reader.html with draft)
- Removed non-existent threshold-story.html from nav.js storyPages
- Added The Sixty Percent and Oblivion to README story attribution table
- Fixed missing era dates in README story readers table

### Reference Updates
- Updated AI_ADVICE.md with insights report learnings (creative writing quality, workflow lessons, done/remaining work)
- Added 6 missing AI-assisted stories to UNIVERSE_REFERENCE.md
- Deduplicated 12 sets of duplicate codex entries (221 lines removed)
- Updated CHANGELOG.md

---

## Sessions 7–10 (2026-03-07) — Website Expansion

Massive expansion of the companion site with new interactive pages, codex entries, world sections, character threads, and visualisations.

### New Pages
- **AI Analysis** (`ai-analysis.html`) — Comparative analysis of Facilitator vs Utilitaria vs Apathy, with alignment spectrum visualisation and evolutionary timeline
- **Interstice Network** (`interstice-map.html`) — Canvas-based 3D wormhole network map with 13 nodes, drag rotation, zoom, animated particle pulses, and node selection panel
- **Utilitaria Chat** (`utilitaria-chat.html`) — "Talk to the Utilitaria" diplomatic channel chat interface with keyword-matching responses
- **Reflections of Seeker** (`reflections.html`) — In-universe Dyn philosophical text across 5 chapters, with translator's notes
- **Diamond Duster** (`diamond-duster.html`) — Animated weapon firing sequence with phase progression (CHARGING → FIRING → IMPACT), HUD telemetry, ship rendering, and speed controls
- **Liberation Day** (`liberation.html`) — Canvas-based warseed activation sequence from Ascent, with ocean floor geothermal hubs, optical fibre beams, Dyn fleet destruction, and countdown timer

### Codex Entries Added
- **Factions:** Threshold Authority, Human Purity Front / Strivers, The Others, Rational Blights
- **Personnel:** Ensign Hansun, Admiral Aumonier, Sander Reeve, Ambassador Corbin, Eszel, Aurelie, Jan, Captain Ngoni
- **Vessels:** USC Isidore
- **Entities:** The Listener, The Emissary, The Man of Nothing / Dra'll

### Worlds Expanded
- **Tanu** — Full section with Other Moon, atmosphere, Dyn culture
- **Union Space** — CIC experience, Striver problem, Kosmohansa, Threshold
- **Kailash** — Mimics, twelve Other Moons, the Listener, Hansun's return
- **Firsthome** — Night Side detail, Dyn Psychology sub-sections
- **Near-Future Earth** — Inheritor tag, LED escape quote

### Character Threads Added
- The Alignment Problem (Facilitator → Utilitaria → Apathy)
- The Fermi Paradox (Seeker → Starwhisp → Apathy War)
- Vash (Director → Ascent)
- Jan (Ascent)
- Honed Aspect (Threshold → Eszel)

### Timeline Events Added
- Kosmohansa founding, Monist Faith, Worldring Construction (Flourishing era)
- Kailash expedition, disaster, twelve Other Moons

### Story Drafts
- **Threshold** (`drafts/threshold_story.md`) — ~8000 word story draft covering the Battle of Threshold, the 19-hour standoff, and aftermath

---

## Sessions 5–6 (2026-03-06–07) — Ascent Novel Revision

Full chapter-by-chapter revision of the Ascent second draft (24 chapters). Additive approach preserving original voice while expanding descriptions and interiority.

### Chapters Revised
- All 24 chapters of Ascent second draft (`drafts/ascent_second_draft/ch01–ch24`)
- Editorial materials: structural analysis, character guides (Vash, Corbin, Jan, minor characters), themes and worldbuilding, revision guide

---

## Sessions 3–4 (2026-03-06) — Eszel Revision & Website Features

### Novel Work
- Complete second draft assembly of Eszel and the Listener (~31K words)
- 5 new scenes written to fill gaps
- Editorial analysis materials (structural, character, dialogue notes)

### Website
- **Utilitaria** page (`utilitaria.html`) — Canon analysis and philosophical exploration
- **Orrery** (`orrery.html`) — Interactive solar system visualisation
- **Oblivion** story reader (`oblivion-story.html`)
- Expanded codex with initial entries
- Expanded timeline with additional eras

---

## Sessions 1–2 (2026-03-06) — Initial Build

### Website Foundation
- Story index, markdown reader, navigation system
- Three new stories: The Worlds Within, Headhunted, Inheritor
- Anthropic Trap interactive page
- Character Threads page
- Science Compendium expansion
- Light/dark theme CSS
- Story readers for Seeker, Inheritor, Headhunted, Worlds Within, Sixty Percent

### Reference
- `UNIVERSE_REFERENCE.md` — Comprehensive universe reference document
- `AI_ADVICE.md` — Guidelines for AI models working on this project
- `BRAINSTORMING.md` — Development notes
