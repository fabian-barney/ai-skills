# DB Statement Review Checklist

Prefer the strongest available evidence in this order:

1. actual SQL plus execution plan for the bounded path
2. actual SQL plus SQL logs or query-count evidence
3. generated SQL or ORM query description
4. repository/query-builder code when no stronger statement evidence exists

For each bounded statement:

1. identify the exact result shape the use case needs
2. verify the statement does not fetch more rows or columns than necessary
3. check whether the same result can be produced with fewer round trips or a
   tighter statement shape
4. check whether loops, serialization, or resolver-style access can trigger
   repeated follow-up queries
5. prefer an explicit evidence gap over pretending the query is safe
