# Release Preconditions

Before running the release:

- default branch is current
- release-bound PRs are merged
- final build is green
- final test run is green
- latest release tag and delta are known
- changelog and versioned documentation locations are identified

If any of these are missing, stop and surface the missing release input instead
of guessing.
