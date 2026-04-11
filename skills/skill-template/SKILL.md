---
name: skill-template
description: Define the canonical backlog-entry template for proposing new or improved ai-skills catalog items.
---

# skill-template

## Purpose

Standardize how canonical `ai-skills` backlog items are described so later
capture skills can render the same content model as GitHub issues or local
Markdown records.

## When to Use

- use when defining the canonical structure for a new reusable skill idea
- use when defining the canonical structure for an improvement proposal to an
  existing skill
- use when `skill-new` or `skill-improve` needs a normalized template before
  publishing a backlog entry
- use the bundled `templates/` and `examples/` files when a concrete rendering
  of the canonical backlog entry is needed

## Inputs

- whether the backlog item is `new` or `improve`
- the working skill id or name
- the problem or motivation
- the reusable rationale
- the rough trigger, workflow, related skills, and source notes
- the bundled rendering templates when a concrete output shape is needed

## Workflow

1. Classify the backlog record as `new` or `improve`.
2. Normalize the input into the canonical backlog-entry fields.
3. Keep the template focused on canonical `ai-skills` backlog items rather than
   the AI agent's private skill maintenance.
4. Provide renderable template shapes for both GitHub issues and local
   Markdown files.
5. Stop after producing the canonical record shape and its renderable
   templates.
6. Use the bundled examples only as demonstrations of the shared content model,
   not as different semantics.

## Outputs

- the canonical backlog-entry field set for `ai-skills`
- a GitHub issue template rendering of that model
- a local Markdown backlog-entry rendering of that model
- short examples for `new` and `improve` records

## Guardrails

- do not implement the proposed skill
- do not make GitHub the only supported storage target
- do not change the canonical backlog-entry semantics between renderings
- do not broaden into general AI-agent-private skill maintenance

## Exit Checks

- the template contains all canonical backlog-entry fields
- `new` and `improve` are clearly distinguished
- GitHub and local Markdown are represented as renderings of the same model
- no implementation behavior is embedded in the template
