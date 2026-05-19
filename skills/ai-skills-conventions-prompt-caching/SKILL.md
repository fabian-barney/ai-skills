---
name: ai-skills-conventions-prompt-caching
description: >-
  Structure prompts and skill bundles so the static prefix stays stable across
  invocations and Anthropic prompt-prefix caching can hit instead of rebuild.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply the default prompt-prefix-caching conventions so that the static
portion of a prompt or skill bundle stays byte-identical across invocations,
the cache breakpoint is placed on the last stable block, and per-request
variable content is appended last. The goal is to keep
`cache_read_input_tokens` high and `cache_creation_input_tokens` near zero
on repeated invocations.

# When to Use

- use when authoring or revising a skill bundle whose `SKILL.md` and any
  references, examples, or templates files are intended to be reused
  across many invocations
- use when structuring a prompt that will be replayed with only minor
  per-request variations (different user input, different target file,
  different chosen example)
- use when reviewing an existing skill or prompt that exhibits low cache
  hit rates or high per-request token cost
- use `references/cache-breakpoint-placement.md` for the decision framework
  on where the last cache breakpoint belongs
- use `references/skill-structure-for-caching.md` for how the canonical
  SKILL.md section order keeps a long stable prefix
- use `examples/cache-control-correct.md` when communicating the expected
  correct-vs-incorrect breakpoint placement

# Inputs

- the prompt or skill bundle whose prefix stability is in scope
- the set of blocks the model will see in order: tools, system, references,
  prior turns, and the current variable input
- which blocks change per invocation versus which stay byte-identical
- the cache-hit and cache-creation token counts from recent runs when
  available, used to detect the antipattern of a breakpoint on changing
  content
- the target Claude model and its minimum cacheable-prefix size
  (Opus and Haiku require 4,096 tokens; Sonnet and older Opus require
  1,024 tokens)
- `references/cache-breakpoint-placement.md`
- `references/skill-structure-for-caching.md`

# Workflow

1. Order content static-first: tools, then system, then long-lived
   references and examples, then prior turns, then the current variable
   input last. Variable content at the front breaks the prefix for every
   invocation.
2. Identify the last byte-stable block in the ordered sequence. That is
   the block whose content is identical across the next batch of expected
   invocations.
3. Place a single `cache_control` breakpoint on that last stable block.
   Never place a breakpoint on a block whose content changes per request
   (timestamps, user input, chosen target file), because that forces a
   cache rewrite every call.
4. Keep the static prefix above any breakpoint within the 20-block
   lookback window the cache uses; if a new long-lived block has to be
   added past the breakpoint, move the breakpoint forward rather than
   appending past it.
5. For multi-turn conversations, rely on the automatic breakpoint that
   advances per request rather than hand-placing breakpoints on each
   turn.
6. When tools, system, long-lived references, and messages change at
   different cadences, use up to four explicit breakpoints — one at the
   trailing edge of each cadence band — but do not exceed four.
7. After a representative run, inspect the response usage:
   `cache_read_input_tokens` should grow as cached prefixes are reused;
   persistently high `cache_creation_input_tokens` on every call means a
   breakpoint sits on changing content and must be moved earlier.
8. Confirm the cacheable prefix meets the model's minimum size before
   relying on caching. Below the threshold the cache will not be used
   even with a correct breakpoint.
9. For skill bundles, keep the SKILL.md section order from the catalog
   spec (Purpose → When to Use → Inputs → Workflow → Outputs →
   Guardrails → Exit Checks) and treat the bundle reference files as
   immutable between releases so they stay in the cached prefix across
   invocations.

# Outputs

- a prompt or skill bundle whose static blocks come first and whose
  variable per-request content comes last
- a single trailing `cache_control` breakpoint on the last byte-stable
  block, or up to four breakpoints aligned to the cadence bands
- a measurement note for any non-obvious decision, citing the
  `cache_read_input_tokens` and `cache_creation_input_tokens` values that
  justified the breakpoint placement
- a review finding when a prompt or skill places variable content ahead
  of static content or puts a breakpoint on changing content

# Guardrails

- do not place `cache_control` on a block that changes per request, even
  when it appears late in the prompt; the breakpoint must sit on a block
  whose bytes are stable across the next batch of invocations
- do not interleave per-request variable content with long-lived
  references; keep variable content trailing
- do not exceed four cache breakpoints in a single prompt
- do not assume caching is active when the cacheable prefix is below the
  model's minimum size threshold; verify by reading the usage block
- do not edit reference, example, or template files inside a skill bundle
  as part of normal per-request work; treat them as immutable between
  releases so the cached prefix stays valid
- do not silently move a breakpoint forward without confirming the
  previous prefix was no longer being reused

# Exit Checks

- the static prefix (tools, system, long-lived references, examples)
  precedes any per-request variable content
- the last `cache_control` breakpoint sits on a byte-stable block, not on
  changing content
- the total number of breakpoints is at most four
- the cacheable prefix meets the target model's minimum token threshold
- a representative invocation shows `cache_read_input_tokens` growing on
  reuse and `cache_creation_input_tokens` falling toward zero after the
  first warm-up call
- bundle reference and example files used inside the cached prefix are
  treated as immutable between releases
