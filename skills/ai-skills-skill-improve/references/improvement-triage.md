# Improvement Triage

Prefer a central `ai-skills` improvement backlog entry when most of the
following are true:

- the target skill is already in the public `ai-skills` catalog
- the observed gap is likely to affect more than one repository or user
- the missing behavior is not only a private company policy or local exception
- the proposed improvement can be described in tool-agnostic terms

Prefer local-only capture or no separate backlog item when the observation is
purely private, one-off, or already covered by existing skill guidance.

Use `change-type: improve` only when the target skill already exists and the
proposal changes its behavior, guidance, examples, or references. If no target
skill exists yet, capture the idea through `ai-skills-skill-new` instead.

For central `ai-skills` improvements, note how the captured entry should feed a
later catalog update lifecycle: issue triage, implementation PR, changelog or
release-note entry, and release verification.
