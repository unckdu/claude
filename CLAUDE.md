# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-file IT PMO Kanban board, an internal demo/training tool for a fictitious bank. Everything lives in `index.html` (markup, `<style>`, `<script>`). There is no build, lint or test tooling, and no package manager. Node is not installed on the dev machine.

Run it by opening `index.html` directly in a browser. No server is needed.

## Hard constraints (from the original spec)

- Vanilla HTML/CSS/JS only: no frameworks, bundler, npm or CDN. No external fonts or image files; use a system font stack and inline SVG or Unicode for icons.
- No persistence: no localStorage, sessionStorage, IndexedDB or cookies. A refresh must reset the board to the seeded demo data (the UI says so).
- The only backend is FormSubmit's AJAX endpoint (`FORMSUBMIT_ENDPOINT`, at the top of the script). The user's email address must go nowhere else.
- No real UOB logo or trademarks, and nothing that imitates an official UOB system. Use the neutral "IT PMO" text wordmark and a blue palette. The `UOB-ITPM-####` task IDs and the `[UOB IT PMO]` email subject were explicitly specified; leave them as they are unless asked.
- Don't use `!important`, `alert()` or `confirm()`. Delete confirmation is an inline Yes/No toggle on the card.

## Architecture

`state` is the single source of truth: `tasks`, `filters`, `confirmDeleteId`, `nextId`, plus transient drag fields (`dragId`, `dropStatus`).

- **Rendering:** `renderBoard()` rebuilds the whole board and the header summary from `state` through `renderCard()`. Card DOM is built only there. All user-supplied strings go through `escapeHtml()`.
- **Events:** the board uses delegated listeners (click, change, and the drag events) because `renderBoard()` replaces the DOM on every change.
- **Mutations:** `addTask`, `moveTask` and `deleteTask` change `state` and re-render. Drag and drop and the per-card "Move ▸" `<select>` (the keyboard fallback) both go through `moveTask`.
- **Drag highlight:** `dragover` toggles the `drop-target` class directly on the columns rather than re-rendering mid-drag. `dragend` and `drop` re-render.
- **Add flow:** `handleSubmit` validates, then adds the task optimistically, closes the modal and shows a toast. It then calls `notifyNewTask` (FormSubmit), where a failure only produces a warning toast.
- **Dates:** due dates are `YYYY-MM-DD` strings compared lexicographically against `todayISO()`. `seedTasks()` uses `offsetDate()`, so the demo data is always relative to today.
- **Reference data:** `STATUSES`, `PROJECTS`, `CATEGORIES` and `PRIORITIES` drive the form selects, the filters and the validation. Priority colours come from the `p-<Priority>` CSS classes, so a new priority needs a matching class.
