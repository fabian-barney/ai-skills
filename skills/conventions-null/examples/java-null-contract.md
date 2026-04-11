# Example Java Null Contract

```java
import java.util.List;
import java.util.Optional;

import org.jspecify.annotations.NullMarked;
import org.jspecify.annotations.Nullable;

@NullMarked
public final class OrderSummaryService {

  public List<OrderSummary> summariesFor(CustomerId customerId) {
    return repository.findByCustomer(customerId);
  }

  public Optional<OrderSummary> summaryFor(OrderId orderId) {
    return repository.findById(orderId);
  }

  public void applyBoundaryPatch(@Nullable List<String> tagsFromPayload) {
    if (tagsFromPayload == null) {
      boundaryState.markTagsAbsent();
      return;
    }
    boundaryState.setTags(List.copyOf(tagsFromPayload));
  }
}
```

`tagsFromPayload` is nullable only at the boundary where `absent` and `empty`
have different meaning. Outside that boundary, collections stay non-null.
