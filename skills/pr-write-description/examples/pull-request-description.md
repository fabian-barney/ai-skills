# Example Pull Request Description

## Implementation Summary
- Scope: add the `pr-write-description` skill and its supporting references
- Key changes: define the reviewer-facing PR body shape, review-focus guidance,
  and one GitHub-ready example
- Non-goals: PR review handling, merge decisions, or issue-comment authoring

## Review Focus
- Generated/copied files and standard imports that can be skimmed: none
- Non-obvious code paths and rationale: the skill separates reviewer-facing
  scope from validation so PR descriptions stay concise and scannable

## Validation
- Tests executed: `./gradlew qualityGate`; `npx --yes markdownlint-cli2
  "**/*.md" "!**/node_modules/**" --config .markdownlint.json`
- Manual checks: verified the skill references only existing bundled files
- Residual risks: reviewer-focus guidance still depends on the calling workflow
  surfacing the right diff context
