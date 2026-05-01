# Null Contract Defaults

Distilled from the issue contract and the project's Java/Lombok nullness
guidance.

- Prefer empty collections over `null`; treat this as a hard default, not a
  suggestion.
- Collections must be non-null in normal domain and application logic.
- If a collection is unexpectedly `null`, fail fast and treat it as a
  programming error instead of swallowing it with null-safe helper methods.
- A nullable collection is acceptable only at the narrowest boundary where
  `absent` and `empty` must stay distinct, such as selected
  de-/serialization or un-/marshalling cases.
- Public-facing parameters, return values, and fields must have explicit null
  contracts without exemption.
