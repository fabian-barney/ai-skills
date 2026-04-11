# Sonar Profile Guidance

When a project exposes a quality profile, treat that profile as the effective
policy baseline for Sonar findings.

If a specialized profile exists, such as an AI-oriented Java profile, use it as
the strongest available policy signal for the affected language or toolchain.
If the active profile is unknown, state that gap explicitly instead of
inventing profile assumptions.

Use profile context to explain why a finding matters, but keep the remediation
bounded to the current change.
