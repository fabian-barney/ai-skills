# Example TypeScript Multiline Arguments

```ts
// Don't
buildWidget(primaryColor, secondaryColor, borderRadius, shadowOpacity);
```

```ts
// Do
buildWidget(
  primaryColor,
  secondaryColor,
  borderRadius,
  shadowOpacity,
);
```

The same multiline rule applies to TypeScript parameter lists, array literals,
object literals, and similar comma-separated structures once they reach four or
more elements.
