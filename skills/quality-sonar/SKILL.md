---
name: quality-sonar
description: >-
  Evaluate the bounded change set against Sonar or Sonar-like static-analysis
  findings and quality profiles. Use when CI, SonarQube, SonarLint, or a
  similar analyzer reports issues for the current scope.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Use Sonar or Sonar-like analysis as quality evidence for the bounded change set
so newly introduced issues are surfaced, classified, and reduced before merge.

# When to Use

- use when SonarQube, SonarLint, or another Sonar-like analyzer reports issues
  for the current branch, PR, or bounded change set
- use when a repository relies on Sonar-like quality profiles or rule packs
- use when specialized profiles exist, such as AI-oriented or language-specific
  profiles, and they influence which findings matter most
- use `references/sonar-evidence-order.md` for evidence priority and bounded
  scope handling
- use `references/sonar-profile-guidance.md` for profile-selection and
  specialized-profile guidance
- use `examples/sonar-review-finding.md` when a concrete review-finding shape
  helps

# Inputs

- the bounded diff, changed files, or changed methods under review
- the strongest available Sonar or Sonar-like report for that scope
- the active quality profile, profile name, or equivalent ruleset if known
- relevant tests or refactor options for reducing reported issues
- `references/sonar-evidence-order.md` and
  `references/sonar-profile-guidance.md`

# Workflow

1. Gather the strongest available Sonar or Sonar-like evidence for the bounded
   scope, preferring CI or PR-integrated results over manual recollection.
2. Identify which findings belong to the current change set instead of
   re-auditing the whole codebase.
3. When the project exposes a named quality profile, use that profile as the
   policy baseline and note any specialized profile in effect.
4. Treat relevant new or changed-scope findings as issues to resolve, justify,
   or explicitly defer; do not ignore them as generic background noise.
5. Reduce findings with the narrowest behavior-preserving change available,
   such as refactoring, clearer null handling, simpler control flow, or focused
   tests.
6. Re-run or re-read the strongest available report after changes and record
   the remaining bounded-scope findings, if any.
7. Use `examples/sonar-review-finding.md` when reporting the remaining issue or
   final pass result.

# Outputs

- a bounded-scope pass or fail decision based on Sonar or Sonar-like evidence
- explicit findings for remaining bounded-scope issues
- a short note of the profile or rule context when it materially affects the
  decision

# Guardrails

- do not treat whole-repository legacy noise as proof that the current change
  is clean
- do not ignore a specialized active quality profile when one is configured
- do not claim a Sonar pass without report evidence or an explicitly labeled
  estimate
- do not broaden this skill into general code review beyond Sonar-driven
  quality evidence

# Exit Checks

- the bounded scope is backed by Sonar or Sonar-like evidence, or an explicit
  missing-evidence note
- remaining findings are tied to the current scope rather than generic repo
  debt
- the active profile context is stated when it materially changes the decision
- the final result is concise enough for review or gate flow
