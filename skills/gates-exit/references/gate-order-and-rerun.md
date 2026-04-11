# Gate Order And Rerun

Mandatory exit gates:

1. Build-Gate
2. Test-Gate
3. Correctness-Gate
4. Design-Gate
5. Performance-Gate
6. Convention-Gate
7. Quality-Gate

Evaluate every gate in the sequence above for the bounded change. Do not stop
the run at the first failure.

If one or more gates fail and the implementation is changed to address them,
the next attempt must start again from gate 1 so the final result reflects a
full fresh pass.
