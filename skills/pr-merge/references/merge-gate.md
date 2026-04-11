# Merge Gate

Treat the PR as merge-ready only when all of the following are true:

- a completed review exists after the latest push
- no required review threads or conversations remain unresolved
- all required checks are green on the current head commit
- the chosen merge method respects repository policy

If any item is false or unknown, do not merge.
