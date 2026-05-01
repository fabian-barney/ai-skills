# Example Java Validation Split

```java
record CreateUserRequest(@NotBlank String email, @Min(1) int retryLimit) {}

@RestController
@RequiredArgsConstructor
final class UserController {

  private final UserService userService;

  @PostMapping("/users")
  UserResponse createUser(@Valid @RequestBody CreateUserRequest request) {
    return userService.createUser(request.email(), request.retryLimit());
  }
}
```

```java
final class UserService {

  UserResponse createUser(String email, int retryLimit) {
    if (retryLimit < 1) {
      throw new IllegalArgumentException("retryLimit must be >= 1");
    }
    // business logic
    return new UserResponse(email);
  }
}
```

Boundary input uses standard validation. Internal invariant misuse fails fast.
