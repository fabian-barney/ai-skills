# Example Exit Gate Report

- Build-Gate: pass
- Test-Gate: pass
- Correctness-Gate: fail
  `OrderEntity.equals(...)` still treats two unsaved entities with null ids as
  equal.
- Design-Gate: pass
- Performance-Gate: pass
- Convention-Gate: pass
- Quality-Gate: fail
  `OrderService.sync(...)` still exceeds the CRAP threshold.

Overall result: fail. Fix the bounded correctness and quality findings, then
rerun all exit gates from Build-Gate onward.
