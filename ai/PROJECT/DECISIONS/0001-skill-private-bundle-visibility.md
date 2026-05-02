# ADR 0001: Skill-Private Bundle Visibility

## Status

Accepted

## Context

Canonical skills compose with each other, but the repository previously
allowed cross-skill references to individual bundle files such as another
skill's `SKILL.md` or a file under its `references/` directory. That made
bundle internals part of the effective public API and coupled skills to each
other's file layout instead of their canonical behavior contract.

The catalog also used inconsistent human-readable cross-skill references:
some places named another skill id directly, while others referenced a file
path. New skill authors need one clear, validator-enforced rule.

## Decision

Every file inside `skills/<skill-id>/` is `skill-private`.

The only public composition interface of a canonical skill is its skill id.
Human-readable cross-skill references must use the plain word `skill` followed
by the skill id in a Markdown code span, for example skill
`ai-skills-code-refactoring`.

The following rules apply:

- a skill may reference files only from its own bundle
- a skill must not reference another skill bundle's `SKILL.md`
- a skill must not reference another skill bundle's `references/`,
  `examples/`, `scripts/`, `targets/`, or `templates/`
- composition happens by skill id, not by file path
- raw skill ids without the `skill` keyword remain allowed only in
  identifier-valued fields whose payload is literally the id itself, such as
  frontmatter `name` and backlog-entry `skill-id-or-name`

## Consequences

- skill bundles behave like modules with a private file surface
- refactoring a skill's internal file layout no longer changes its public
  composition interface
- validator checks must reject cross-skill file paths and non-canonical
  cross-skill reference wording
- skill-authoring guidance, examples, and templates must all use the
  canonical syntax so new skills inherit the rule by default
