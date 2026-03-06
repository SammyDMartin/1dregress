# AI Development Advice — Ascent Universe

Lessons learned from multiple AI-assisted development sessions on this project. If you're a model picking up work here, read this first.

---

## 1. Don't Write Prose From Your Token Budget

**The single biggest waste in prior sessions was generating thousands of words of creative prose directly from the model's context window.** You are not a word processor. The source texts exist in `source_texts/` — use them.

### What to do instead:
- **Extract and transform** existing text using shell tools (`sed`, `awk`, `python3` scripts)
- **Assemble** documents by concatenating source files with light scripting
- **Use `cat`, `sed -n 'X,Yp'`, and Python** to pull passages from source material rather than retyping or paraphrasing them
- When gap-filling is genuinely needed (new transitional scenes, etc.), write the minimum necessary and prefer shorter, tighter prose
- For large assembly tasks, write a shell script or Python script that does the concatenation, so it's reproducible and editable

### Why this matters:
- Token budget is expensive and limited — spend it on reasoning, not transcription
- Manual retyping introduces errors and inconsistencies with the source
- A script can be re-run if the source changes; manually-typed output cannot
- The user is paying for intelligence, not for a slow typist

---

## 2. Understand the Architecture Before Touching Anything

This is a static site with **no build step**. Every page is self-contained HTML with inline `<style>` and `<script>`. Shared resources:

- `style.css` — Theme variables and shared component styles
- `nav.js` — Injects navigation bar, status bar, scanlines, and clock into every page

New pages should:
- Link `style.css` and `nav.js`
- Use the existing CSS variables (`--accent`, `--bg`, `--panel`, etc.)
- Follow the data-driven pattern (JS arrays of objects rendered into DOM)
- Include `<div class="page-body">` wrapper for nav offset

### The light mode system
The site now supports a light/reader mode toggle. The toggle is injected by `nav.js` and applies `[data-theme="light"]` to `<html>`. All theme changes live in `style.css` under that attribute selector. New pages automatically inherit both themes if they use CSS variables.

---

## 3. The Source Material Is the Product

The Ascent Universe is built from 11 source texts. **Everything on the site should trace back to these texts.** Don't invent lore. Don't embellish beyond what the texts support. The author's prose is good — surface it directly when possible.

Key files:
- `source_texts/ascent_text.txt` — *Ascent* novel
- `source_texts/eszel_text.txt` — *Eszel / The Listener* novel
- `source_texts/note_stories.txt` — All 9 short stories (single file, no line breaks between stories — use byte offsets or keyword search)
- `UNIVERSE_REFERENCE.md` — Comprehensive reference across all texts
- `BRAINSTORMING.md` — Development log and prioritised ideas

---

## 4. Prioritise Interactivity Over Static Content

The best parts of this site are interactive: the MSD 3D model, the battle simulation, the story readers. Static text walls are the weakest parts. When adding content, prefer:

1. Interactive/explorable formats (story readers, expandable entries, visualisations)
2. Data-driven templates (add an object to a JS array, get a rendered card)
3. Static text as a last resort

---

## 5. Match the Visual Language

The design language is **"military intelligence terminal"**:
- Monospace font (`Courier New`)
- Cyan (`#00e5ff`) primary, orange (`#ff6b35`) secondary
- Dark background (`#010a0f`)
- Scanline overlay, thin scrollbars
- In-universe framing: clearance stamps, Arco clock, military terminology
- Light mode uses the inverse: warm off-white background, dark text, subtle serif option

Don't introduce new colours, fonts, or design patterns without good reason.

---

## 6. Practical Tips

- **`note_stories.txt` is one giant line.** Use `grep -b` or Python to find story boundaries.
- **The codex and timeline are data-driven.** To add content, find the JS array in the HTML file and add a new object. Don't restructure the rendering code.
- **The story reader template** is in `story.html`. Copy its structure for new stories. Each scene is an object with `title`, `header`, `bg`, `effect`, and `text` fields.
- **Test locally** with `python3 -m http.server` — the site is pure static files.
- **Git branch convention**: development branches start with `claude/`.
- **Don't over-engineer.** This is a personal creative project, not enterprise software. Simple is better.

---

## 7. What's Been Done vs. What's Left

### Done:
- Hub page, MSD, battle simulation, science compendium
- Threshold story reader (full novel adaptation)
- Seeker story reader (Dyn origin trilogy)
- Timeline, codex, worlds & eras
- Eszel complete draft assembly (in `ESZEL_COMPLETE_DRAFT.md` and scene files)
- Light mode / reader mode toggle
- Listener easter egg

### High-priority remaining work (from BRAINSTORMING.md):
- Eszel/Listener story reader page (adapt `ESZEL_COMPLETE_DRAFT.md` into the scene reader format)
- Interactive orrery visualisation
- Anthropic trap interactive page
- Interstice network map
- Remaining short story adaptations (Facilitator, Utilitaria, Starwhisp, etc.)
- Cross-story connection visualisation

See `BRAINSTORMING.md` for the full ranked list.
