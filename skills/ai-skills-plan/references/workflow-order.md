# Workflow Order Reference

Implementation work should follow a stable execution order:

- read complete governing rulesets before any other planning task
- plan first with dependency and blocker research
- consult skill `ai-skills-pr-review-loop` before finalizing any plan that
  includes post-push review, review retriggering, or merge-loop work
- create a dedicated issue branch
- implement the bounded change
- open a PR or MR
- handle review and validation
- re-read governing rulesets before final completion when one or more
  governing rulesets exist
- merge only after the review gate is clean

This keeps the scope aligned to one concern and prevents implementation from
starting without an actionable plan.

Plans that include PR review-loop work should name the approved review trigger
workflow or defer to skill `ai-skills-pr-review-loop`; they should not propose
PR comments such as `@copilot review`.
