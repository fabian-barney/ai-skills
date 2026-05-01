# Example JPA Equality Review Finding

```text
The entity's `equals(...)` currently returns `Objects.equals(id, other.id)`.
That makes two different unsaved entities compare equal when both primary keys
are `null`, which violates the JPA identity rule for unsaved entities. Handle
the `null` primary-key case explicitly so an unsaved entity is only equal to
its own Java instance identity, then recheck the paired `hashCode()` strategy.
```
