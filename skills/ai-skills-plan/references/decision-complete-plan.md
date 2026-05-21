# Decision-Complete Plan Reference

A strong implementation plan should make these elements explicit:

- goal and success criteria
- in-scope and out-of-scope items
- target files, interfaces, or subsystems
- applicable rulesets and semantic parent/sibling docs
- key design decisions and chosen defaults
- external dependencies, blockers, and dependency-first ordering
- important risks, edge cases, and mitigations
- verification steps and acceptance criteria
- required skill handoffs for specialized workflows such as post-push PR review
  loops or merge-loop handling

Repository exploration comes before clarification questions when the answer can
be discovered locally.

When governing rulesets exist, the plan must start with a complete-ruleset read
task and end with a complete-ruleset conformance re-read.

If the plan includes post-push review, review retriggering, or merge-loop work,
it must consult skill `ai-skills-pr-review-loop` and must not propose PR
comments such as `@copilot review` as the trigger mechanism.
