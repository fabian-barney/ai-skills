# Workflow Order Reference

Implementation work should follow a stable execution order:

- plan first
- create a dedicated issue branch
- implement the bounded change
- open a PR or MR
- handle review and validation
- merge only after the review gate is clean

This keeps the scope aligned to one concern and prevents implementation from
starting without an actionable plan.
