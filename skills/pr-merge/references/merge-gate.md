# Merge Gate

Treat the PR as merge-ready only when all of the following are true:

- a completed review exists after the latest push
- no required review threads or conversations remain unresolved
- all required checks are green on the current head commit
- protected-branch discipline is satisfied by a feature branch and PR
- merge authority is valid for the acting user and instruction context
- any self-merge exception has explicit user instruction and repository owner
  confirmation in the current session
- the PR body links the main issue, for example with `Closes #<id>`
- the chosen merge method respects repository policy
- the merge does not require force, admin-bypass, or skipped required gates

If any item is false or unknown, do not merge.
