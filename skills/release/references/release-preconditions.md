# Release Preconditions

Before running the release:

- default branch is current
- release-bound PRs are merged
- repository-specific release policy is identified and treated as local input
- final build is green
- final test run is green
- latest release tag and delta are known
- changelog, versioned documentation, and versioned example locations are
  identified

If any of these are missing, stop and surface the missing release input instead
of guessing.
