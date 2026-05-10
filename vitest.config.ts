import { withCognitiveTypescriptVitest } from "@barney-media/cognitive-typescript-vitest";
import { withCrapTypescriptVitest } from "@barney-media/crap-typescript-vitest";

import baseConfig from "./vitest.base.config";

export default withCognitiveTypescriptVitest(
  withCrapTypescriptVitest(baseConfig, {
    failuresOnly: true,
    format: "text",
    junit: false,
    packageManager: "pnpm",
    paths: ["src"],
    projectRoot: process.cwd()
  }),
  {
    paths: ["src"],
    projectRoot: process.cwd()
  }
);
