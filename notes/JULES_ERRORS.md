# JULES_ERRORS.md — Jules Session Failures

## 2026-03-01: Session 2259236107660561230 — No PR Created

**Session:** Fix invoice link placement - move to Admin dashboard
**Repo:** Necta-ch/classiccuts
**State:** COMPLETED (but no PR created)
**Error Type:** Stuck Session — reported complete without executing

**Diagnosis:**
- Session reached COMPLETED state
- No outputs (PR) were generated
- No branch was created in the repository
- This indicates Jules marked the session complete without actually executing the work

**Resolution:**
- Session needs to be re-spawned with refined prompt
- Original task: Move invoice link from Home.jsx to Admin.jsx

---

## Pattern: Stuck Session Detection

**Detection Signals:**
- `outputs[]` is null or empty → no PR was created
- Activity count ≤ 2 → only plan generation occurred
- State is `COMPLETED` but no PR URL in outputs

**Recovery:**
1. Check if plan approval was missed → approve it
2. Check if feedback was requested → provide it
3. If genuinely dead → delete, refine prompt, re-spawn
4. Document in this file
