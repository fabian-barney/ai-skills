---
name: issue-write-description
description: >-
  Write structured GitHub issue descriptions for implementation, backlog, or
  follow-up work. Use when opening or updating issue bodies and when another
  workflow needs a concise issue template.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Write a clear GitHub issue description that explains the problem, the intended
outcome, and the relevant constraints without turning the issue into a long
design document.

# When to Use

- use when opening a GitHub issue for implementation, backlog, or follow-up
  work
- use when updating an existing issue body after scope or assumptions change
- use when another workflow needs a reusable, concise issue-description shape
- use `references/issue-description-structure.md` for the canonical section
  order and field expectations
- use `references/github-issue-publishing.md` when the description will be
  posted with `gh issue create` or `gh issue edit`
- use `examples/implementation-issue.md` when a concrete issue-body shape helps
- use `formatting-github-comment` after the content is decided and needs final
  GitHub Markdown normalization

# Inputs

- the problem or opportunity the issue should capture
- the intended outcome or requested change
- scope boundaries, constraints, and assumptions
- optional acceptance checks, verification notes, or non-goals
- `references/issue-description-structure.md` and
  `references/github-issue-publishing.md`

# Workflow

1. State the problem in concrete terms instead of generic backlog language.
2. Describe the intended outcome and the bounded scope of the issue.
3. Add important constraints, assumptions, or non-goals only when they help a
   later implementer avoid common mistakes.
4. Include concrete validation or acceptance notes when they materially shape
   implementation or review.
5. Use `references/issue-description-structure.md` to keep the body concise and
   complete.
6. Use `references/github-issue-publishing.md` before posting or updating the
   issue through GitHub tooling.
7. Use `examples/implementation-issue.md` when a concrete GitHub-ready shape
   helps.
8. Hand the final draft to `formatting-github-comment` when Markdown
   normalization is still needed before posting.

# Outputs

- a GitHub-ready issue description with problem, outcome, scope, and relevant
  constraints
- optional acceptance or validation notes when they materially affect later
  work
- a concise issue body that can be posted directly after formatting

# Guardrails

- do not turn the issue body into an implementation transcript
- do not leave the problem statement implicit
- do not omit key scope boundaries or non-goals when they materially matter
- do not emit literal `\n` escape sequences in Markdown meant for GitHub
- do not broaden this skill into issue creation, assignment, or implementation
  workflow

# Exit Checks

- the issue explains the problem and intended outcome in one pass
- scope boundaries and key assumptions are explicit
- the issue body is concise enough for GitHub discussion flow
- the Markdown is safe to publish through `gh issue create` or `gh issue edit`
