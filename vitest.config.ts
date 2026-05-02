import { withCognitiveTypescriptVitest } from "@barney-media/cognitive-typescript-vitest";
import { withCrapTypescriptVitest } from "@barney-media/crap-typescript-vitest";
import { defineConfig } from "vitest/config";

const baseConfig = defineConfig({
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

export default withCognitiveTypescriptVitest(
  withCrapTypescriptVitest(baseConfig, {
    packageManager: "pnpm",
    paths: ["src"],
    projectRoot: process.cwd()
  }),
  {
    paths: ["src"],
    projectRoot: process.cwd()
  }
);
