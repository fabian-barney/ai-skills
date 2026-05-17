# Upstream ai-instructions Source

Authoritative upstream repository:

- `https://github.com/fabian-barney/ai-instructions`

Use that repository as the source of truth for bootstrap and setup of the
downstream `ai-instructions` layer.

Rules:

- follow setup instructions from the upstream repository when they exist
- if the upstream repository does not provide usable setup instructions, stop
  blocked and report that documentation gap explicitly
- do not recreate, paraphrase, or inline replacement setup steps inside
  `ai-skills-bootstrap-ai-instructions`
- keep this skill focused on local integration boundaries and project-owned
  extensions after the upstream setup source is known
