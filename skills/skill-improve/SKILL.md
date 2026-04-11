---
name: skill-improve
description: >-
  Capture an improvement proposal for an existing skill as a canonical
  backlog entry. Use when normal work reveals a reusable improvement to a
  public or centrally maintained skill and the improvement should be recorded
  without blocking the current task.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Capture a reusable improvement proposal for an existing skill so central
improvements to the `ai-skills` catalog are not lost when they are discovered
during unrelated daily work.

# When to Use

- use when normal work reveals a missing behavior, weak guidance, or other
  reusable improvement to an existing skill
- use when the target skill belongs to the public `ai-skills` catalog and the
  improvement should be proposed centrally for everyone
- use when GitHub access is unavailable and the same canonical improvement
  record must be preserved as local Markdown instead
- use `references/improvement-triage.md` to decide whether the observed gap is
  worth central capture
- use `references/backlog-target-selection.md` to decide between GitHub and
  local Markdown storage
- use `examples/public-skill-improvement-issue.md` and
  `examples/local-skill-improvement-entry.md` when a concrete rendered example
  helps
- use `skill-template` to normalize the canonical field set before rendering
- use `formatting-github-comment` when the GitHub issue body still needs final
  Markdown normalization

# Inputs

- the existing skill id or name
- the observed gap, defect, or missing guidance
- why the improvement is reusable beyond the current task
- when the missing behavior matters or gets triggered
- the rough improvement proposal or expected change in behavior
- related skills, dependencies, or adjacent skill families
- source context or notes from the originating task
- `references/improvement-triage.md` and
  `references/backlog-target-selection.md`

# Workflow

1. Confirm the observation is a reusable improvement to an existing skill
   rather than only a local workaround or private policy difference.
2. Use `references/improvement-triage.md` to decide whether the proposal should
   be captured centrally.
3. Normalize the improvement with `skill-template`, using `change-type:
   improve` and recording the target skill, motivation, reusability rationale,
   trigger conditions, rough improvement shape, related skills, source
   context, and status.
4. Choose the storage target with
   `references/backlog-target-selection.md`: GitHub issue when the improvement
   belongs in the public `ai-skills` backlog and access exists, otherwise local
   Markdown.
5. Render the canonical improvement entry for the chosen target without
   changing the underlying semantics.
6. Hand GitHub-bound Markdown to `formatting-github-comment` when the rendered
   issue body still needs final normalization.
7. Stop after the improvement proposal is captured and return any current
   implementation work to the normal agent workflow outside this skill.

# Outputs

- a canonical backlog entry for improving an existing skill
- a GitHub issue rendering when central publication is appropriate and possible
- a local Markdown rendering when GitHub is unavailable or inappropriate

# Guardrails

- do not implement the skill improvement inside this capture workflow
- do not create a central backlog item for a purely repo-local private skill
- do not make GitHub the only supported storage target
- do not let central backlog capture block the current task
- do not silently change the canonical field set between renderings

# Exit Checks

- the proposal targets an existing skill and uses `change-type: improve`
- the chosen storage target matches access and publication constraints
- the rendered record stays aligned with the canonical template
- the workflow stops after capture and returns implementation to normal flow
