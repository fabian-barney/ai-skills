# Example Ternary Simplification

```java
// Don't
if (hasDiscount(order)) {
  return discountedTotal(order);
}
return regularTotal(order);

// Do
return hasDiscount(order) ? discountedTotal(order) : regularTotal(order);
```

```java
// Don't
boolean requiresSync = order.isRemote() ? true : order.isShared();

// Do
boolean requiresSync = order.isRemote() || order.isShared();
```

```java
// Don't
sendNotification(user.isAnonymous() ? anonymousTemplate() : registeredTemplate());

// Do
Template template = user.isAnonymous()
    ? anonymousTemplate()
    : registeredTemplate();
sendNotification(template);
```
