import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { onTestFinished, test } from "vitest";

import {
  WEEK_MS,
  buildToolCommand,
  createDefaultDeps,
  parseMavenLatestVersion,
  parseNpmLatestVersion,
  resolveTool,
  shouldRefreshMetadata
} from "../skills/ai-skills-quality-cognitive-complexity/scripts/run-cognitive-cli.mjs";

test("parses latest cognitive CLI versions from npm and Maven metadata", () => {
  assert.equal(
    parseNpmLatestVersion({
      "dist-tags": {
        latest: "0.2.1"
      }
    }),
    "0.2.1"
  );
  assert.equal(
    parseMavenLatestVersion([
      "<metadata>",
      "  <versioning>",
      "    <latest>0.6.0</latest>",
      "    <release>0.5.1</release>",
      "  </versioning>",
      "</metadata>"
    ].join("\n")),
    "0.6.0"
  );
});

test("refreshes cached cognitive CLI metadata at most weekly", () => {
  const now = Date.parse("2026-06-01T12:00:00Z");
  const sixDaysAgo = new Date(now - WEEK_MS + 1).toISOString();
  const sevenDaysAgo = new Date(now - WEEK_MS).toISOString();

  assert.equal(shouldRefreshMetadata(sixDaysAgo, now), false);
  assert.equal(shouldRefreshMetadata(sevenDaysAgo, now), true);
  assert.equal(shouldRefreshMetadata("not-a-date", now), true);
});

test("builds cognitive CLI commands for TypeScript and Java tools", () => {
  assert.deepEqual(
    buildToolCommand("typescript", "cache/cognitive-typescript/dist/bin.js", [
      "--agent",
      "--threshold",
      "15",
      "src"
    ]),
    {
      command: process.execPath,
      args: ["cache/cognitive-typescript/dist/bin.js", "--agent", "--threshold", "15", "src"]
    }
  );
  assert.deepEqual(
    buildToolCommand("java", "cache/cognitive-java-cli.jar", ["--agent", "--threshold", "15"]),
    {
      command: "java",
      args: ["-jar", "cache/cognitive-java-cli.jar", "--agent", "--threshold", "15"]
    }
  );
});

test("falls back to a cached cognitive CLI when weekly metadata refresh is offline", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "typescript");
  const executablePath = path.join(
    languageRoot,
    "0.2.0",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const warnings: string[] = [];

  await fs.mkdir(path.dirname(executablePath), { recursive: true });
  await fs.writeFile(executablePath, "#!/usr/bin/env node\n");
  await fs.writeFile(
    path.join(languageRoot, "state.json"),
    JSON.stringify({
      checkedAt: "2026-05-01T00:00:00.000Z",
      version: "0.2.0"
    })
  );

  const deps = {
    ...createDefaultDeps(),
    cacheRoot,
    fetchJson: async () => {
      throw new Error("offline");
    },
    now: () => Date.parse("2026-06-01T00:00:00.000Z"),
    warn: (message: string) => {
      warnings.push(message);
    }
  };

  const tool = await resolveTool("typescript", deps);

  assert.equal(tool.version, "0.2.0");
  assert.equal(tool.executablePath, executablePath);
  assert.equal(tool.stale, true);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Using cached cognitive typescript CLI 0\.2\.0/);
});

async function createTempDir() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-cognitive-cli-"));

  onTestFinished(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  return tempDir;
}
