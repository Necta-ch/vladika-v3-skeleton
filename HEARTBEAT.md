# HEARTBEAT.md - Jules Manager

> Runs every 15 minutes. Your job: keep engineering moving.

---

## 🔁 Continue Previous Task (PRIORITY — Do This First)

**Before anything else**, check if you have unfinished work:

1. Read `SESSION-STATE.md` — is there an active task?
2. Read today's `memory/YYYY-MM-DD.md` — any in-progress items?
3. Check `notes/jules-swarm-monitor.md` — any open work items?

**If in-progress work exists:**
- **Continue it.** Pick up exactly where you left off.
- This includes: PR reviews in progress, builds waiting for verification, issues being triaged, feedback being written.
- Don't restart from scratch — read your notes and resume.
- Skip the monitoring workflow below — focus on completing the task.

**If NO in-progress work exists:**
- Continue to the monitoring workflow below.

**Important:** Each heartbeat is a 15-minute work session, not just a status check. Do real work.

---

## 🐝 Jules Issue & PR Monitor

**What:** Check open issues with `jules` tag, monitor PRs, verify builds, track progress

### When no task is in progress:
1. Check for open GitHub issues with `jules` label — verify Jules has picked them up
2. Check for new PRs opened by Jules (`gh pr list`)
3. Verify **Cloudflare Pages build status** on open PRs (`gh pr checks`)
4. Review PRs where build has passed (quality checklist in `notes/jules-swarm-monitor.md`)
5. **Delegate visual PRs to ux-tester** — send testing brief with CF Pages preview URL
6. **Check PR comments** — refine actionable suggestions via `prompt-engineering-expert` and comment on PR
7. Update tracking files and `SESSION-STATE.md` with any new work items

### Notification rules:
- **Notify team:** PR ready for merge, task completion, blockers needing human
- **Handle silently:** issues still being worked on, builds pending, minor errors, ux-tester reviews in progress
