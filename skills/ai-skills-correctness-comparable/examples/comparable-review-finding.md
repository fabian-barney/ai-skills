# Example Comparable Review Finding

```text
The updated `compareTo(...)` returns `0` whenever `priority` matches, but
`equals(...)` still compares both `priority` and `id`. That makes the natural
ordering inconsistent with equals, so a `TreeSet` or `TreeMap` can collapse
distinct objects unexpectedly. Align `compareTo(...)` with the same semantic
identity, or document and bound the deviation explicitly before merging.
```
