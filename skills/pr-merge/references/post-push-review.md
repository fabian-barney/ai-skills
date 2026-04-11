# Post-Push Review Requirement

A review that predates the latest push does not satisfy the merge gate.

After each push:

- wait for the new review pass to complete
- treat a review still in progress as a blocked merge state
- verify that the latest review covers the current head commit

Passing CI alone is never enough to merge.
