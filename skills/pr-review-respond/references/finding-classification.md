# Finding Classification

Use these states:

- `valid`: the finding identifies a real issue for the current scope
- `invalid`: the finding does not hold given the current code, rules, or
  evidence
- `unresolved`: available evidence is insufficient to classify confidently

Every handled finding should move into one of these states explicitly.
