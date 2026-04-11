# Example Value Object Replacement

```java
// Don't
public record PaymentRequest(String orderId, String currency, long amountCents) {}

// Do
public record PaymentRequest(OrderId orderId, CurrencyCode currency, MoneyAmount amount) {}
```

```ts
// Don't
type OrderSummary = {
  orderId: string;
  retryTimeoutMs: number;
};

// Do
type OrderSummary = {
  orderId: OrderId;
  retryTimeout: RetryTimeout;
};
```

The raw representations may still exist at persistence or transport
boundaries, but the domain contract stops using generic types.
