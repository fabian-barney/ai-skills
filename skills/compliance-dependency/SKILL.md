---
name: compliance-dependency
description: >-
  Evaluate dependency additions and upgrades for compliance and governance
  risk. Use when selecting, adding, upgrading, or reviewing third-party
  dependencies for license compatibility, stewardship, transitive risk, and
  notice obligations.
---
<!-- markdownlint-disable MD025 -->

# Purpose

Prevent dependency changes from introducing license, governance, or stewardship
risks that are incompatible with commercial closed-source delivery.

# When to Use

- use when adding, upgrading, or reviewing direct or significant transitive
  dependencies
- use when evaluating whether a dependency is mature and governed well enough
  for adoption
- use when a dependency change may affect attribution, notice, or legal review
  obligations
- use `references/license-decision-framework.md` for the dependency compliance
  decision order
- use `references/dependency-selection-baseline.md` for maturity, stewardship,
  and selection guidance
- use `examples/dependency-compliance-finding.md` when a concrete finding helps

# Inputs

- the proposed dependency addition, upgrade, or removal
- the dependency tree or strongest available transitive dependency view
- authoritative license information such as SPDX metadata and upstream license
  files
- release or distribution context if notice obligations matter
- `references/license-decision-framework.md` and
  `references/dependency-selection-baseline.md`

# Workflow

1. Identify the dependency change and its bounded direct and significant
   transitive impact.
2. Verify the authoritative license information instead of trusting a single
   package-registry field.
3. Classify the license risk as compatible, conditional, or blocked for the
   current distribution model. Treat conditional cases as requiring escalation
   before approval because obligations, restrictions, or uncertainty still need
   resolution.
4. Check maturity, stewardship, maintenance signals, and overlap with existing
   dependencies.
5. Identify notice, attribution, or third-party notices file obligations that
   the change introduces.
6. Escalate conditional or restricted licenses, unknown/custom licenses, and
   weak governance signals instead of silently accepting them.
7. Use `examples/dependency-compliance-finding.md` when reporting the resulting
   dependency risk.

# Outputs

- a dependency compliance pass or fail decision for the bounded change
- explicit license, governance, or notice findings when risk remains
- a clear escalation or follow-up path for conditional or unknown cases

# Guardrails

- do not approve a dependency based only on registry metadata
- do not ignore significant transitive license risk
- do not treat weak governance or unmaintained libraries as neutral by default
- do not broaden this skill into runtime API usage guidance

# Exit Checks

- direct and significant transitive dependency risk was considered
- license compatibility and notice obligations are explicit
- maturity and stewardship signals are part of the decision
- blocked or conditional cases are escalated clearly
