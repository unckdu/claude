/*
 * Source of truth for the IT security briefing popup on the v2 site.
 *
 * This is NOT a Claude Code hook: those only run when Claude uses tools and
 * cannot open a dialog in a web page. The popup itself is implemented in
 * v2/index.html (search for "IT security briefing popup"), which has no build
 * step and cannot import this file. When you change the values below, update
 * BRIEFING_DELAY_MS and the <dialog id="briefing"> markup in v2/index.html to match.
 */
module.exports = {
  delayMs: 10000,
  title: "IT Security Briefing",
  when: "Town Hall, Wednesday, 10:00 AM",
  note: "Attendance is mandatory",
  showOncePerPageLoad: true
};
