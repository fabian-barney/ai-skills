import { withCrapTypescriptVitest } from "@barney-media/crap-typescript-vitest";

import baseConfig from "./vitest.base.config";

export default withCrapTypescriptVitest(baseConfig, {
  packageManager: "pnpm",
  paths: ["src"],
  projectRoot: process.cwd()
});
