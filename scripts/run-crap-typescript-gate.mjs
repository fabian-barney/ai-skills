import {
  NO_ANALYZABLE_FUNCTIONS_MESSAGE,
  NO_FILES_MESSAGE,
  analyzeProject,
  formatAnalysisReport
} from "@barney-media/crap-typescript-core";
import { resolve } from "node:path";

const targets = process.argv.slice(2).map((target) => resolve(target));

if (targets.length === 0) {
  console.error("Usage: node ./scripts/run-crap-typescript-gate.mjs <path...>");
  process.exit(1);
}

const result = await analyzeProject({
  explicitPaths: targets,
  coverageMode: "existing-only",
  coverageReportPath: "coverage/coverage-final.json",
  projectRoot: process.cwd()
});

if (result.selectedFiles.length === 0) {
  console.log(NO_FILES_MESSAGE);
  process.exit(0);
}

if (result.metrics.length === 0) {
  console.log(NO_ANALYZABLE_FUNCTIONS_MESSAGE);
  process.exit(0);
}

for (const warning of result.warnings) {
  console.error(warning);
}

console.log(
  formatAnalysisReport(result.metrics, {
    agent: true,
    format: "text",
    threshold: result.threshold
  })
);

if (result.metrics.some((metric) => metric.coverage.status === "unknown")) {
  console.error(
    "CRAP analysis requires the existing coverage artifact to be available for every analyzable method."
  );
  process.exit(1);
}

if (result.thresholdExceeded) {
  console.error(`CRAP threshold exceeded: ${result.maxCrap} > ${result.threshold}`);
  process.exit(2);
}
