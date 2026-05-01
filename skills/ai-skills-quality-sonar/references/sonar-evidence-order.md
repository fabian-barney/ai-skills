# Sonar Evidence Order

Prefer evidence in this order:

1. CI or PR-integrated Sonar/Sonar-like report for the current head
2. local analyzer or IDE result for the same bounded scope
3. explicitly labeled estimate when no analyzer result is available

Keep the decision bounded to the current change set. A repository with existing
legacy findings can still fail the current bounded scope if the change adds or
touches relevant Sonar issues.
