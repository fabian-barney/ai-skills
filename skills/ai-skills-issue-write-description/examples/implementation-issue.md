# Example Issue Description

## Summary
- Problem: authoring workflows need a reusable way to write concise GitHub
  issue bodies
- Outcome: add an `ai-skills-issue-write-description` skill with one canonical structure,
  publishing notes, and a concrete example

## Scope
- In scope: skill definition, bundled references, and a GitHub-ready example
- Out of scope: issue creation, assignment, or project-board updates

## Notes
- Constraints / assumptions: keep the issue body concise and compatible with
  `gh issue create --body-file`
- Validation / acceptance notes: markdownlint and repository quality checks
  must still pass after the skill is added
