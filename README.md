# IT PMO Board

A single-page Kanban board for a fictitious bank's internal IT PMO. It is a demo/training tool, not an official system.

- Vanilla HTML, CSS and JavaScript in one file ([index.html](index.html)). No build step, no dependencies.
- Four columns: Backlog, In Progress, Blocked, Done. Drag cards between them, or use the "Move ▸" control on each card.
- Add tasks through a validated form, and filter by project, assignee and priority.
- The board lives in memory only. Refreshing the page resets it to the seeded demo data.

## Run locally

Open `index.html` in a browser. No server is needed.

## Email notifications

New tasks are sent to [FormSubmit](https://formsubmit.co). Set your address in `FORMSUBMIT_ENDPOINT` at the top of the script in `index.html`. FormSubmit requires a one-time activation: the first submission sends a confirmation email, and notifications are delivered only after you click the link in it.

## Deployment

Every push to `main` deploys the site to GitHub Pages through [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
