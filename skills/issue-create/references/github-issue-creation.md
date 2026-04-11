# GitHub Issue Creation

Prefer body-file based publication when working through the GitHub CLI.

- use `gh issue create --title <title> --body-file <path>` for new issues
- use `gh issue edit <number> --title <title> --body-file <path>` for updates
- use raw Markdown with real newlines, not escaped `\n` sequences
- verify the rendered issue preserves headings, bullets, and code blocks
- apply labels or assignees only when they are known and supported by the
  current repository context
