# Sonar Profile Guidance

When a project exposes a quality profile, treat the active or selected profile
for the current analysis as the effective policy baseline for Sonar findings.

If a specialized profile exists, such as an AI-oriented Java profile, only use
it as the strongest policy signal when it is explicitly the active or selected
profile for the affected language or toolchain. Otherwise, mention it only as
additional evidence, not as the baseline ruleset. If the active profile is
unknown, state that gap explicitly instead of inventing profile assumptions.

Use profile context to explain why a finding matters, but keep the remediation
bounded to the current change.
