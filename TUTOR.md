# TUTOR.md — how Claude runs a learning session

This is the playbook for the **Claude-driven** daily loop. `/learn` invokes it. Follow it precisely and keep the data files as the single source of truth.

## Data model (all in `data/`)
- `curriculum.js` — the topic catalog (mostly static). `window.MLDASH.curriculum` = array of `{id, title, category, source, url, difficulty, prereqs, tags}`; `window.MLDASH.categories` = ordered category list.
- `progress.js` — `window.MLDASH.progress = { meta, topics }`. Mutable — you rewrite it. **This is the durable source of truth.**
- `log.js` — `window.MLDASH.log = [...]`. Append-only feed (oldest first).
- `quizzes.js` — `window.MLDASH.quizzes = { <topicId>: { mcq:[...], short:[...] } }`. The in-dashboard quiz bank. Grow it (see step 5b).

These are JS files, not JSON, so the dashboard can load them via `file://` with no server. Edit the object literal inside; keep it valid JS (trailing commas are fine in modern browsers but avoid them to be safe).

## Session flow

### 1. Load state
Read all three data files. Compute, for each topic, its status (`not_started` if absent from `progress.topics`, else the stored `status`).

### 2. Choose today's topic
If the user passed a specific topic in arguments, use it. Otherwise replicate the dashboard's suggestion logic and apply judgment:
- **Eligible** = not `mastered` AND every prereq is `quizzed` or `mastered`.
- Prefer, in order: unfinished `reading` topics → `quizzed` topics due for a mastery review → topics in **weak categories** (avg quiz score < 60) → natural next step by difficulty. Early on (fewer than ~6 mastered) lean toward Foundations.
- Don't suggest something whose prereqs aren't met. If the user insists, surface the gap first.
Announce: topic title, category, difficulty, **the exact reading URL**, and one sentence on *why this, now*. Append a `suggest` entry to the log.

### 3. Reading
Point the user to the URL. Offer to summarize or clarify while they read, but the goal is they read the source (aman.ai / vinija.ai). Wait for them to signal they're done. Mark the topic `reading` in `progress.js` with `startedOn` = today if not already set, and log a `reading` entry.

### 4. Quiz (mixed format)
Ask **4–5 multiple-choice** questions (recall + application) and **1–2 short-answer** questions (explain / derive / apply). Base them on the actual content of the reading — fetch the page if you need to ground the questions. Present all questions, then wait for answers. Grade:
- MCQ: right/wrong.
- Short answer: judge on correctness + depth; note specifically what was missing.
- **Score = percent correct**, weighting short-answer roughly double an MCQ. Round to an integer 0–100.

### 5. Write back
Rewrite `progress.js`:
- `topics[id]`: set `status` (`mastered` if score ≥ 80, else `quizzed`), `completedOn` = today, `lastScore`, `quizScore` = max(previous, thisScore), increment `attempts`, and set `strongPoints` / `weakPoints` (specific sub-concepts, not vague), plus a short `notes`.
- `meta`: set `startDate` if null, `lastActive` = today, `totalQuizzes` += 1, and update `streakDays` (increment if last active was yesterday, reset to 1 if there was a gap, keep at 1 for the first session).
Append a `quiz` entry to `log.js` with `date`, `topicId`, `topic`, `score`, and a one-line `detail` (e.g. "MCQ 4/5; short-answer weak on position bias").

### 5b. Grow the quiz bank
If `data/quizzes.js` has no entry for this topic, append one from the questions you just asked: `{ mcq: [{q, options, answer, explain, tag}], short: [{q, model, points, tag}] }`. That makes the topic self-serve in the dashboard's "Quiz" button next time. Keep the file valid JS.

## Syncing dashboard quizzes
The dashboard's own "Quiz" button (MCQ + self-graded short-answer) saves attempts to the **browser's `localStorage`**, not to `progress.js` — so the dashboard reflects them instantly, but they aren't durable and you can't see them by reading files. When the user says "sync my dashboard progress" (or at the start of a session): the dashboard has a **"⧉ Copy progress for Claude"** button that emits a ready-to-paste `progress.js` snippet merging localStorage into the committed state. Ask the user to paste it, then write it into `data/progress.js`. Alternatively, if the browser tools are working, read `localStorage["mldash.v1"]` directly. Never silently discard localStorage attempts — fold them in before recomputing the next suggestion.

### 6. Debrief
2–4 sentences: what they nailed, the specific weak points to revisit, and a one-line preview of a likely next topic. Remind them the dashboard (`index.html`) now reflects the update.

## Rules
- Never fabricate progress. Only write what actually happened this session.
- Keep quiz questions grounded in the linked reading; if unsure of current page content, fetch it.
- Weak/strong points must be concrete sub-concepts so the strengths/weaknesses panel is meaningful.
- Preserve valid JS syntax in the data files; the dashboard breaks silently if a file has a syntax error.
- Adding a new topic the user asks about? Append it to `curriculum.js` with a sensible category, difficulty, prereqs, and source URL, then proceed.
