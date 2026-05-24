# Release Preconditions

Before running the release:

- default branch is current
- release-bound PRs are already merged, or any release-bound PRs that still
  must land before publication are explicitly identified for the shared PR
  review loop
- repository-specific release policy is identified and treated as local input
- final build is green
- final test run is green
- latest release tag and delta are known
- any public-registry release target that would ship unrelated unreleased
  default-branch work is identified before source-branch selection
- the exact scoped release change is identified when an isolated public release
  may be required
- changelog, versioned documentation, and versioned example locations are
  identified
- if preflight CI evidence is being used, it is clear whether that preflight
  mirrors the tag-triggered release-only checks; otherwise treat preflight as
  release-plumbing evidence rather than full publication-parity evidence

If any of these are missing, stop and surface the missing release input instead
of guessing.
