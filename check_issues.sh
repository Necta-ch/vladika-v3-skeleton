#!/bin/bash
for i in {1..10}; do
  echo "--- Item $i ---"
  # Try to view as issue
  ISSUE_JSON=$(gh issue view $i --repo Necta-ch/stratton-capital --json title,state 2>/dev/null)
  if [ -n "$ISSUE_JSON" ]; then
    echo "Type: Issue"
    echo "Title: $(echo "$ISSUE_JSON" | jq -r .title)"
    echo "State: $(echo "$ISSUE_JSON" | jq -r .state)"
    # Find PRs mentioning this issue
    PR_LIST=$(gh pr list --repo Necta-ch/stratton-capital --state all --search "$i in:title,body" --json number,state,title 2>/dev/null)
    echo "Linked PRs: $(echo "$PR_LIST" | jq -r '.[].number' | tr '\n' ',' | sed 's/,$//')"
  else
    # Try to view as PR
    PR_JSON=$(gh pr view $i --repo Necta-ch/stratton-capital --json title,state,statusCheckRollup,comments,reviews 2>/dev/null)
    if [ -n "$PR_JSON" ]; then
      echo "Type: PR"
      echo "Title: $(echo "$PR_JSON" | jq -r .title)"
      echo "State: $(echo "$PR_JSON" | jq -r .state)"
      echo "Checks: $(echo "$PR_JSON" | jq -r '.statusCheckRollup[]?.conclusion // "pending"' | tr '\n' ',' | sed 's/,$//')"
      echo "Comments count: $(echo "$PR_JSON" | jq '.comments | length')"
    else
      echo "Not found"
    fi
  fi
done
