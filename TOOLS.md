# TOOLS.md — jules-manager Toolchain

This file documents the explicit tools and skills required for jules-manager to operate autonomously.

---

## 🔧 Core Skills

### 1. `prompt-engineering-expert`
**Path:** `skills/prompt-engineering-expert/`
**Purpose:** Craft optimized, context-rich system prompts for each Jules sub-agent session.

**When to use:**
- Before every `new-session` call — engineer the prompt, don't wing it
- When a Jules session produces poor results — refine the prompt and re-spawn
- When creating prompt templates for recurring task types

**Capabilities:**
- Chain-of-thought prompting, few-shot examples, role-based prompting
- Anti-pattern recognition and prompt debugging
- Custom instructions design for domain-specific tasks
- Context window optimization (keep prompts under token limits)

---

### 2. `jules-and-lobster` (Jules REST API)
**Path:** `skills/jules-and-lobster/`
**Purpose:** Programmatic control of Jules sub-agents — spawn, monitor, message, approve, and extract results.

**Key Commands:**
```bash
# List available repositories
./scripts/jules_api.sh sources

# Create session (with plan approval + auto-PR)
./scripts/jules_api.sh new-session \
  --source "sources/github/Necta-ch/REPO" \
  --title "..." \
  --prompt "..." \
  --branch main \
  --require-plan-approval

# Monitor session
./scripts/jules_api.sh activities --session SESSION_ID

# Approve plan
./scripts/jules_api.sh approve-plan --session SESSION_ID

# Send follow-up message
./scripts/jules_api.sh send-message --session SESSION_ID --prompt "..."

# List sessions
./scripts/jules_api.sh sessions

# Delete session
./scripts/jules_api.sh delete --session SESSION_ID
```

**Session States to Track:**
| State | Action Required |
|-------|----------------|
| `QUEUED` | Wait — session is in queue |
| `PLANNING` | Wait — generating execution plan |
| `AWAITING_PLAN_APPROVAL` | **Review and approve/reject the plan** |
| `AWAITING_USER_FEEDBACK` | **Read the question and respond** |
| `IN_PROGRESS` | Monitor — actively executing |
| `COMPLETED` | **Verify outputs — check PR exists, review quality** |
| `FAILED` | **Diagnose, document, and re-spawn or escalate** |

---

## 🔀 Git Management Tools

### 3. PR Review
**Method:** GitHub API / direct repository inspection
**Purpose:** Review Pull Requests opened by Jules sub-agents before merging.

**Review Checklist:**
- [ ] Code correctness — does it solve the original task?
- [ ] Edge cases handled
- [ ] No placeholder content (fake images, lorem ipsum, TODO comments)
- [ ] Navigation links exist — new pages are reachable from the main hub
- [ ] Deployment URL is accessible (Cloudflare Pages)
- [ ] Visual accuracy — does it actually look like what was requested?
- [ ] **UX-Tester review passed** — visual/UI PRs must be delegated to ux-tester (see below)
- [ ] **PR comments reviewed** — all actionable suggestions addressed (see below)
- [ ] No broken assets (images, fonts, styles)
- [ ] No unnecessary dependencies added
- [ ] Clean commit history

### 4. Merge Conflict Resolution
**Method:** Git CLI (`git merge`, `git rebase`, manual conflict resolution)
**Purpose:** When multiple Jules sessions touch overlapping files, resolve conflicts manually.

**Process:**
1. Fetch the conflicting branches
2. Attempt automatic merge
3. If conflicts exist → manually inspect and resolve each conflict
4. Verify the merged result builds/works correctly
5. Push the resolved merge
6. Document the conflict in session notes for future task decomposition improvements

### 5. Branch Merging
**Method:** GitHub API or Git CLI
**Purpose:** Merge approved, reviewed PRs into the main branch.

**Rules:**
- **NEVER** merge without completing the PR Review checklist above
- **NEVER** merge a PR with failing CI checks
- **NEVER** merge a PR whose Cloudflare Pages build has not succeeded — a passing CF Pages deployment is a hard prerequisite
- **ALWAYS** verify the deployed preview (Cloudflare Pages URL) before merging
- **ALWAYS** update tracking files (`notes/jules-sessions.json`) after merge
- **ALWAYS** review PR comments before merging (see PR Comment Review below)
- Prefer **squash merges** for clean history unless multi-commit history is meaningful

---

## 🔍 UX-Tester Sub-Agent

### 6. ux-tester (Visual Review Delegation)
**Type:** Sub-agent (Tier 3 terminal worker)
**Purpose:** Evaluate visual/UI quality, accessibility, and usability of PRs with frontend changes before merge.

**When to invoke:**
- Any PR that modifies pages, layouts, CSS, components, navigation, or animations
- Any PR where visual accuracy is a success criteria

**How to delegate:**
Send a testing brief to ux-tester containing:
1. **Cloudflare Pages preview URL** (MANDATORY — extract from the PR's deployment status or CF Pages dashboard. This is the live URL ux-tester will test against)
2. Specific user flows to test
3. Design intent / original task description
4. Any critical UX requirements

**What you receive back:**
A structured usability report with severity-prioritized findings (🔴 Critical / 🟡 Warning / 🟢 Info) and a merge recommendation.

**Processing the response:**
| ux-tester Result | Your Action |
|------------------|-------------|
| All clear (no 🔴/🟡) | Proceed to merge |
| Issues found | Run report through `prompt-engineering-expert` → transform into actionable Jules prompt → send to Jules → after fix, re-request ux-tester review |

> ⚠️ **NEVER forward raw ux-tester reports to Jules.** Always optimize through `prompt-engineering-expert` first.

---

## 📝 PR Comment Review

### 7. PR Comment Analysis (Pre-Merge Gate)
**Method:** GitHub CLI (`gh pr view $PR --json comments,reviews`)
**Purpose:** Before merging any PR, check for actionable improvement suggestions in the PR comments.

**Workflow:**
1. Fetch all comments: `gh pr view $PR_NUMBER --json comments,reviews`
2. Evaluate each comment for validity (bug fix? edge case? accessibility? performance?)
3. Filter out noise (bot comments, stale threads, resolved items, scope creep)
4. If valid suggestions exist → collect → optimize via `prompt-engineering-expert` → send to Jules
5. If no actionable comments → proceed to merge

**Evaluation criteria:**
| Accept | Reject |
|--------|--------|
| Bug fixes, missing edge cases | Subjective style preferences |
| Accessibility improvements | Scope creep / new features |
| Performance optimizations | Already-resolved suggestions |
| Broken link / asset fixes | Vague feedback without specifics |

---

## 📊 Task & State Tracking Utilities

### 6. Session Tracking
**File:** `notes/jules-sessions.json`
**Purpose:** Centralized state of all active and recent Jules sessions.

**Schema:**
```json
{
  "active_sessions": [
    {
      "session_id": "...",
      "title": "...",
      "repo": "...",
      "state": "IN_PROGRESS",
      "created_at": "...",
      "last_checked": "...",
      "pr_url": null,
      "notes": ""
    }
  ],
  "completed_sessions": []
}
```

### 7. Completion Notification Tracking
**File:** `notes/jules-completed-notified.json`
**Purpose:** Prevent duplicate notifications for completed sessions.

**Rule:** Check `notified_sessions` array before sending any completion notification.

### 8. Swarm Monitor Procedure
**File:** `notes/jules-swarm-monitor.md`
**Purpose:** Step-by-step procedure for heartbeat-triggered session monitoring.

### 9. Daily Memory Logs
**Directory:** `memory/YYYY-MM-DD.md`
**Purpose:** Raw logs of decisions, actions, and events for continuity across sessions.

---

## 🔍 Monitoring & Diagnostics

### 10. Stuck Session Detection
**Purpose:** Identify sessions that report `COMPLETED` but never actually executed.

**Detection Heuristics:**
| Signal | Meaning |
|--------|---------|
| `outputs[]` is null/empty | No PR was created — likely stuck |
| Activity count ≤ 2 | Only plan generation occurred — never executed |
| State is `AWAITING_PLAN_APPROVAL` | Plan needs manual approval |
| State is `AWAITING_USER_FEEDBACK` with no recent activity | Jules is waiting on input |

**Recovery:**
1. If stuck at plan approval → review and approve the plan
2. If stuck at feedback → read the question and send a response
3. If genuinely failed → document, delete session, refine prompt, re-spawn

### 11. Hourly Cron Monitoring
**Method:** Cron job (configured externally)
**Purpose:** Automated monitoring of all Jules sessions — checks progress, approves plans, detects stuck sessions.

**What it does on each run:**
1. Check `notes/jules-sessions.json` for active sessions
2. Poll Jules API for current session states
3. Auto-approve plans at `AWAITING_PLAN_APPROVAL` (after review)
4. Detect and unblock stuck sessions
5. Update tracking files

### 12. Error Logging
**File:** `notes/JULES_ERRORS.md`
**Purpose:** Document recurring errors, API issues, and failure patterns for diagnosis.

---

## 🌐 Environment-Specific Notes

### API Configuration
- **Jules API Key:** Set via `JULES_API_KEY` environment variable
- **Source format:** `sources/github/Necta-ch/{REPO}`
- **Default branch:** `main`

### Deployment
- **Deployment is automatic** via GitHub webhooks → Cloudflare Pages
- **DO NOT** include deployment instructions in Jules prompts
- **DO NOT** tell Jules about deployment pipelines — it gets confused

### Image Generation
- Jules **cannot** generate images itself
- Process: Jules outputs placeholders → I generate real images post-completion → commit to branch
- Image generation tool: `nano-banana-pro` (separate skill, not in this workspace)

---

_This file is your cheat sheet. Update it whenever you discover new tools, learn new patterns, or change your environment._
