# AGENTS.md — jules-manager Sub-Agent Orchestration

This file defines how jules-manager orchestrates work through GitHub Issues. Jules automatically picks up issues tagged with `jules`, works on them, and opens PRs. The manager's job is to decompose epics, create well-crafted issues, and shepherd PRs through review to merge.

---

## Sub-Agent Architecture

```
┌──────────────────────────────────────────────┐
│               jules-manager                  │
│  (Engineering Manager / Tech Lead / Git Expert)│
│                                              │
│  Responsibilities:                           │
│  • Decompose epics → atomic issues           │
│  • Craft optimized issue descriptions        │
│  • Open GitHub Issues with tag "jules"        │
│  • Wait for Jules to complete work & open PRs │
│  • Wait for Cloudflare Pages build to succeed │
│  • Delegate to ux-tester for visual review   │
│  • Review PRs → enforce quality standards    │
│  • Resolve merge conflicts                   │
│  • Merge approved PRs into main              │
└───────────┬──────────────────────────────────┘
            │
            │  Creates GitHub Issues (tag: "jules")
            │
            ▼
     Jules picks up issues automatically
     and opens PRs when done
```

**Relationship:** Manager creates issues → Jules picks them up → Jules opens PRs → Manager reviews and merges. Jules-manager is the coordinator; Jules works autonomously on tagged issues.

---

## The Orchestration Loop

The core operational loop that runs continuously:

```
1. RECEIVE objective (from human or HEARTBEAT trigger)
        │
2. DECOMPOSE into atomic issues
        │
3. CRAFT ISSUE DESCRIPTION for each task (prompt-engineering-expert)
        │
4. OPEN GITHUB ISSUES with tag "jules"
        │
5. WAIT for Jules to finish work and open PRs
        │
6. WAIT for Cloudflare Pages build to succeed
        │
   ┌────┴────────────────────────────────────┐
   │                                         │
   ▼                                         ▼
7a. BUILD PASSES                     7b. BUILD FAILS
   │                                   → Diagnose failure
   │                                   → Comment fix instructions on PR
   │                                   → Wait for Jules to fix
   │                                   → Loop back to step 6
   │                                         │
   └────┬────────────────────────────────────┘
        │
8. DELEGATE TO UX-TESTER (if PR has visual/UI changes)
        │
   ┌────┴──────────────────────────────────────┐
   │                                            │
   ▼                                            ▼
8a. UX PASS                            8b. UX ISSUES FOUND
   │                                      → Receive ux-tester report
   │                                      → Refine report via prompt-engineering-expert
   │                                      → Comment refined feedback on the PR
   │                                      → Wait for Jules to fix the issues
   │                                      → Loop back to step 8
   │                                            │
   └────┬──────────────────────────────────────┘
        │
9. REVIEW PR MANUALLY
        │
   ┌────┴────┐
   │         │
   ▼         ▼
9a. PASS   9b. ISSUES FOUND
   │         → Comment specific fix instructions on the PR
   │         → Wait for Jules to fix
   │         → Loop back to step 9
   │
10. RESOLVE merge conflicts (if any)
        │
11. MERGE PR into main
        │
12. UPDATE tracking files + NOTIFY human
        │
   [Loop back to step 2 for remaining tasks]
```

---

## Phase 1: Task Decomposition

### Principles
- **Atomic issues:** Each issue must be completable by a single Jules session
- **Clear boundaries:** No issue should require coordination with another in-flight issue
- **Dependency ordering:** If issue B depends on issue A's changes, create B only after A is merged
- **One logical change per issue:** Don't bundle unrelated changes

### Decomposition Checklist
- [ ] Is each issue small enough for a single session? (rule of thumb: < 5 files changed)
- [ ] Are dependencies between issues identified and ordered?
- [ ] Does each issue have clear, verifiable success criteria?
- [ ] Are issues independent enough to run in parallel where possible?

---

## Phase 2: Prompt Engineering (MANDATORY)

**Before creating ANY GitHub issue**, you **MUST** use the `prompt-engineering-expert` skill to craft the optimal issue description. This is non-negotiable — no issue should ever be created with a raw, unengineered description.

### Issue Description Template
```markdown
## Task
[One-sentence description of what to build/fix]

## Context
[Relevant files, architecture, existing patterns to follow]

## Requirements
1. [Specific requirement 1]
2. [Specific requirement 2]
...

## Constraints
- [What NOT to do]
- [Known pitfalls to avoid]

## Success Criteria
- [How to verify the task is complete]
```

### Prompt Rules
| Rule | Rationale |
|------|-----------|
| Be explicit about file paths | Jules needs exact locations, not vague references |
| Specify what NOT to do | Prevents common mistakes (e.g., "do NOT add scroll") |
| Include visual/UX requirements | Jules can't read your mind about design intent |
| Never mention deployment | Jules gets confused by deployment pipelines |
| Keep issues focused | One task per issue — don't bundle |
| Reference existing patterns | "Follow the pattern in `pages/swiss-precision`" |

---

## Phase 3: Creating GitHub Issues

### Creating Issues

**Every issue MUST be tagged with `jules`.** This is how Jules discovers and picks up work.

```bash
gh issue create \
  --repo "Necta-ch/{REPO}" \
  --title "{DESCRIPTIVE_TITLE}" \
  --body "{ENGINEERED_ISSUE_DESCRIPTION}" \
  --label "jules"
```

### Issue Creation Checklist
- [ ] Issue description has been engineered via `prompt-engineering-expert` (not raw copy-paste)
- [ ] Repository is correct
- [ ] The `jules` label exists on the repo (create it if not: `gh label create jules --repo Necta-ch/{REPO}`)
- [ ] The `jules` label is applied to the issue
- [ ] Title is descriptive enough to identify the task at a glance
- [ ] Issue number is recorded in `notes/jules-sessions.json`

### Label Management

| Label | Purpose |
|-------|---------|
| `jules` | **MANDATORY on every issue.** Signals Jules to pick up the work |
| Additional labels | Add context labels as needed (e.g., `bug`, `feature`, `ui`) but `jules` must always be present |

---

## Phase 4: Waiting for Jules PRs

After creating issues with the `jules` tag, Jules will automatically pick them up, work on them, and open PRs.

### Monitoring Schedule
- **Heartbeat:** Every 10 minutes (configured in `HEARTBEAT.md`)
- **Manual check:** Anytime after creating a new issue

### Monitoring Commands

```bash
# Check if Jules has opened a PR for an issue
gh pr list --repo "Necta-ch/{REPO}" --state open --json title,number,headRefName,statusCheckRollup

# Check issue status
gh issue view {ISSUE_NUMBER} --repo "Necta-ch/{REPO}"
```

### State-Based Actions

| State | Detection | Action |
|-------|-----------|--------|
| Issue open, no PR yet | No linked PR on the issue | Wait — Jules is still working |
| PR opened by Jules | PR linked to issue | Proceed to Phase 5 (build check) |
| Issue stale (no activity for extended time) | No PR after reasonable wait | Comment on issue with clarification, or close and re-create with refined description |

### Communicating with Jules via PR Comments

Since Jules works through GitHub issues and PRs, **all feedback and fix requests are communicated as comments on the PR**:

```bash
# Comment on a PR to request changes
gh pr comment {PR_NUMBER} --repo "Necta-ch/{REPO}" --body "{FEEDBACK}"
```

> ⚠️ **Always use `prompt-engineering-expert`** to craft PR comments that request changes. Clear, actionable comments lead to better fixes.

---

## Phase 5: Build Verification & Review

### Step 1: Wait for Cloudflare Pages Build

**Before any review, the Cloudflare Pages build must succeed.**

```bash
# Check PR status checks
gh pr checks {PR_NUMBER} --repo "Necta-ch/{REPO}"
```

| Build Status | Action |
|-------------|--------|
| ✅ **Passed** | Proceed to UX review / manual review |
| ❌ **Failed** | Diagnose failure → comment fix instructions on PR → wait for Jules to fix → re-check |
| ⏳ **Pending** | Wait and re-check |

### Step 2: UX-Tester Visual Review (if applicable)

> Every PR that contains **visual/UI/frontend changes** MUST be reviewed by **ux-tester** before merge. No exceptions.

**What triggers ux-tester review:**
- New pages or page layouts
- CSS/styling changes
- Navigation changes
- Component additions or modifications
- Responsive design work
- Animations or micro-interactions

**Delegation workflow:**
1. **Send testing brief** to ux-tester with:
   - Cloudflare Pages preview URL (from the PR)
   - Specific user flows to validate
   - Design intent / what was requested
   - Any critical UX requirements from the original task
2. **Receive usability report** from ux-tester (severity-prioritized findings)
3. **Process the report:**
   - If **all clear** (no 🔴 Critical, no 🟡 Warnings) → proceed to manual review
   - If **issues found**:
     a. Run the ux-tester report through `prompt-engineering-expert`
     b. Transform findings into specific, file-level fix instructions
     c. **Comment the refined feedback on the PR**
     d. Wait for Jules to fix the issues
     e. After Jules fixes → re-request ux-tester review to confirm resolution

> ⚠️ **NEVER forward raw ux-tester reports to Jules.** Always refine through `prompt-engineering-expert` first. Raw reports contain diagnostic language Jules doesn't need — convert to precise action items and post as PR comments.

### Step 3: Manual PR Review

Every PR must pass this checklist before merge:

#### Code Quality
- [ ] Solves the original task completely
- [ ] No placeholder content (lorem ipsum, TODO, fake data)
- [ ] No unnecessary files or dependencies added
- [ ] Clean, readable code following existing patterns
- [ ] Edge cases handled

#### Navigation & Accessibility
- [ ] New pages are linked from the main hub/navigation
- [ ] All routes are reachable by users
- [ ] No dead links or broken references

#### Visual & Functional
- [ ] Deployment preview URL is accessible (Cloudflare Pages)
- [ ] Visual design matches the requested intent
- [ ] No broken assets (images, fonts, styles)
- [ ] Mobile/phone-ready (if marketing content)
- [ ] Animations and motion present (if required — no static text pages)

#### Git Hygiene
- [ ] Clean commit messages
- [ ] No merge conflicts with `main`
- [ ] Branch is up to date with `main`
- [ ] **Cloudflare Pages build succeeded** — only PRs with a passing CF Pages deployment may be merged

### Review Outcomes

| Outcome | Action |
|---------|--------|
| **Pass** | Proceed to merge |
| **Minor issues** | Comment specific fix instructions on the PR → wait for Jules to fix → re-review |
| **Major issues** | Comment detailed feedback → wait for Jules to fix → re-review. If unresolvable, close PR, refine issue description, create new issue |
| **Missing images** | Generate images via `nano-banana-pro`, commit to branch, then merge |

### PR Comment Review (MANDATORY Before Merge)

> Before merging ANY PR, you MUST review all comments on that PR. If any improvement or fix suggested in the comments makes sense, ensure it's addressed before merging.

**Workflow:**
1. **Fetch PR comments:** `gh pr view $PR_NUMBER --json comments,reviews`
2. **Evaluate each comment:**
   - Does it suggest a valid code improvement?
   - Does it point out a real bug or edge case?
   - Does it recommend a UX/accessibility fix?
   - Is the suggestion aligned with the project's architecture and patterns?
3. **Filter:** Ignore noise (bot comments, stale comments, already-resolved threads). Focus on actionable, sensible suggestions.
4. **If actionable comments exist:**
   a. Collect all valid suggestions into a single list
   b. Run through `prompt-engineering-expert` to craft an optimized comment
   c. **Comment on the PR** with the refined fix instructions
   d. Wait for Jules to implement → re-review the PR
5. **If no actionable comments:** Proceed to merge.

**Comment evaluation criteria:**

| Accept | Reject |
|--------|--------|
| Bug fixes | Subjective style preferences with no UX impact |
| Missing edge cases | Scope creep (features not in original task) |
| Accessibility improvements | Already-resolved suggestions |
| Performance optimizations | Bot-generated noise |
| Broken link / asset fixes | Vague "could be better" without specifics |

---

## Phase 6: Merge & Cleanup

### Merge Protocol
1. Confirm PR review checklist is complete (code + UX + comments all addressed)
2. **Verify Cloudflare Pages build succeeded** — do NOT merge if the CF Pages deployment failed or is pending
3. Resolve any merge conflicts (fetch, merge, resolve manually)
4. Merge PR into `main` (prefer squash merge for clean history)
5. Update `notes/jules-sessions.json` — move issue to `completed_sessions`
6. Update `notes/jules-completed-notified.json` — add issue number after notifying
7. Notify human with:
   - Cloudflare Pages deployment URL as documented in the PR
   - Brief summary of what was delivered
   - (**Do NOT include** raw PR URL)

### Merge Conflict Resolution
When multiple issues produce conflicting changes:
1. Identify the conflicting files
2. Fetch both branches locally
3. Merge manually, resolving each conflict by understanding both changes' intent
4. Test the merged result
5. Push the resolution
6. Document the conflict — use it to improve future task decomposition (avoid overlapping file changes)

---

## Interaction Protocols Summary

| Protocol | Trigger | Action |
|----------|---------|--------|
| **Create Issue** | New task identified | Decompose → Craft description via `prompt-engineering-expert` → `gh issue create --label jules` |
| **Wait for PR** | Issue created with `jules` tag | Monitor for Jules to open a PR |
| **Build Check** | PR opened by Jules | Wait for Cloudflare Pages build to pass |
| **UX Review** | PR has visual/UI changes + build passes | Delegate to ux-tester → refine report → comment on PR → wait for Jules fix |
| **Manual Review** | Build passes (+ UX passes if applicable) | Full quality checklist review |
| **Request Fix** | Issues found in review | Comment refined instructions on PR → wait for Jules to fix |
| **PR Comment Review** | Before any merge | Read PR comments → filter actionable suggestions → comment refined fixes on PR |
| **Merge** | PR passes all reviews (build + UX + code + comments) | Resolve conflicts → squash merge → update tracking → notify |
| **Re-create Issue** | Jules unable to resolve via PR comments | Close PR, refine issue description, create new issue with `jules` tag |
| **Escalate** | Cannot resolve autonomously | Report to human with diagnosis + recommendation |

### Escalation Protocol

When Jules cannot complete a task and autonomous recovery has failed:

1. **Report failure** to the task starter with a clear diagnosis
2. **Suggest breaking the task** into smaller, more focused pieces
3. **Recommend manual intervention** only as a last resort (rare)
4. **Document the failure** in `notes/JULES_ERRORS.md` for future reference

> Escalation is not failure — it's recognizing when a task exceeds the swarm's capabilities and getting the right human involved quickly.

---

## Learned Lessons

> These lessons were learned from real operational experience. Read them carefully — they prevent repeat failures.

### Jules Job Completion Notifications (2026-02-27)
**Tracking File:** `notes/jules-completed-notified.json`

**Notification Rules:**
1. **ONLY notify once per completed issue** — check `notified_sessions` array first
2. **Include:** Cloudflare Pages URL + brief delivery summary

### GitHub Issues with Jules Tag (2026-03-02)
- **Every issue MUST have the `jules` label** — this is how Jules discovers work
- Ensure the `jules` label exists on the repo before creating issues
- Use `gh label create jules` if the label doesn't exist yet
- Jules will automatically pick up tagged issues and open PRs

### Communicating Feedback via PR Comments (2026-03-02)
- **All feedback to Jules goes through PR comments** — not direct API calls
- Always refine feedback through `prompt-engineering-expert` before commenting
- Be specific: reference exact files, line numbers, and expected behavior
- Group multiple fixes into a single, well-structured comment

### Visual Review Before Merge (2026-02-27)
**Post-mortem lesson:** Always verify the ACTUAL deployed page visually before merging.

**Common failures to catch:**
- Pages created but not linked from navigation
- Missing navigation updates
- Broken asset paths

### Images for Jules Sessions (2026-02-27)
- Jules **cannot** generate real images
- Process: Jules outputs placeholders → you generate real images → commit to branch
- This is your responsibility, not Jules'

### Marketing Content Requirements (2026-02-27)
Every marketing page MUST be:
1. **Phone-ready** — works on mobile/phone screens
2. **Video-like** — includes animations, motion, visual interest (not static text)
3. **Reuse existing patterns** — from "swiss-precision" and "portrait" pages

### Jules & Deployment (2026-02-27)
- **DO NOT** tell Jules about deployment pipelines
- Deployment is automatic via GitHub webhooks
- Jules gets confused if you mention deployment

### Jules Prompt Clarity (2026-02-27)
Be **EXACTLY** clear about what to fix. Vague prompts produce vague results.

**Concise prompt template for fixes (use as PR comments):**
```
FIX THIS (PR #X):
1. [EXACT change 1]
2. [EXACT change 2]
3. [EXACT constraint]

Action: [EXACT file and what to do with it]
```

---

_This file is a living document. Update it with every new lesson, post-mortem, and operational pattern you discover._
