# Example Local Skill Improvement Entry

Title: Improve existing review skill with reviewer-response guidance
Change type: improve
Proposed skill id/name: pr-review
Problem or motivation: current review handling guidance identifies findings but
does not yet define a reusable response-writing child skill
Why reusable beyond the originating task: the same response-writing gap appears
whenever valid findings need concise, respectful replies
When to use / trigger: when working with PR review findings that need a
reviewer-facing response rather than only a code change
Rough workflow or responsibilities: add a child skill that classifies the
finding, drafts the response, and leaves merge or loop orchestration to later
skills
Related skills or dependencies: pr-review, pr-review-write, pr-review-loop
Source context or notes: captured while handling review findings on a company
laptop without permission to create a central GitHub issue
Status: idea
