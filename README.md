# Ascent Universe

A hard science fiction universe spanning from ~100,000 BCE to beyond 3200 CE, featuring the Dyn occupation of Earth, humanity's liberation, interstellar war, and the existential threat of the Apathy.

## Live Site (GitHub Pages)

The `index.html` in the repository root serves as the GitHub Pages site:

**URL: `https://sammydmartin.github.io/testclaude/`**

The site is an interactive archive themed as an "Annihilator-Class IP Assault Vehicle" interface, featuring:

- **Master Systems Display** (`msd.html`) — Interactive 3D model of the Annihilator-class warship with full technical specifications (uses Three.js, source in `msd/`)
- **Battle Reconstruction** (`battle.html`) — Phase-by-phase tactical reconstruction of the Battle of the Interstice (4 ships vs 100), with animated simulation
- **Threshold** (`story.html`) — The full story of the Battle of Threshold in interactive visual novel format
- **Science Compendium** (`science.html`) — Detailed scientific explanations of all technologies (ABC drives, Diamond Dusters, hyperdiamond armour, etc.)
- **Historical Timeline** (`timeline.html`) — Interactive chronology from Dyn deep past through the Apathy War
- **Intelligence Codex** (`codex.html`) — Classified dossiers on factions, personnel, vessels, and threats
- **Worlds & Eras** (`worlds.html`) — Atmospheric profiles of major settings and epochs

Supporting files: `style.css` (shared styles), `nav.js` (navigation).

## Repository Structure

```
testclaude/
  index.html              # GitHub Pages entry point (hub page)
  style.css               # Shared CSS for all pages
  nav.js                  # Shared navigation JS
  battle.html             # Battle of the Interstice reconstruction
  codex.html              # Intelligence codex (factions, characters)
  msd.html                # Master Systems Display (ship specs)
  science.html            # Science compendium
  story.html              # Threshold story (interactive)
  timeline.html           # Historical timeline
  worlds.html             # Worlds & Eras profiles
  msd/                    # Three.js MSD app (Vite project)
  UNIVERSE_REFERENCE.md   # Comprehensive universe reference document
  README.md               # This file
  source_materials/       # Original and converted source texts
    Ascent (1).docx         # Original Ascent novella (Word)
    Eszel and the Listener (1).pdf  # Original Listener novel (PDF)
    Note .txt               # Original notes file (raw, difficult format)
    ascent_text.txt         # Cleaned plaintext of Ascent
    eszel_text.txt          # Cleaned plaintext of The Listener
    note_seeker_story.txt   # Seeker/Frameshift/The Other Moon stories
    note_timeline.txt       # Timeline + Threshold + Inheritor + Headhunted + more
    note_author_context.txt # Author background/context
  1dregress.py            # Misc script
```

## Key Reference Files

### `UNIVERSE_REFERENCE.md`
The primary reference document for the entire Ascent Universe. Contains:
- Complete synopses of Ascent and The Listener
- Catalogue of all short stories (Seeker trilogy, Inheritor, Headhunted, Sander Reeve, Oblivion, etc.)
- Detailed character profiles
- Faction and polity descriptions (including extensive Utilitaria lore)
- Alien species (Dyn, Tanu, Mimics, Apathy, Men of Nothing)
- Technology catalogue
- Locations and settings
- Thematic analysis
- Critical review
- Author's planned future stories
- Website improvement suggestions

**This is the document to read first** for any AI instance working on this project.

### Source Materials (`source_materials/`)

The original creative works. The `Note .txt` file is particularly tricky: it's ~415KB but only 190 lines, with two enormous lines (140KB and 258KB) containing entire stories pasted as continuous text with tab separators. The cleaned versions (`note_*.txt`) have been split and paragraph-formatted for readability.

Key stories in `note_timeline.txt` (by searching for their titles):
- "Threshold" — Battle of the Interstice (basis for story.html)
- "The Worlds Within" — Tanu/Dra'll deep history + Sander Reeve on Tanu homeworld
- "Headhunted" — Post-liberation Corbin confrontation (2480 CE)
- "Inheritor" — Renee Souvicou origin story (2085 CE)
- "Oblivion" — Far future Utilitaria vignette (3221 CE)
- "Bacchus Prequel" — Apathy attack fragment
- Utilitaria lore essays (search for "A Few Notes on the Utilitaria")

Key stories in `note_seeker_story.txt`:
- "Seeker" — Dyn origins, first spaceflight
- "Frameshift" — Discovery of the Other Moon
- "The Other Moon" — Exploring the Other Moon's capabilities

## For Future Claude Instances

1. **Read `UNIVERSE_REFERENCE.md` first** — it's the comprehensive guide to everything
2. **The `index.html` is the GitHub Pages entry point** — changes here affect the live site at `https://sammydmartin.github.io/testclaude/`
3. **Source materials are in `source_materials/`** — read the cleaned `.txt` files, not the originals (especially `Note .txt` which is nearly unreadable raw)
4. **The site pages are standalone HTML** — each page includes `style.css` and `nav.js`, no build step needed (except the `msd/` directory which is a Vite/Three.js project)
5. **The Seeker trilogy, Inheritor, and other short stories** are complete works available in the note files but not yet represented on the website — these are prime candidates for new content pages
