# CLAUDE.md — Project Guidelines for AI Collaborators

## Project Overview

Static HTML/CSS/JS companion website for the Ascent Universe science fiction setting. No build system — each page is self-contained. Shared resources: `style.css` (theme), `nav.js` (navigation, clock, theme toggle).

## Creative Writing

- **EXPAND and ENRICH content** — never cut material unless explicitly asked
- Preserve texture, atmosphere, subtext, and nuance in all rewrites
- Character portrayals must be **subtle, not on-the-nose** — show through actions and choices, not exposition
- When rewriting, target **at least 150% of original word count** unless told otherwise
- Preserve the author's original text **verbatim** in story drafts (see `AI_ADVICE.md`)
- Report word counts before and after each chapter rewrite

## Git & Commits

- Commit **early and often** — after each chapter, page, or major section
- Never leave uncommitted changes when approaching usage limits
- For long-running tasks (novel assembly, multi-chapter rewrites), commit incrementally after each unit of work
- Use descriptive commit messages summarising what changed and why

## Editing Guidelines

- When editing files with special characters (smart quotes, em dashes, HTML entities), always **re-read the file first** to get exact text before attempting Edit operations
- Read `AI_ADVICE.md` before any creative writing task
- Read `UNIVERSE_REFERENCE.md` for canon consistency

## Website Conventions

- All pages link `style.css` and load `nav.js` at the end of `<body>`
- CSS variables: `--accent` (cyan), `--accent2` (orange), `--bg`, `--panel`, `--text`, `--text-dim`
- Story reader pattern: JS `SCENES` array with `{title, header, bg, effect, text}` objects
- Codex pattern: JS `ENTRIES` array with `{tab, icon, iconClass, name, type, sections, stats, quote}` objects
- Data-driven timeline: JS `EVENTS` array with era filters
- New pages must be added to `nav.js` pages array and `index.html` card grid
- Story reader pages must be added to `nav.js` storyPages array

## Key Reference Files

- `UNIVERSE_REFERENCE.md` — Canon reference: synopses, characters, factions, technology
- `AI_ADVICE.md` — Practical advice for AI models on this project
- `BRAINSTORMING.md` — Development log and ideas
- `CHANGELOG.md` — Record of all changes by session
