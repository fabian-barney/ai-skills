# Example DB Performance Finding

`OrderRepository.findRecentForCustomer(...)` fails `ai-skills-performance-db` for the
bounded scope.

Evidence: the changed statement loads all columns from `orders`, sorts by
`created_at DESC`, and filters by `customer_id`, but no supporting
`(customer_id, created_at)` access path is visible for the expected hot-path
read. The current design also issues one follow-up query per order for line
items.

Next step: narrow the projection, replace the per-order follow-up reads with a
batched fetch or explicit join/projection strategy, and validate the final
statement against the expected index path.
