---
name: skill-new
description: >-
  Capture a new reusable ai-skill idea as a canonical backlog entry. Use when
  daily work reveals a public or centrally reusable skill candidate that
  should be recorded as a GitHub issue or local Markdown backlog item without
  implementing the skill.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Capture a new reusable skill idea in the canonical `ai-skills` backlog format
so the idea survives daily work and can be implemented later without losing the
important context.

# When to Use

- use when a new reusable skill idea emerges during normal implementation or
  review work
- use when the candidate appears useful beyond the current repository or task
- use when the idea should be recorded centrally in `ai-skills` instead of only
  in local notes
- use when GitHub access is unavailable and the same canonical backlog entry
  must be preserved as local Markdown instead
- use `references/public-skill-triage.md` to decide whether the candidate is
  public and reusable enough for the central backlog
- use `references/backlog-target-selection.md` to decide between GitHub and
  local Markdown storage
- use `targets/github-issue.md` and `targets/local-backlog-entry.md` when a
  concrete rendered target artifact helps
- use `skill-template` to normalize the canonical field set before rendering
- use `formatting-github-comment` when the GitHub issue body still needs final
  Markdown normalization

# Inputs

- the observed gap, repetitive need, or reusable workflow idea
- the rough proposed skill id or name
- why the idea is reusable beyond the originating task
- when the skill would be triggered or used
- rough workflow or responsibilities for the future skill
- related skills, dependencies, or adjacent existing skills
- source context or notes from the originating task, limited to observations
  rather than design decisions or implementation plans; include related lessons
  learned here when known and relevant
- `references/public-skill-triage.md` and
  `references/backlog-target-selection.md`

# Workflow

1. Confirm the idea is a reusable skill candidate rather than a one-off local
   convention or implementation detail.
2. Decide whether the candidate belongs in the public `ai-skills` backlog by
   using `references/public-skill-triage.md`.
3. Normalize the idea with `skill-template`, including title, change type,
   proposed skill id or name, motivation, reusability rationale, when to use,
   rough workflow, related skills, source context, and status.
4. Choose the storage target with
   `references/backlog-target-selection.md`: GitHub issue when central
   publication is appropriate and access exists, otherwise local Markdown.
5. Render the canonical backlog entry for the chosen target without changing
   the underlying semantics.
6. Use `targets/github-issue.md` and `targets/local-backlog-entry.md` as
   target-specific renderings of the canonical record when a concrete artifact
   shape helps.
7. Hand GitHub-bound Markdown to `formatting-github-comment` when the rendered
   issue body still needs final normalization.
8. Stop after the canonical backlog entry is recorded or rendered.

# Outputs

- a canonical backlog entry for a new `ai-skills` candidate
- a GitHub issue rendering when central publication is appropriate and possible
- a local Markdown rendering when GitHub is unavailable or inappropriate

# Guardrails

- do not implement the proposed skill
- do not use `source-context-or-notes` for design decisions, implementation
  plans, or claims that the proposed skill was implemented
- do not create a central backlog item for a purely local, repo-specific need
- do not make GitHub the only supported storage target
- do not silently change the canonical field set between renderings
- do not fail the workflow just because GitHub issue creation is unavailable

# Exit Checks

- the candidate is captured with the full canonical backlog-entry field set
- source context or notes are observational and do not contain implementation
  claims
- the chosen storage target matches access and publication constraints
- the rendered record stays aligned with the canonical template
- the workflow stops after capture rather than drifting into implementation
