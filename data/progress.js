/*
 * progress.js — your learning state. Claude (the tutor) reads and rewrites this.
 *
 * meta.startDate     ISO date you began
 * meta.lastActive    ISO date of last session
 * meta.streakDays    consecutive-day streak
 * meta.totalQuizzes  lifetime quiz count
 *
 * topics[<id>]:
 *   status       "reading" | "quizzed" | "mastered"   (absent id => "not_started")
 *   startedOn    ISO date reading began
 *   completedOn  ISO date last quizzed
 *   quizScore    best quiz score 0-100
 *   lastScore    most recent quiz score 0-100
 *   attempts     number of quiz attempts
 *   strongPoints [] sub-concepts you nailed
 *   weakPoints   [] sub-concepts to revisit
 *   notes        free-form tutor notes
 *
 * Mastery rule of thumb: quizScore >= 80 => "mastered".
 */
window.MLDASH = window.MLDASH || {};

window.MLDASH.progress = {
  meta: {
    startDate: null,
    lastActive: null,
    streakDays: 0,
    totalQuizzes: 0
  },
  topics: {
    // "attention": { status: "mastered", quizScore: 90, lastScore: 90, attempts: 1,
    //                startedOn: "2026-07-17", completedOn: "2026-07-17",
    //                strongPoints: ["scaled dot-product"], weakPoints: ["multi-head math"], notes: "" }
  }
};
