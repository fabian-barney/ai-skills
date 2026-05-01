---
name: ai-skills-security-secrets
description: >-
  Detect unsafe handling of security secrets and credentials in the bounded
  change set. Use when reviewing code, config, docs, CI, or examples for
  hardcoded secrets, unsafe storage, missing redaction, or VCS exposure risk.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Prevent secrets and credentials from being hardcoded, committed, logged, or
handled with unsafe scope and storage practices in the bounded change set.

# When to Use

- use when reviewing code, configuration, CI, docs, examples, or scripts that
  may contain credentials or secret material
- use when checking whether secrets are at risk of being committed to version
  control
- use when evaluating whether secret handling follows secure storage and
  redaction practices
- use `references/secret-handling-baseline.md` for the core secret-handling
  rules
- use `references/vcs-exposure-checks.md` for version-control-specific checks
- use `examples/secret-review-finding.md` when a concrete security finding
  helps

# Inputs

- the bounded diff and changed files
- any configuration, CI, env-file, or documentation changes in scope
- repository ignore-file behavior when secret files or patterns are involved
- available secret-management or runtime-injection mechanisms
- `references/secret-handling-baseline.md` and
  `references/vcs-exposure-checks.md`

# Workflow

1. Inspect the bounded scope for hardcoded credentials, tokens, keys,
   certificates, secrets, or secret-like placeholders that look real.
2. Check whether secret material could be committed, copied into docs/examples,
   or leaked through ignore-file gaps.
3. Check whether logs, telemetry, errors, or test artifacts could expose secret
   values or sensitive payloads.
4. Prefer secure runtime injection or secret managers over checked-in storage.
5. When exposure is found, recommend removal from source control, redaction,
   rotation, and the narrowest safe replacement pattern.
6. Use `references/vcs-exposure-checks.md` to verify `.gitignore` and commit
   hygiene expectations.
7. Use `examples/secret-review-finding.md` when reporting the issue as a review
   finding.

# Outputs

- a bounded-scope pass or fail decision for secret handling
- explicit findings for hardcoded, exposed, or weakly handled secrets
- concise remediation guidance covering removal, redaction, rotation, and safe
  replacement patterns

# Guardrails

- do not treat committed secrets as a minor quality issue
- do not recommend storing real secrets in examples or docs
- do not assume redaction is sufficient when a secret was committed to VCS
- do not broaden this skill into general authorization or vulnerability review

# Exit Checks

- the bounded scope was checked for committed or hardcoded secret material
- any logging or documentation exposure risk is called out explicitly
- VCS exposure risk is covered when secret files or values are involved
- remediation guidance is concrete and security-safe
