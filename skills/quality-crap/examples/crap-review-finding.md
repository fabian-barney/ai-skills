# Example CRAP Finding

The bounded change still fails `quality-crap`.

- `OrderRetryService#retryFailedOrders`: CRAP `11.2`
- threshold: `<= 8`
- evidence source: local `crap-java-check`

Suggested next step: flatten the nested retry/error handling branches and add a
focused test for the timeout path before re-running the gate.
