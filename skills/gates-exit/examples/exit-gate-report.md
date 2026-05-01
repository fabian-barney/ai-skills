# Example Exit Gate Report

- Build-Gate: pass
- Test-Gate: pass
  Behavior changes are covered by updated service tests for order syncing and
  validation.
- Correctness-Gate: fail
  `OrderEntity.equals(...)` still treats two unsaved entities with null ids as
  equal.
- Design-Gate: pass
- Performance-Gate: pass
- Convention-Gate: pass
- Quality-Gate: fail
  `OrderService.sync(...)` still exceeds the CRAP threshold.

Severity-ranked failures:

1. correctness and regression risk:
   `OrderEntity.equals(...)` can merge distinct unsaved entities.
2. maintainability, readability, and test adequacy:
   `OrderService.sync(...)` still exceeds the CRAP threshold.

Overall result: fail. Fix the bounded correctness and quality findings, then
rerun all exit gates from Build-Gate onward.
