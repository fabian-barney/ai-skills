# Example Java String Format Refactor

```java
// Don't
String message = "User " + username + " has " + count + " pending tasks.";
```

```java
// Do
String message = String.format(
    "User %s has %d pending tasks.",
    username,
    count
);
```

This refactor is the Java default when a literal template is combined with
variables outside hot loops or append-heavy code paths.
