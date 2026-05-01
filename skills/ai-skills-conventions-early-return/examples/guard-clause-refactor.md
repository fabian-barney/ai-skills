# Example Guard-Clause Refactor

```java
// Don't
if (isValid(request)) {
  if (hasActiveSession(user)) {
    if (!isTokenExpired(token)) {
      process(request);
    }
  }
}

// Do
if (!isValid(request)) return;
if (!hasActiveSession(user)) return;
if (isTokenExpired(token)) return;
process(request);
```

```java
// Guard-style ternary
return value == null ? null : map(value);
```
