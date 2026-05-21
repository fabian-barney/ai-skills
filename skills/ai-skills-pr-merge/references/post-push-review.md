# Post-Push Review Requirement

A review that predates the latest push does not satisfy the merge gate.

After each push:

- wait for the new review pass to complete
- treat a review still in progress as a blocked merge state
- verify that the latest review covers the current head commit
- when strict GitHub Copilot or similar automated review discipline is
  required, verify the latest head review came from the approved platform or
  API trigger flow rather than PR comments or `@copilot` mentions

Passing CI alone is never enough to merge.
