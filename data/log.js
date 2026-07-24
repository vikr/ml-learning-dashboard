/*
 * log.js — chronological activity feed. Newest entries appended to the end.
 * Claude appends one entry per meaningful event.
 *
 * Each entry:
 *   date      ISO date (YYYY-MM-DD)
 *   type      "suggest" | "reading" | "quiz" | "note"
 *   topicId   curriculum id
 *   topic     display title (denormalized for convenience)
 *   score     quiz score 0-100 (quiz entries only)
 *   detail    short human-readable summary
 */
window.MLDASH = window.MLDASH || {};

window.MLDASH.log = [
  // { date: "2026-07-17", type: "quiz", topicId: "attention", topic: "Attention", score: 90, detail: "MCQ 4/5, short-answer strong on Q,K,V intuition" }
];
