import { withCognitiveTypescriptVitest } from "@barney-media/cognitive-typescript-vitest";

import baseConfig from "./vitest.base.config";

export default withCognitiveTypescriptVitest(baseConfig, {
  paths: ["src"],
  projectRoot: process.cwd()
});
