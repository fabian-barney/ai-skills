# VCS Exposure Checks

Check whether the bounded scope introduces or weakens any of these protections:

- ignore rules for `.env`, `.env.*`, key stores, certificate/key files, or
  other secret-bearing artifacts
- documentation or examples that include real credentials or realistic-looking
  live tokens
- scripts or CI config that inline secrets instead of reading from secure
  secret storage

If a secret has already been committed, remediation should cover:

- removing it from tracked files
- rotating the secret
- reviewing whether history cleanup is required in the affected repository
