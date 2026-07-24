# 🧠 ML Learning Dashboard

A personal, adaptive ML study tracker. Every day it suggests a topic to read based on your
progress, strengths, and weaknesses; you read it on **aman.ai** / **vinija.ai**; then Claude
quizzes you (MCQ + short answer) and updates the dashboard.

## Daily use

```bash
cd ~/Documents/personalProjects/ml-learning-dashboard
claude          # start Claude Code here
```

Then in Claude Code:

- `/learn` — run today's full session (suggest → read → quiz → update).
- `/learn attention` — study a specific topic instead.
- `/learn quiz recsys-ranking` — re-quiz a topic you want to reinforce.

Open the dashboard anytime:

```bash
./open.sh       # or just double-click index.html
```

## What you'll see
- **Today's suggested topic** with a one-line reason and the reading link.
- **Strengths & weaknesses** — per-category mastery bars driven by your quiz scores.
- **Overall progress**, stat tiles, a full curriculum accordion, and a recent-activity feed.

## Two ways to get quizzed
- **In the dashboard** — click **Quiz** on any topic that has one (foundations + RecSys are seeded). MCQs auto-score; short-answer questions reveal a model answer and you self-grade. Results save in your browser instantly. Click **"⧉ Copy progress for Claude"** to make them durable.
- **With Claude** — `/learn` runs a deeper conversational quiz (Claude grades your short answers), commits progress, and adds the topic to the dashboard quiz bank for next time.

## How it works
The dashboard is a self-contained `index.html` that reads three data files in `data/`.
Claude is the tutor — it reads your progress, picks the topic, quizzes you, and writes the
results back. See `CLAUDE.md` (project rules) and `TUTOR.md` (the session playbook).

```
index.html            dashboard (open in a browser, no server needed)
data/curriculum.js    ~85 topics crawled from aman.ai + vinija.ai
data/progress.js      your learning state
data/log.js           activity feed
TUTOR.md              the /learn session playbook
```

## Sources
- [aman.ai — AI Primers](https://aman.ai/primers/ai/)
- [vinija.ai](https://vinija.ai/)

Add more topics by appending to `data/curriculum.js`.
