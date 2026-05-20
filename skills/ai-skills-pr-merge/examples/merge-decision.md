# Example Merge Decision

Merge-ready:

- latest push has a completed review pass
- strict post-push automated review evidence came from the approved platform or
  API trigger flow, not PR comments
- all required checks are green
- no review threads remain unresolved
- protected-branch discipline is satisfied by a feature branch and PR
- PR body links the main issue with `Closes #42`
- merge authority is valid for the requested merger
- merge can proceed without force, admin-bypass, or skipped required gates
