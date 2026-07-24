# CLAUDE.md — ML Learning Dashboard

A personal, Claude-driven ML learning tracker. The dashboard (`index.html`) is the visual layer; the daily "suggest a topic → read → quiz → update" loop runs by chatting with Claude Code via `/learn`.

## How it works
- **Curriculum** is a catalog of topics crawled from **aman.ai** and **vinija.ai** (`data/curriculum.js`).
- **You (Claude)** are the tutor. On `/learn`, follow **`TUTOR.md`** to pick a topic, walk the reading, quiz (MCQ + short answer), grade, and write results back to `data/progress.js` + `data/log.js`.
- The dashboard reads those three JS data files directly (open `index.html` in a browser — no server needed).

## Golden rules
1. **`TUTOR.md` is the session playbook.** Follow it exactly for `/learn`.
2. **Data files are the source of truth.** Only `data/progress.js` and `data/log.js` are mutable; `data/curriculum.js` is a catalog (append new topics, don't churn it).
3. **Never fabricate progress or scores.** Write only what happened in the actual session.
4. **Keep data files valid JS.** A syntax error silently blanks the dashboard.
5. **Ground quizzes in the real reading** (fetch the aman.ai/vinija.ai page if needed).
6. **Strong/weak points must be concrete sub-concepts** — that's what powers the strengths/weaknesses panel and the next-topic suggestion.

## Layout
```
index.html            self-contained dashboard (reads data/*.js) + interactive quiz
TUTOR.md              the daily-session playbook (follow for /learn)
data/curriculum.js    topic catalog (aman.ai + vinija.ai)
data/progress.js      your learning state (mutable, durable source of truth)
data/log.js           activity feed (append-only)
data/quizzes.js       in-dashboard quiz bank (grows each /learn session)
.claude/commands/learn.md   the /learn slash command
open.sh               open the dashboard in your browser
```

## Two ways to get quizzed
1. **In-dashboard** — the "Quiz" button runs an MCQ + self-graded short-answer quiz from `data/quizzes.js`, auto-scores, and saves to the browser's `localStorage` (instant, offline, no Claude). Use the **"⧉ Copy progress for Claude"** button to make those attempts durable in `progress.js`.
2. **Conversational (`/learn`)** — Claude picks the topic, walks the reading, quizzes you (grading short answers intelligently), and commits `progress.js` + `log.js` directly. Also grows `quizzes.js` so the topic becomes self-serve in the dashboard. See `TUTOR.md` → "Syncing dashboard quizzes".

## Extending
- Add a topic: append to `window.MLDASH.curriculum` in `data/curriculum.js`.
- Add a category: add it to `window.MLDASH.categories` (order = display order).
- Add a source site: just use its full URLs in topic `url` fields.
