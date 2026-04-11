---
name: pr-write-description
description: Write concise pull request descriptions for code reviewers. Use when opening or updating a GitHub PR description with implementation summary, review focus, validation, and residual risk.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Write a reviewer-focused PR description that makes scope, non-obvious changes,
validation, and residual risk easy to scan before review starts.

# When to Use

- use when opening a new GitHub PR for implementation work
- use when updating a PR description after scope or validation changes
- use when another workflow needs a concise reviewer-facing implementation
  summary
- use `references/pr-description-template.md` for the canonical reviewer-facing
  section layout
- use `references/reviewer-focus.md` to decide what reviewers may skim versus
  where they should pay attention
- use `examples/pull-request-description.md` when a concrete output shape helps
- use `formatting-github-comment` after the content is decided and needs final
  GitHub Markdown normalization

# Inputs

- the issue or implementation concern being delivered
- the bounded scope of the PR
- the key changes and explicit non-goals
- generated, copied, or otherwise low-risk files reviewers may skim
- non-obvious logic, decisions, or tradeoffs reviewers should inspect closely
- tests executed, manual checks, and residual risks
- `references/pr-description-template.md` and
  `references/reviewer-focus.md`

# Workflow

1. Identify the single issue or concern the PR is meant to deliver.
2. Summarize the scope, key changes, and explicit non-goals in a short
   implementation summary.
3. Call out files or change categories reviewers may skim, such as generated
   files, copied templates, or standard imports.
4. Highlight non-obvious logic, tradeoffs, and review focus areas that deserve
   close inspection.
5. Record concrete validation evidence, including tests run, manual checks, and
   any remaining residual risk.
6. Use `references/pr-description-template.md` as the baseline shape and
   `references/reviewer-focus.md` when deciding what belongs in review focus
   versus the implementation summary.
7. Use `examples/pull-request-description.md` when a concrete GitHub-ready
   example helps.
8. Hand the final draft to `formatting-github-comment` when Markdown
   normalization is still needed before posting.

# Outputs

- a reviewer-focused PR description with implementation summary, review focus,
  and validation sections
- explicit note of non-goals and residual risk
- a concise artifact that can be posted directly to GitHub after formatting

# Guardrails

- do not restate the entire diff file-by-file
- do not hide important review focus behind generic summary prose
- do not omit residual risk just because checks are green
- do not broaden this skill into PR review-thread handling or merge decisions
- do not emit literal `\n` escape sequences in Markdown meant for GitHub

# Exit Checks

- the PR scope is clear and tied to one implementation concern
- reviewers can tell what to skim and what to inspect closely
- tests, manual checks, and residual risks are explicit
- the description is concise enough to work as a GitHub PR body
