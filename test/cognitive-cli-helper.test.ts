import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { onTestFinished, test } from "vitest";

import {
  WEEK_MS,
  buildToolCommand,
  createDefaultDeps,
  downloadFile,
  fetchJson,
  fetchText,
  getCacheRoot,
  npmCommandSpec,
  parseCliRequest,
  parseMavenLatestVersion,
  parseNpmLatestVersion,
  parseSha256Checksum,
  resolveTool,
  run,
  safeVersionPathSegment,
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
  assert.equal(parseSha256Checksum("ABCDEF".padEnd(64, "0")), "abcdef".padEnd(64, "0"));
  assert.equal(safeVersionPathSegment("1.2.3-alpha+1", "test version"), "1.2.3-alpha+1");
  assert.throws(
    () => parseNpmLatestVersion({ "dist-tags": { latest: "../bin" } }),
    /safe version path segment/u
  );
  assert.throws(
    () => parseMavenLatestVersion("<metadata><versioning><latest>1/2</latest></versioning></metadata>"),
    /safe version path segment/u
  );
});

test("trims cognitive helper cache root overrides", () => {
  const cacheDir = path.join(os.tmpdir(), "ai-skills-cognitive-cache-root");

  assert.equal(
    getCacheRoot({ AI_SKILLS_TOOL_CACHE_DIR: ` ${cacheDir} ` }, process.platform),
    path.resolve(cacheDir, "ai-skills-quality-cognitive-complexity")
  );
});

test("parses cognitive helper requests with an optional argument separator", () => {
  assert.deepEqual(parseCliRequest(["typescript", "--", "--agent", "src"]), {
    ok: true,
    language: "typescript",
    toolArgs: ["--agent", "src"]
  });
  assert.deepEqual(parseCliRequest(["java", "--agent", "src"]), {
    ok: true,
    language: "java",
    toolArgs: ["--agent", "src"]
  });
  assert.match(parseCliRequest(["ruby"]).message, /\[--\]/u);
});

test("refreshes cached cognitive CLI metadata at most weekly", () => {
  const now = Date.parse("2026-06-01T12:00:00Z");
  const sixDaysAgo = new Date(now - WEEK_MS + 1).toISOString();
  const sevenDaysAgo = new Date(now - WEEK_MS).toISOString();
  const future = new Date(now + 1).toISOString();

  assert.equal(shouldRefreshMetadata(sixDaysAgo, now), false);
  assert.equal(shouldRefreshMetadata(sevenDaysAgo, now), true);
  assert.equal(shouldRefreshMetadata(future, now), true);
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

test("resolves npm through bundled CLI paths before falling back to PATH", async () => {
  const npmCli = path.resolve(
    path.dirname(process.execPath),
    "..",
    "lib",
    "node_modules",
    "npm",
    "bin",
    "npm-cli.js"
  );
  const deps = {
    ...createDefaultDeps(),
    exists: async (candidate: string) => candidate === npmCli
  };

  assert.deepEqual(await npmCommandSpec(deps, "linux"), {
    command: process.execPath,
    args: [npmCli]
  });
  assert.deepEqual(await npmCommandSpec({ ...deps, exists: async () => false }, "win32"), {
    command: "npm.cmd",
    args: [],
    shell: true
  });
});

test("installs TypeScript cognitive CLIs without lifecycle scripts and keeps cleanup best-effort", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "typescript");
  const executablePath = path.join(
    languageRoot,
    "0.2.1",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const runCalls: Array<{ args: string[] }> = [];
  const warnings: string[] = [];
  let installed = false;

  const deps = {
    ...createDefaultDeps(),
    cacheRoot,
    exists: async (candidate: string) => installed && candidate === executablePath,
    fetchJson: async () => ({
      "dist-tags": {
        latest: "0.2.1"
      }
    }),
    now: () => Date.parse("2026-06-01T00:00:00.000Z"),
    readDir: async () => [
      {
        isDirectory: () => true,
        name: "0.2.0"
      },
      {
        isDirectory: () => true,
        name: "..evil"
      }
    ],
    rm: async () => {
      throw new Error("locked");
    },
    runProcess: async (_command: string, args: string[]) => {
      runCalls.push({ args });
      await fs.mkdir(path.dirname(executablePath), { recursive: true });
      await fs.writeFile(executablePath, "");
      installed = true;
      return 0;
    },
    warn: (message: string) => {
      warnings.push(message);
    }
  };

  const tool = await resolveTool("typescript", deps);

  assert.equal(tool.executablePath, executablePath);
  assert.equal(tool.stale, false);
  assert.equal(runCalls.length, 1);
  assert.ok(runCalls[0]?.args.includes("--ignore-scripts"));
  assert.match(warnings.join("\n"), /Ignoring unsafe outdated cognitive typescript CLI directory/u);
  assert.match(warnings.join("\n"), /Could not remove outdated cognitive typescript CLI 0\.2\.0/u);
});

test("validates downloaded Java cognitive CLIs against Maven SHA-256 checksums", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "java");
  const jarBytes = Buffer.from("jar-bytes");
  const checksum = createHash("sha256").update(jarBytes).digest("hex");
  const executablePath = path.join(languageRoot, "0.6.0", "cognitive-java-cli-0.6.0.jar");

  const deps = {
    ...createDefaultDeps(),
    cacheRoot,
    downloadFile: async (_url: string, filePath: string) => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, jarBytes);
    },
    fetchText: async (url: string) => url.endsWith(".sha256")
      ? checksum
      : [
        "<metadata>",
        "  <versioning>",
        "    <latest>0.6.0</latest>",
        "  </versioning>",
        "</metadata>"
      ].join("\n"),
    now: () => Date.parse("2026-06-01T00:00:00.000Z")
  };

  const tool = await resolveTool("java", deps);

  assert.equal(tool.executablePath, executablePath);
  assert.equal(tool.version, "0.6.0");
});

test("falls back to cached Java cognitive CLIs when checksum cleanup fails", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "java");
  const cachedJar = path.join(languageRoot, "0.5.1", "cognitive-java-cli-0.5.1.jar");
  const newestJar = path.join(languageRoot, "0.6.0", "cognitive-java-cli-0.6.0.jar");
  const warnings: string[] = [];

  await fs.mkdir(path.dirname(cachedJar), { recursive: true });
  await fs.writeFile(cachedJar, "cached");
  await fs.writeFile(
    path.join(languageRoot, "state.json"),
    JSON.stringify({
      checkedAt: "2026-05-01T00:00:00.000Z",
      version: "0.5.1"
    })
  );

  const deps = {
    ...createDefaultDeps(),
    cacheRoot,
    downloadFile: async (_url: string, filePath: string) => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, "bad");
    },
    fetchText: async (url: string) => url.endsWith(".sha256")
      ? createHash("sha256").update("good").digest("hex")
      : [
        "<metadata>",
        "  <versioning>",
        "    <latest>0.6.0</latest>",
        "  </versioning>",
        "</metadata>"
      ].join("\n"),
    now: () => Date.parse("2026-06-01T00:00:00.000Z"),
    rm: async (target: string) => {
      if (target === newestJar) {
        throw new Error("locked");
      }

      await fs.rm(target, { force: true, recursive: true });
    },
    warn: (message: string) => {
      warnings.push(message);
    }
  };

  const tool = await resolveTool("java", deps);

  assert.equal(tool.executablePath, cachedJar);
  assert.equal(tool.stale, true);
  assert.match(warnings.join("\n"), /Could not remove invalid cognitive java CLI 0\.6\.0/u);
  assert.match(warnings.join("\n"), /Maven JAR checksum mismatch/u);
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

test("normalizes non-Error thrown values while resolving cognitive CLIs", async () => {
  const deps = {
    ...createDefaultDeps(),
    cacheRoot: await createTempDir(),
    fetchJson: async () => {
      throw "offline";
    },
    now: () => Date.parse("2026-06-01T00:00:00.000Z")
  };

  await assert.rejects(
    () => resolveTool("typescript", deps),
    /Cannot resolve cognitive typescript CLI and no cached tool is available: offline/u
  );
});

test("discovers cached cognitive CLIs from disk when state is missing", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "typescript");
  const executablePath = path.join(
    languageRoot,
    "0.2.1",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const warnings: string[] = [];

  await fs.mkdir(path.dirname(executablePath), { recursive: true });
  await fs.writeFile(executablePath, "");
  await fs.mkdir(path.join(languageRoot, "..evil"), { recursive: true });

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

  assert.equal(tool.executablePath, executablePath);
  assert.equal(tool.stale, true);
  assert.match(warnings.join("\n"), /Ignoring unsafe cached cognitive typescript CLI directory/u);
  assert.match(warnings.join("\n"), /Using cached cognitive typescript CLI 0\.2\.1/u);
});

test("reinstalls the fresh cognitive state version without refreshing metadata", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "typescript");
  const staleExecutablePath = path.join(
    languageRoot,
    "0.2.1",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const stateExecutablePath = path.join(
    languageRoot,
    "0.3.0",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const runCalls: Array<{ args: string[] }> = [];

  await fs.mkdir(path.dirname(staleExecutablePath), { recursive: true });
  await fs.writeFile(staleExecutablePath, "");
  await fs.writeFile(
    path.join(languageRoot, "state.json"),
    JSON.stringify({
      checkedAt: "2026-06-01T00:00:00.000Z",
      version: "0.3.0"
    })
  );

  const deps = {
    ...createDefaultDeps(),
    cacheRoot,
    fetchJson: async () => {
      throw new Error("metadata refresh should not run");
    },
    now: () => Date.parse("2026-06-01T00:00:00.000Z"),
    runProcess: async (_command: string, args: string[]) => {
      runCalls.push({ args });
      await fs.mkdir(path.dirname(stateExecutablePath), { recursive: true });
      await fs.writeFile(stateExecutablePath, "");
      return 0;
    }
  };

  const tool = await resolveTool("typescript", deps);

  assert.equal(tool.executablePath, stateExecutablePath);
  assert.equal(tool.version, "0.3.0");
  assert.equal(tool.stale, false);
  assert.equal(runCalls.length, 1);
  assert.ok(runCalls[0]?.args.includes("@barney-media/cognitive-typescript@0.3.0"));
});

test("logs resolved cognitive CLI evidence before execution", async () => {
  const cacheRoot = await createTempDir();
  const languageRoot = path.join(cacheRoot, "typescript");
  const executablePath = path.join(
    languageRoot,
    "0.2.1",
    "node_modules",
    "@barney-media",
    "cognitive-typescript",
    "dist",
    "bin.js"
  );
  const infoMessages: string[] = [];
  const runCalls: Array<{ args: string[]; command: string }> = [];

  await fs.mkdir(path.dirname(executablePath), { recursive: true });
  await fs.writeFile(executablePath, "");
  await fs.writeFile(
    path.join(languageRoot, "state.json"),
    JSON.stringify({
      checkedAt: "2026-06-01T00:00:00.000Z",
      version: "0.2.1"
    })
  );

  const exitCode = await run(["typescript", "--", "--help"], {
    ...createDefaultDeps(),
    cacheRoot,
    info: (message: string) => {
      infoMessages.push(message);
    },
    now: () => Date.parse("2026-06-01T00:00:00.000Z"),
    runProcess: async (command: string, args: string[]) => {
      runCalls.push({ args, command });
      return 0;
    }
  });

  assert.equal(exitCode, 0);
  assert.match(infoMessages[0] ?? "", /Resolved cognitive typescript CLI 0\.2\.1 \(cache\)/u);
  assert.equal(runCalls[0]?.command, process.execPath);
  assert.deepEqual(runCalls[0]?.args, [executablePath, "--help"]);
});

test("uses request timeouts for cognitive metadata and downloads", async () => {
  const originalFetch = globalThis.fetch;
  const signals: Array<AbortSignal | null | undefined> = [];
  const downloadPath = path.join(await createTempDir(), "tool.jar");

  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    signals.push(init?.signal);

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "content-type": "application/json"
      },
      status: 200
    });
  }) as typeof fetch;

  try {
    assert.deepEqual(await fetchJson("https://example.test/metadata"), { ok: true });
    assert.equal(await fetchText("https://example.test/text"), JSON.stringify({ ok: true }));
    await downloadFile("https://example.test/tool.jar", downloadPath);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(signals.length, 3);
  assert.ok(signals.every((signal) => signal instanceof AbortSignal));
});

async function createTempDir() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-cognitive-cli-"));

  onTestFinished(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  return tempDir;
}
