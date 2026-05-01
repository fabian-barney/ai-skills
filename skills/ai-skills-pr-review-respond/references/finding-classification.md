# Finding Classification

Use these states:

- `valid`: the finding identifies a real issue for the current scope
- `invalid`: the finding does not hold given the current code, rules, or
  evidence
- `unresolved`: available evidence is insufficient to classify confidently

Every handled finding should move into one of these states explicitly.

When multiple findings compete for attention, triage them in this priority
order:

Canonical severity guidance lives in
`skills/ai-skills-pr-review-write/references/severity-order.md`. The ordering below is
the response-triage view of that guidance; if the two ever appear to differ,
follow `severity-order.md` and interpret this list consistently with it.

1. correctness
2. security
3. compliance
4. data integrity
5. architecture
6. performance
7. observability
8. maintainability

For dependency-related findings, validate dependency need and security risk, and
use `skills/ai-skills-compliance-dependency/SKILL.md` as the source of truth for assessing
license compatibility and relevant transitive impact before choosing a state.
