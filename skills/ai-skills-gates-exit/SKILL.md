---
name: ai-skills-gates-exit
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
- confirmation that the complete applicable repository rulesets and downstream
  extensions have been read before implementation/gate evaluation
- the repository build and test commands or the strongest equivalent CI/local
  evidence
- the behavior changes in the bounded scope and the tests added or updated for
  each behavior change
- the relevant technologies, languages, and data-access paths touched by the
  bounded change
- the child skills listed in `references/gate-mapping.md` when they apply
- `references/gate-order-and-rerun.md`
- `references/gate-mapping.md`

# Workflow

## Composed Skills

This is a composite skill. It conditionally orchestrates the following children
when they materially apply to the bounded scope:

- Correctness-Gate:
  skill `ai-skills-correctness-equals-hashcode`,
  skill `ai-skills-correctness-comparable`, and
  skill `ai-skills-correctness-jpa`
- Design-Gate:
  skill `ai-skills-design-validation` and
  skill `ai-skills-design-value-object`
- Performance-Gate:
  skill `ai-skills-performance-db`
- Convention-Gate:
  skill `ai-skills-conventions-java`,
  skill `ai-skills-conventions-typescript`, and relevant leaf convention skills
- Quality-Gate:
  skill `ai-skills-quality-crap`,
  skill `ai-skills-quality-cognitive-complexity`, and
  skill `ai-skills-quality-sonar`

## Gate Evaluation

1. Verify that the complete applicable repository rulesets and downstream
   extensions were read before implementation and exit-gate evaluation. If not,
   read them before continuing or mark the gate evaluation blocked.
2. Identify the bounded scope and determine which languages, frameworks,
   persistence paths, and quality signals are relevant.
3. Evaluate the mandatory gates in the order from
   `references/gate-order-and-rerun.md` and record a result for every gate
   instead of stopping at the first failure.
4. For Build-Gate and Test-Gate, attempt the applicable repository commands or
   verify equivalent post-change CI execution before marking either gate passed;
   if execution is blocked, record the blocker explicitly rather than pretending
   the gate passed.
5. For Test-Gate, map every behavior change to an added or updated automated
   test. If a behavior change lacks feasible test coverage, mark the gate failed
   or blocked with the exact risk rationale instead of passing it.
6. For Correctness-Gate, apply the relevant correctness skills from
   `references/gate-mapping.md`, such as
   skill `ai-skills-correctness-equals-hashcode`,
   skill `ai-skills-correctness-comparable`, and
   skill `ai-skills-correctness-jpa`, based on the bounded scope.
7. For Design-Gate, apply the relevant design skills from
   `references/gate-mapping.md`, especially
   skill `ai-skills-design-validation` and
   skill `ai-skills-design-value-object`, when their boundaries are in scope.
8. For Performance-Gate, apply skill `ai-skills-performance-db` when database
   statements or data-access performance are in scope, and record why the gate
   is not applicable when the bounded change does not affect performance
   surfaces.
9. For Convention-Gate, apply the relevant umbrella or leaf convention skills,
   such as skill `ai-skills-conventions-java` or
   skill `ai-skills-conventions-typescript`, based on the changed technology.
10. For Quality-Gate, apply the relevant quality skills from
   `references/gate-mapping.md`, especially
   skill `ai-skills-quality-crap`,
   skill `ai-skills-quality-cognitive-complexity`, and
   skill `ai-skills-quality-sonar`, using the strongest available evidence.
11. Aggregate failed or blocked findings by severity before reporting them:
    correctness/regression, security/privacy/compliance, data integrity/error
    handling, architecture/boundaries, performance/scalability, observability,
    then maintainability/readability/test adequacy.
12. Aggregate the gate results into one bounded-scope decision. If any gate
    fails or remains blocked, fix only the bounded findings and then restart the
    full gate sequence from gate 1 instead of resuming midway.
13. Use `examples/exit-gate-report.md` when communicating the final per-gate
    status and overall outcome.

# Outputs

- a result for each mandatory exit gate, including pass, fail, blocked, or
  not-applicable with explicit rationale
- test-coverage mapping for each behavior change or an explicit failed/blocked
  rationale when coverage is missing
- failed or blocked findings reported in severity order
- an overall exit-gate decision for the bounded change
- a concise rerun requirement when any gate failed or remained blocked

# Guardrails

- do not evaluate exit gates before the applicable ruleset read gate is
  satisfied or explicitly blocked
- do not stop the evaluation after the first failed gate
- do not mark Build-Gate or Test-Gate passed without attempted local execution
  or equivalent post-change CI evidence
- do not mark Test-Gate passed for behavior changes without added or updated
  test coverage unless the gate is explicitly failed or blocked
- do not broaden the implementation scope just to clean unrelated code so a
  gate looks green
- do not skip a mandatory gate without an explicit blocked or not-applicable
  reason
- do not resume from the middle of the gate sequence after applying fixes; rerun
  every mandatory gate from the beginning
- do not claim completion while any mandatory gate is failed or blocked

# Exit Checks

- the applicable ruleset read gate was satisfied before exit-gate evaluation,
  or the evaluation is explicitly blocked
- every mandatory gate has an explicit recorded result
- specialized child skills were used where they materially supported a gate
- build and test gates were actually executed locally or backed by equivalent
  post-change CI evidence before being marked passed
- each behavior change has added or updated test coverage, or Test-Gate is
  failed/blocked with rationale
- any blocked or not-applicable gate has a concrete rationale
- failed and blocked findings are reported in severity order
- the overall decision matches the full set of gate results
- after any fix, the final reported result comes from a full rerun of the gate
  sequence
