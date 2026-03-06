# Eszel and the Listener — Revision Procedures

## Core Principle

**Additive, not subtractive.** Every revision pass must result in a longer manuscript, not a shorter one. Do not cut original content unless it directly contradicts the story's internal logic. If something seems weak, expand and improve it — don't delete it.

## Before You Touch Anything

1. **Read the original source material** (`ESZEL_COMPLETE_DRAFT.md`) in full
2. **Understand the point** of each scene before rewriting it — what does it accomplish narratively? What does it reveal about the characters?
3. **Read the editorial materials** in `/editorial/` — character analyses, structural notes, dialogue notes, chapter-by-chapter breakdown
4. **Understand the dual-narrator structure**: Eszel's first-person sections interleave with Hansun's third-person frame narrative (the interrogation aboard the Invincible)

## Character Rules

### Eszel

- **Surface presentation**: Plucky, likeable, relatable young woman. Her first-person narration should sound like a normal, engaging protagonist — curious, brave, sometimes funny, sometimes vulnerable
- **The darkness is in the evidence, not the voice**: Her psychopathy is revealed through what she *does* (walks away from 200 people without agonising, lies fluently and strategically, manipulates Hansun, feels connections "fade" too quickly) — NOT through cold or clinical internal narration
- **She does not know she's abnormal**: Her narration shouldn't read as self-aware psychopathy. She genuinely doesn't understand why she isn't more afraid, more grief-stricken. The Listener has to point this out to her
- **The reader should like her** and only gradually realise something is off. The interrogation scenes (where we see her from the outside through Hansun) provide the counterpoint
- **Key tells to preserve**: The speed with which grief fades, the ease of lying, understanding people "too well", the gap between what she says she feels and what she does

### The Listener

- **Warm and charming in manner**: Surprisingly warm smile, patience, gentle humour, "as if he had all the time in the world and then some"
- **The creepiness is structural, not behavioural**: He's been in her head since birth, shaped her, guided her choices, and he's connected to the Whole — an incomprehensibly ancient planetary entity. That's what's unsettling, not how he acts
- **He should feel like a friend** — that's what makes it disturbing. He's genuinely kind to her, and she genuinely trusts him, and none of that changes what he is
- **The web vision**: When he shows her "everything", it's terrible and beautiful and overwhelming — not sinister

### Hansun

- **The audience surrogate**: His suspicion of Eszel mirrors what the reader should be feeling
- **Competent but outmatched**: He's a good interrogator who can tell something is wrong, but Eszel consistently gets the better of him
- **Not a villain**: He's decent, professional, genuinely concerned. His tremor shows he's also traumatised

### Aumonier

- **Ambitious, not cartoonishly so**: His desire to exploit the Other Moons should feel like a natural military response, not moustache-twirling. He's doing his job
- **Sharp and capable**: The crater scene establishes him as scientifically literate and strategically minded

## Scene-by-Scene Checklist

For each chapter revision:

- [ ] Have I read the original source material for this section?
- [ ] Is the revised version *longer* than the original?
- [ ] Does Eszel's narration sound likeable and natural?
- [ ] Is the darkness shown through actions/evidence rather than stated in narration?
- [ ] Are all the original's specific details preserved (names, places, technical terms, worldbuilding)?
- [ ] Does the prose improvement justify any changes from the original wording?
- [ ] Have I kept the interrogation frame structure intact?
- [ ] Does the chapter flow naturally from the previous one?

## What "Additive" Means in Practice

- **Restore cut content**: If previous revisions removed scenes, dialogue, worldbuilding, or character moments from the original, put them back
- **Expand thin sections**: Where the original was sparse, add texture — sensory detail, character thought, environmental description
- **Keep prose improvements**: Good line-level rewriting from previous passes should be preserved. The goal is to combine the original's completeness with improved prose
- **Add new material only where gaps exist**: If a transition feels abrupt or a character's motivation is unclear, add bridging material

## What NOT to Do

- Do not cut scenes because they seem "slow" or "unnecessary" — they're doing narrative work
- Do not make Eszel's narration sound cold, clinical, detached, or self-aware about her own abnormality
- Do not make the Listener sinister, threatening, or overtly manipulative in manner
- Do not compress dialogue — let conversations breathe
- Do not remove worldbuilding details (ship names, place names, technical descriptions, faction references)
- Do not summarise where the original dramatised
- Do not add docstrings or meta-commentary about the story's themes

## File Structure

```
drafts/second_draft/
  ch00_the_whole.md          — Opening paragraph (the Whole as foreign body)
  ch01_the_crater.md         — Hansun prologue, Aumonier crater dialogue
  ch02_interrogation_childhood.md — First interrogation, Eszel's childhood
  ch03_voyage_elevator.md    — Voyage to Kailash, Jonathan classroom, elevator scene
  ch04_arrival_baselife.md   — Arrival, base life, father's research, the storm
  ch05_first_contact.md      — First contact with Mimics in the karst
  ch06_the_choice.md         — The Whole revealed, Eszel's choice
  ch07_departure_disaster.md — Leaving the base, destruction of Walker Base
  ch08_the_trek.md           — The trek, Hansun interrogation, "good man" passage
  ch09_the_listener.md       — Meeting the Listener on the surface
  ch10_epilogue.md           — Hansun's suspicions, Other Moons, Eszel in cryo

editorial/
  structural_analysis.md     — Overall structure and pacing notes
  character_eszel.md         — Eszel character analysis
  character_hansun.md        — Hansun character analysis
  character_aumonier.md      — Aumonier character analysis
  character_minor.md         — Minor character notes
  dialogue_notes.md          — Dialogue style and voice notes
  chapter_by_chapter.md      — Per-chapter editorial notes
  revision_guide.md          — This document
```

## Revision Workflow

1. Pull the latest from the working branch
2. Read the original source for the target chapter
3. Read the current draft version
4. Read relevant editorial notes
5. Revise according to the rules above
6. Verify word count is equal to or greater than the previous version
7. Commit with a clear message describing what was changed
8. Push to the working branch
