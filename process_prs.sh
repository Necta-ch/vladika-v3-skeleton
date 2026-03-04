#!/bin/bash
# Script to process PRs with merge conflicts

cd /tmp/necta
git checkout main
git pull

# List of PRs to process
PRS=(183 180 147 140 139 134 126 194 177 175 174 170 169 167 166 165 163 161 160 159 145 144 138 136 132 129 127)

for PR in "${PRS[@]}"; do
  echo "=== PR $PR ==="
  
  # Check if PR is open
  STATE=$(gh pr view $PR --json state 2>/dev/null | jq -r '.state')
  if [ "$STATE" != "OPEN" ]; then
    echo "PR $PR is $STATE - skipping"
    continue
  fi
  
  # Check if has conflicts
  MERGEABLE=$(gh pr view $PR --json mergeable 2>/dev/null | jq -r '.mergeable')
  if [ "$MERGEABLE" != "CONFLICTING" ]; then
    echo "PR $PR has no conflicts (status: $MERGEABLE)"
    # Try to merge if clean
    if [ "$MERGEABLE" = "MERGEABLE" ]; then
      gh pr merge $PR --squash --auto 2>/dev/null && echo "PR $PR merged" || echo "PR $PR merge failed"
    fi
    continue
  fi
  
  echo "PR $PR has conflicts - resolving..."
  
  # Get branch name
  BRANCH=$(gh pr view $PR --json headRefName 2>/dev/null | jq -r '.headRefName')
  echo "Branch: $BRANCH"
  
  # Clean up any existing work branch
  git branch -D work-$PR 2>/dev/null || true
  
  # Fetch PR
  git fetch origin pull/$PR/head 2>/dev/null || { echo "Failed to fetch PR $PR"; continue; }
  git checkout -b work-$PR FETCH_HEAD 2>/dev/null || { echo "Failed to checkout PR $PR"; continue; }
  
  # Rebase onto main
  if git rebase main; then
    echo "Rebase successful"
  else
    echo "Conflicts detected - taking main's version"
    for f in $(git diff --name-only --diff-filter=U 2>/dev/null); do
      git checkout main -- "$f" 2>/dev/null && git add "$f"
    done
    # Check if rebase is still in progress
    if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ]; then
      git rebase --continue 2>/dev/null || git rebase --skip 2>/dev/null || true
    fi
  fi
  
  # Delete remote branch ref locally and rename
  git branch -D $BRANCH 2>/dev/null || true
  git branch -m $BRANCH 2>/dev/null || { echo "Failed to rename branch"; git checkout main; continue; }
  
  # Force push
  if git push origin $BRANCH --force-with-lease 2>/dev/null; then
    echo "Pushed rebased branch"
  else
    echo "Push failed"
    git checkout main
    continue
  fi
  
  # Wait for GitHub to process
  echo "Waiting for CI checks..."
  sleep 45
  
  # Check status and merge if clean
  STATUS=$(gh pr view $PR --json mergeStateStatus 2>/dev/null | jq -r '.mergeStateStatus')
  echo "Status: $STATUS"
  
  if [ "$STATUS" = "CLEAN" ] || [ "$STATUS" = "BLOCKED" ]; then
    if gh pr merge $PR --squash --auto 2>/dev/null; then
      echo "✓ PR $PR merged"
    else
      echo "✗ PR $PR merge failed - may need manual review"
    fi
  else
    echo "PR $PR not ready (status: $STATUS)"
  fi
  
  git checkout main 2>/dev/null
done

echo "=== Done ==="
