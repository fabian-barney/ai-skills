# Example Equality Review Finding

```text
The updated `equals(...)` and `hashCode()` implementations use different field
sets: `equals(...)` compares `id` and `tenantId`, but `hashCode()` only hashes
`id`. That violates the equals/hashCode contract because equal objects must
always produce the same hash code. Update `hashCode()` to use the same semantic
identity fields as `equals(...)`, then rerun the equality-focused tests.
```
