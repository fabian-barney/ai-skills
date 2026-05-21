# Decision-Complete Planning Notes

Distilled from the project's planning guidance.

- Read complete governing rulesets before any other planning task.
- Then explore the repository and ask only high-impact clarifying questions.
- Research semantic parent/sibling docs, architecture constraints, codebase
  history, external dependencies, and blockers before finalizing the plan.
- Keep the plan dependency-aware and implementation-ready.
- Make assumptions explicit instead of letting them hide in execution.
- Define verification before implementation starts.
- When planning post-push PR review, review retriggering, or merge-loop work,
  consult skill `ai-skills-pr-review-loop` before finalizing the plan.
- Do not encode PR comments, `@copilot review`, or similar ad-hoc comment
  triggers in a plan; name the approved workflow or defer to skill `ai-skills-pr-review-loop`.
- If new information changes the plan materially, refresh the plan first.
- End by re-reading governing rulesets and correcting any plan
  non-conformance before presenting the plan as complete.
