import {
  COGNITIVE_COMPLEXITY_THRESHOLD,
  NO_ANALYZABLE_FUNCTIONS_MESSAGE,
  NO_FILES_MESSAGE,
  analyzeProject,
  formatReport
} from "@barney-media/cognitive-typescript-core";
import { resolve } from "node:path";

const targets = process.argv.slice(2).map((target) => resolve(target));

if (targets.length === 0) {
  console.error("Usage: node ./scripts/run-cognitive-typescript-gate.mjs <path...>");
  process.exit(1);
}

const result = await analyzeProject({
  explicitPaths: targets,
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

console.log(formatReport(result.metrics));

if (result.thresholdExceeded) {
  console.error(
    `Cognitive Complexity threshold exceeded: ${result.maxCognitiveComplexity} > ${COGNITIVE_COMPLEXITY_THRESHOLD}`
  );
  process.exit(2);
}
