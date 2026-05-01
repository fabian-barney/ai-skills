# Lombok Config Notes

Distilled from the project's Lombok guidance and the issue contract.

- Keep `lombok.config` committed and explicit.
- Include `lombok.addLombokGeneratedAnnotation = true`.
- Configure `lombok.copyableAnnotations` when framework-required constructor
  annotations need to propagate to Lombok-generated constructors.
- Ensure annotation processing is enabled consistently in build and IDE.
- If JSpecify or another stronger nullness framework is present, use that
  strategy instead of Lombok nullness annotations.
