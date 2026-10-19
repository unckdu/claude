---
description: Security-scan the project, then push it to GitHub with a README, About section, Pages site and CI/CD
argument-hint: <github-owner/repo> [branch]
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Publish this project to GitHub. GitHub info from the user: `$ARGUMENTS`

If `$ARGUMENTS` is empty or lacks an owner/repo, ask the user for the repository (`owner/repo`) and branch (default `main`) before doing anything else. Never guess the repo.

Work through the steps in order. The security scan comes first because a push cannot be fully undone.

## 1. Security scan (before anything leaves the machine)
- Search every file that would be committed for secrets and personal data: API keys, tokens, passwords, private keys, `.env` files, credentials, email addresses, internal hostnames, and absolute local paths.
- Check `git status` and `.gitignore`. Anything sensitive or irrelevant (`.env*`, `node_modules/`, logs, `.claude/settings.local.json`, build output) must be ignored, not committed. Create a `.gitignore` if one is missing.
- For web code, also check for: external scripts, fonts or images loaded from third parties; `fetch`/XHR calls to unexpected hosts; `eval`, `innerHTML` with unescaped input; and use of localStorage/cookies if the project forbids them.
- List every network endpoint found. Confirm each is intended (for example, the FormSubmit endpoint named in CLAUDE.md). Placeholder addresses are fine. A real personal email address in the code is a finding.
- Report the findings to the user. If anything is sensitive or unexpected, **stop and ask** before continuing. Do not push until the scan is clean or the user accepts the findings.

## 2. Push the code
- If the directory is not a git repo, run `git init -b <branch>`. Add the `origin` remote only if it is missing, and never overwrite an existing one without asking.
- Commit with a clear message, then `git push -u origin <branch>`. Never force-push.

## 3. README
- Create or update `README.md` from what the code actually does. Read CLAUDE.md and the source first, and do not invent features.
- Include: a title and one-line description; the screenshot from step 3b; **tech badges** (shields.io badges for the languages and tools actually used); features; **How to install** (prerequisites and setup, or "no install needed" if there are none); **How to run** (exact commands, or the file to open); how deployment works; and the live Pages link once known.
- Keep any accurate existing content, and fix whatever is stale.

## 3b. Screenshot for the README (Playwright MCP)
- Needs the Playwright MCP server (`.mcp.json`, which needs Node.js). If its tools (`mcp__playwright__*`) are not available, say so, skip this step, and note it in the final report. Don't fake a screenshot.
- Open the page with `browser_navigate`: a `file:///` URL of `index.html` for a static site, or the local dev server for anything else. Wait for it to render, then check `browser_console_messages` for errors.
- Use `browser_take_screenshot` at desktop width (about 1280px wide, full page) and save it to `docs/screenshot.png`. For a responsive app, also capture a mobile width (about 390px) as `docs/screenshot-mobile.png`.
- Look at each image before using it. It must show the app, not an error page or a blank page.
- The screenshot must contain only the demo data. Make sure no real email address, token, personal name or local path is visible. If one is, fix the page state and capture again.
- Embed it in the README under the title, with alt text: `![App screenshot](docs/screenshot.png)`. Commit the `docs/` images with the README.
- The Pages workflow uploads only the site files, so `docs/` stays out of the deployed site.
- On later runs, replace the existing screenshot so the README doesn't show a stale UI.

## 4. CI/CD with GitHub Actions
- Create or update `.github/workflows/deploy.yml` so that every push to the default branch deploys to GitHub Pages: `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact` and `actions/deploy-pages`, with minimal `permissions` (`contents: read`, `pages: write`, `id-token: write`).
- Stage only the files the site needs into the upload folder. Never upload the whole repo, `.claude/`, or `CLAUDE.md`.
- If the project has tests or a linter, add a job that runs them before deployment.

## 5. GitHub Pages
- Needs `gh` (the GitHub CLI) signed in with `gh auth status`. If `gh` is missing or not signed in, tell the user the exact manual steps (Settings → Pages → Source: GitHub Actions) and continue with the rest.
- Enable Pages with the Actions build type: `gh api -X POST repos/<owner>/<repo>/pages -f build_type=workflow`. If Pages already exists, update it with `-X PUT` instead.
- Watch the workflow with `gh run watch` and confirm it succeeded. Get the live URL from `gh api repos/<owner>/<repo>/pages --jq .html_url`.

## 6. About section
- Set the description, topics (matching the tech badges) and the Pages link as the homepage:
  `gh repo edit <owner>/<repo> --description "<one line>" --homepage "<pages-url>" --add-topic <topic>` (repeat `--add-topic` per topic).
- Put the Pages link in the README too, and push that change.

## 7. Final report
Give the user: the repo URL, the live Pages URL, the workflow status, the security-scan result, and anything left for them to do by hand. State plainly any step that was skipped or failed.

Rules:
- Pushing, enabling Pages and editing the repo About section all publish things. Do them only for the repo the user named.
- Don't send the user's email address or any secrets anywhere except an endpoint already in the project's code.
