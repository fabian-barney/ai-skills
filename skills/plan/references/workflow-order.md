# Workflow Order Reference

Implementation work should follow a stable execution order:

- read complete governing rulesets before any other planning task
- plan first with dependency and blocker research
- create a dedicated issue branch
- implement the bounded change
- open a PR or MR
- handle review and validation
- re-read governing rulesets before final completion when one or more
  governing rulesets exist
- merge only after the review gate is clean

This keeps the scope aligned to one concern and prevents implementation from
starting without an actionable plan.
