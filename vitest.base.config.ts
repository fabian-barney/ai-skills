import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "json"],
      reportsDirectory: "coverage"
    },
    include: ["test/**/*.test.ts"],
    testTimeout: 120000
  }
});
