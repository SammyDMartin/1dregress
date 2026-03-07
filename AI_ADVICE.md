# AI Development Advice — Ascent Universe

Lessons learned from multiple AI-assisted development sessions on this project. If you're a model picking up work here, read this first.

---

## 0. The Single Biggest Problem: Creative Writing Quality

**Claude's default behaviour when rewriting prose is to cut, simplify, and pare down.** This is exactly wrong for this project. The user wants expansion, enrichment, and texture. Multiple sessions have been wasted because Claude treated creative rewrites as editing passes, stripping out atmospheric detail, compressing dialogue, and flattening character portrayals into on-the-nose exposition.

### The pattern that fails:
- Claude receives a chapter to rewrite
- Claude "improves" it by making it shorter, removing what it perceives as redundancy
- The result is a sanitised, coder-like summary that loses the original's texture and voice
- Or, when told to write longer, Claude bloats with repetitive meandering over the same emotional beats

### The pattern that works:
- Read the original source text carefully BEFORE rewriting
- Create a Sanderson-style outline: PURPOSE of each scene, what it reveals, what it establishes
- Use the revision guides in `editorial/` as procedure (see `editorial/revision_guide.md` and `editorial/ascent/revision_guide.md` for the proven approach)
- **Additive, not subtractive**: every revision must be LONGER than the original
- Character darkness shown through ACTIONS, not exposition (Corbin is charming; Eszel sounds normal; the Listener is warm)
- Target at least 150% of original word count
- Report word counts before and after each chapter
- Commit after each chapter individually

### Key character rule:
Characters must be **subtle, not on-the-nose**. Don't tell the reader someone is menacing — show them being charming while doing terrible things. This applies to Corbin, Eszel, the Listener, the Dyn, the Apathy.

### The Apathy and the Listener — crucial subtext:
The Apathy says it's "killing us for our own good." This connects to Azell and the Listener Consciousness, the Whole. The Apathy's nature is not mindless destruction — it may be operating under constraints related to the Others' disappearance and what the interstice network truly is. When writing about the Apathy, preserve this ambiguity. "Anthropic traps are to be ignored" is protocol precisely because the Apathy's argument is genuinely compelling.

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
- `source_texts/` — Individual short story files (frameshift.txt, the_other_moon.txt, seeker.txt, the_facilitator.txt, the_utilitaria.txt, starwhisp.txt, the_director.txt, bows_and_arrows_against_the_lightning.txt, the_war_of_all_wars.txt, plus AI-assisted stories as .md files)
- `source_materials/Note .txt` — All 9 original short stories in a single file (no line breaks between stories — use byte offsets if needed)
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

## 7. Workflow Lessons (from Insights Report)

These lessons come from analysis of 9 prior sessions. They are not optional.

### Commit early, commit often
- **Commit after every chapter, page, or major section** — never batch to the end
- Usage limits and API errors WILL interrupt you. If you haven't committed, your work is lost
- For long tasks (novel revision, multi-page builds), each completed unit should be its own commit

### Don't over-rely on sub-agents
- Sub-agents work well for short, independent tasks (build a page while researching another topic)
- Sub-agents FAIL on large sequential tasks — they time out, lose context, and cause cascade errors
- For sequential work (chapter-by-chapter revision, manuscript assembly), work directly in the main context
- Never give a sub-agent a task that will require digesting large amounts of text — context gets dropped
- If you need to read a source text, read it yourself; don't delegate reading to an agent

### Information integration
- The biggest quality problem is context being lost between agents or between sessions
- Before writing about any story, character, or event, re-read the relevant source material directly
- Don't rely on summaries in reference docs alone — they may be out of date or miss crucial subtext
- The connections BETWEEN stories (K'txl across four stories, Seeker's legacy, the Other Moon's journey) are the universe's greatest structural achievement and the easiest thing to miss

### When approaching usage limits
- Prioritise committing and pushing all work-in-progress immediately
- Update reference files (this file, CLAUDE.md, BRAINSTORMING.md) so the next session can pick up
- Write a brief status note about what's done and what's next

---

## 8. What's Been Done vs. What's Left

### Done (as of Session 10):
- Hub page, MSD, battle simulation, science compendium (expanded with warseeds, A/D-spheres, vacuum drives, etc.)
- Story readers: Seeker, Inheritor, Headhunted, Worlds Within, Sixty Percent, Oblivion
- Timeline, codex (extensive entries), worlds & eras (expanded)
- Eszel complete draft assembly (`ESZEL_COMPLETE_DRAFT.md` and `drafts/second_draft/`)
- Ascent second draft (24 chapters in `drafts/ascent_second_draft/`)
- Light mode / reader mode toggle
- Listener easter egg
- Facilitator analysis page with interactive chat
- Utilitaria analysis + Emissary chat page
- AI Analysis comparison page (Facilitator vs Utilitaria vs Apathy)
- Anthropic Trap interactive experience
- Character Threads visualisation
- Reflections of Seeker (in-universe Dyn text)
- Diamond Duster firing sequence visualisation
- Liberation Day warseed activation visualisation
- Orrery interactive visualisation
- Interstice Network 3D map
- Stories index page
- Drafts browser page

### Still needed:
- Front page improvements (intro text, link to original site at ascentuniverse.wordpress.com)
- Starwhisp story reader
- Review/audit existing codex, timeline, and world entries for accuracy against source texts
- Eszel/Listener story reader page (adapt second draft into scene reader format)
- Remaining short story adaptations
- General quality review of existing pages

### Original site:
The Ascent Universe stories are originally published at ascentuniverse.wordpress.com. The companion site should link to this.

See `BRAINSTORMING.md` for the full ranked list of ideas.
