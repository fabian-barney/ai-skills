# Cache Breakpoint Placement

Distilled from Anthropic prompt-caching guidance, adapted to skill-bundle
authoring.

- Identify the last block in the ordered prompt sequence (tools → system →
  long-lived references → prior turns → current variable input) whose bytes
  are identical across the next batch of expected invocations.
- Place a single `cache_control` breakpoint on that block, not on any
  earlier block, so the cache spans the full stable prefix.
- Never place a breakpoint on a block whose content changes per request:
  per-task user input, current file path, timestamp, or any rendered
  per-invocation context. A breakpoint on changing content forces a cache
  rewrite on every call.
- Respect the 20-block lookback window: when a new long-lived block has to
  be added past the existing breakpoint, move the breakpoint forward
  rather than appending past it and relying on lookback.
- When tools, system, long-lived references, and messages change at
  different cadences, use up to four breakpoints — one at the trailing
  edge of each cadence band. Do not exceed four.
- For multi-turn conversations the automatic breakpoint advances per
  request; do not hand-place additional breakpoints per turn unless a
  cadence band needs its own breakpoint.
- Confirm the cacheable prefix meets the model minimum: Claude Opus and
  Haiku require 4,096 tokens, Sonnet and older Opus require 1,024 tokens.
  Below the threshold the cache will not be used even with a correct
  breakpoint.
- Use the response `usage` block to verify placement:
  `cache_read_input_tokens` should grow as cached prefixes are reused;
  persistently high `cache_creation_input_tokens` means the breakpoint sits
  on changing content and must be moved earlier.
