# Secret Handling Baseline

- never commit secrets to source control, docs, examples, logs, or snapshots
- use secret managers or secure runtime injection where available
- keep secret scope minimal and environment-specific
- redact secrets in logs, telemetry, and error messages
- rotate secrets on exposure or when ownership changes

Treat exposed secrets as a remediation issue, not just a formatting problem.
