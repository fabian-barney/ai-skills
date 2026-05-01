# Example Review Finding

High - `service/order/OrderService.java:87`: validation is bypassed for the
bulk-import path, so malformed input can persist inconsistent state. Reuse the
same validation path as the normal create flow and add a regression test for
the failing import case.
