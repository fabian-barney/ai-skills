# Review Finding Shape

Each finding should include:

- severity
- impacted file or path reference
- concrete issue description
- why it matters
- actionable remediation guidance

Prefer one finding per distinct problem so implementers can respond cleanly.

When the finding concerns a dependency or tooling addition, include:

- why the new dependency or tool is needed
- whether an existing project dependency or tool already covers the need
- license compatibility
- security or transitive-risk considerations

Full-review coverage belongs to the orchestrating review workflow. This leaf
skill writes individual findings, but it should preserve coverage context when
the orchestrator identified top-risk categories, semantic parent-rule
violations, dependency/tooling additions, or test and verification gaps.
