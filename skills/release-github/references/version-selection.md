# Version Selection

Select the target version in this order:

1. use the explicit version if the user or repository policy already provides
   one
2. otherwise inspect the changes since the latest reachable tag

Choose the semantic-version bump by strongest change type:

- major: breaking changes, removals, renames, incompatible contract changes
- minor: new user-visible functionality or substantial new capability without a
  breaking change
- patch: clarifications, fixes, or small improvements without new surfaced
  capability

If multiple change types appear, use the highest required bump.

If there are no meaningful release changes, do not create a release just to
advance the version.
