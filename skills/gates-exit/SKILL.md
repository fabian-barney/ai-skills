---
name: gates-exit
description: >-
  Evaluate the mandatory exit gates for a bounded implementation before it is
  considered done. Use when build, test, correctness, design, performance,
  convention, and quality gates all need an explicit per-gate result.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Apply the mandatory end-of-implementation exit gates to the bounded change so a
result is only considered complete after all required gates have been evaluated
and passed.

# When to Use

- use at the end of implementation before calling the work done, opening the
  final PR, or merging
- use when multiple specialized gate skills may apply to the same bounded
  change
- use when failures must be aggregated instead of stopping at the first failed
  gate
- use `references/gate-order-and-rerun.md` for the mandatory gate order and
  full-rerun rule
- use `references/gate-mapping.md` for how each mandatory gate maps to child
  skills or repo-local evidence
- use `examples/exit-gate-report.md` when reporting the per-gate result set

# Inputs

- the bounded diff, changed files, and implementation goal
- the repository build and test commands or the strongest equivalent CI/local
  evidence
- the relevant technologies, languages, and data-access paths touched by the
  bounded change
- the child skills listed in `references/gate-mapping.md` when they apply
- `references/gate-order-and-rerun.md`
- `references/gate-mapping.md`

# Workflow

1. Identify the bounded scope and determine which languages, frameworks,
   persistence paths, and quality signals are relevant.
2. Evaluate the mandatory gates in the order from
   `references/gate-order-and-rerun.md` and record a result for every gate
   instead of stopping at the first failure.
3. For Build-Gate and Test-Gate, use the strongest available repository build
   and test evidence; if execution is blocked, record the blocker explicitly
   rather than pretending the gate passed.
4. For Correctness-Gate, apply the relevant correctness skills from
   `references/gate-mapping.md`, such as
   `../correctness-equals-hashcode/SKILL.md`,
   `../correctness-comparable/SKILL.md`, and
   `../correctness-jpa/SKILL.md`, based on the bounded scope.
5. For Design-Gate, apply the relevant design skills from
   `references/gate-mapping.md`, especially
   `../design-validation/SKILL.md` and
   `../design-value-object/SKILL.md`, when their boundaries are in scope.
6. For Performance-Gate, apply `../performance-db/SKILL.md` when database
   statements or data-access performance are in scope, and record why the gate
   is not applicable when the bounded change does not affect performance
   surfaces.
7. For Convention-Gate, apply the relevant umbrella or leaf convention skills,
   such as `../conventions-java/SKILL.md` or
   `../conventions-typescript/SKILL.md`, based on the changed technology.
8. For Quality-Gate, apply the relevant quality skills from
   `references/gate-mapping.md`, especially
   `../quality-crap/SKILL.md`,
   `../quality-cognitive-complexity/SKILL.md`, and
   `../quality-sonar/SKILL.md`, using the strongest available evidence.
9. Aggregate the gate results into one bounded-scope decision. If any gate
   fails or remains blocked, fix only the bounded findings and then restart the
   full gate sequence from gate 1 instead of resuming midway.
10. Use `examples/exit-gate-report.md` when communicating the final per-gate
    status and overall outcome.

# Outputs

- a result for each mandatory exit gate, including pass, fail, blocked, or
  not-applicable with explicit rationale
- an overall exit-gate decision for the bounded change
- a concise rerun requirement when any gate failed or remained blocked

# Guardrails

- do not stop the evaluation after the first failed gate
- do not broaden the implementation scope just to clean unrelated code so a
  gate looks green
- do not skip a mandatory gate without an explicit blocked or not-applicable
  reason
- do not resume from the middle of the gate sequence after applying fixes; rerun
  every mandatory gate from the beginning
- do not claim completion while any mandatory gate is failed or blocked

# Exit Checks

- every mandatory gate has an explicit recorded result
- specialized child skills were used where they materially supported a gate
- any blocked or not-applicable gate has a concrete rationale
- the overall decision matches the full set of gate results
- after any fix, the final reported result comes from a full rerun of the gate
  sequence
