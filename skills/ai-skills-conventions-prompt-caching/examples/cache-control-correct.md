# Example Cache Control Placement

```text
# Don't — breakpoint on changing content
tools           (stable)
system          (stable)
references      (stable)
user input      (changes per request)   <- cache_control HERE
```

The breakpoint sits on the per-request user input, so every call writes a
new cache entry and reads nothing. `cache_creation_input_tokens` stays
high on every call; `cache_read_input_tokens` stays near zero.

```text
# Do — breakpoint on the last stable block
tools           (stable)
system          (stable)
references      (stable)                <- cache_control HERE
user input      (changes per request)
```

The breakpoint sits on the trailing stable references block. The static
prefix is reused on every call. After the first warm-up call,
`cache_read_input_tokens` grows and `cache_creation_input_tokens` falls
toward zero.

```text
# Do — up to four breakpoints when cadence bands differ
tools           (changes rarely)        <- cache_control 1
system          (changes per release)   <- cache_control 2
long-lived refs (changes per release)   <- cache_control 3
prior turns     (changes per session)   <- cache_control 4
current input   (changes per request)
```

One breakpoint per cadence band, never on the trailing per-request block.
Never use more than four breakpoints in a single prompt.
