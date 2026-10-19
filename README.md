# IT PMO Board

A single-page Kanban board for a fictitious bank's internal IT PMO. It is a demo/training tool, not an official system.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white)

**Live site:** https://unckdu.github.io/claude/ (available once GitHub Pages is enabled for the repo)

## Features

- Four columns: Backlog, In Progress, Blocked, Done, each with a live task count.
- Drag cards between columns, or use the "Move ▸" control on each card (keyboard friendly).
- Add tasks through a validated form. New tasks get `UOB-ITPM-####` IDs.
- Filter by project, assignee and priority. A summary strip shows totals per status and overdue tasks.
- Cards are colour-coded by priority, with an "Overdue" badge for late tasks.
- Delete uses an inline Yes/No confirmation.
- Optional email notification for new tasks through [FormSubmit](https://formsubmit.co).
- The board lives in memory only. Refreshing the page resets it to the seeded demo data.

## How to install

No install needed. It is vanilla HTML, CSS and JavaScript in one file ([index.html](index.html)), with no build step, dependencies or external resources.

```
git clone https://github.com/unckdu/claude.git
cd claude
```

## How to run

Open `index.html` in a browser. No server is needed.

## Email notifications

Set your address in `FORMSUBMIT_ENDPOINT` at the top of the script in `index.html`. FormSubmit requires a one-time activation: the first submission sends a confirmation email, and notifications are delivered only after you click the link in it. If the call fails, the card is still added and a warning toast appears.

## Deployment

Every push to `main` deploys `index.html` to GitHub Pages through [.github/workflows/deploy.yml](.github/workflows/deploy.yml). In the repo, Settings → Pages → Source must be set to "GitHub Actions".
