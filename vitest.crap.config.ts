import { withCrapTypescriptVitest } from "@barney-media/crap-typescript-vitest";

import baseConfig from "./vitest.base.config";

export default withCrapTypescriptVitest(baseConfig, {
  failuresOnly: true,
  format: "text",
  junit: false,
  packageManager: "pnpm",
  paths: ["src"],
  projectRoot: process.cwd()
});
