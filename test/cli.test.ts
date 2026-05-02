import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path, { dirname } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

import { onTestFinished, test } from "vitest";

import { run, SUPPORTED_TARGETS, VERSION } from "../src/cli.ts";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(testDir);

function createIo(stdinText?: string) {
  let stderr = "";
  let stdout = "";

  return {
    io: {
      stderr: {
        write(chunk: unknown) {
          stderr += String(chunk);
        }
      },
      stdout: {
        write(chunk: unknown) {
          stdout += String(chunk);
        }
      },
      stdin: stdinText === undefined
        ? undefined
        : Readable.from([stdinText])
    },
    output() {
      return { stderr, stdout };
    }
  };
}

test("prints help", async () => {
  const harness = createIo();

  const exitCode = await run(["--help"], harness.io);

  assert.equal(exitCode, 0);
  assert.match(harness.output().stdout, /Usage:/);
  assert.match(harness.output().stdout, /ai-skills-\*/);
  assert.equal(harness.output().stderr, "");
});

test("prints version", async () => {
  const harness = createIo();

  const exitCode = await run(["--version"], harness.io);

  assert.equal(exitCode, 0);
  assert.equal(harness.output().stdout, `${VERSION}\n`);
  assert.equal(harness.output().stderr, "");
});

test("installs and updates all targets through the same reset flow", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-one", "ai-skills-two"]);
  const installHome = await createHomeDir();
  const updateHome = await createHomeDir();

  await seedTarget(updateHome, ".codex", [
    ["ai-skills-stale", "stale"],
    ["custom-user-skill", "keep"]
  ]);

  const installHarness = createIo();
  const updateHarness = createIo();
  const installExit = await run(
    ["install", "--assume-yes"],
    installHarness.io,
    { homeDir: installHome, packageRoot }
  );
  const updateExit = await run(
    ["update", "--assume-yes"],
    updateHarness.io,
    { homeDir: updateHome, packageRoot }
  );

  assert.equal(installExit, 0);
  assert.equal(updateExit, 0);
  assert.match(installHarness.output().stderr, /will delete and replace every ai-skills-\*/);
  assert.match(installHarness.output().stderr, /Non-prefixed user skills will be preserved/);
  assert.match(installHarness.output().stdout, /installed 2 skill\(s\) into 3 target\(s\)/);
  assert.match(updateHarness.output().stdout, /installed 2 skill\(s\) into 3 target\(s\)/);

  for (const homeDir of [installHome, updateHome]) {
    for (const target of SUPPORTED_TARGETS) {
      const targetDir = path.join(homeDir, ...target.relativePath);
      const entries = await fs.readdir(targetDir);

      assert.ok(entries.includes("ai-skills-one"));
      assert.ok(entries.includes("ai-skills-two"));
      assert.ok(!entries.includes("ai-skills-stale"));
      assertNoTemporaryResetDirs(entries);
    }
  }

  const customSkill = path.join(updateHome, ".codex", "skills", "custom-user-skill", "SKILL.md");
  assert.equal(await fs.readFile(customSkill, "utf8"), "keep");
});

test("declined confirmation leaves targets unchanged", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-new"]);
  const homeDir = await createHomeDir();
  const targetDir = await seedTarget(homeDir, ".codex", [
    ["ai-skills-old", "old"],
    ["custom-user-skill", "keep"]
  ]);
  const harness = createIo("no\n");

  const exitCode = await run(["install"], harness.io, { homeDir, packageRoot });

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /No changes made/);
  assert.equal(await fs.readFile(path.join(targetDir, "ai-skills-old", "SKILL.md"), "utf8"), "old");
  assert.equal(
    await fs.readFile(path.join(targetDir, "custom-user-skill", "SKILL.md"), "utf8"),
    "keep"
  );
  await assert.rejects(fs.access(path.join(targetDir, "ai-skills-new")));
});

test("reports target failure and preserves non-prefixed skills", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-one"]);
  const homeDir = await createHomeDir();
  const codexTargetDir = await seedTarget(homeDir, ".codex", [
    ["custom-user-skill", "keep"]
  ]);
  const blockingPath = path.join(homeDir, ".claude");
  const harness = createIo();

  await fs.writeFile(blockingPath, "blocking file");

  const exitCode = await run(
    ["install", "--assume-yes"],
    harness.io,
    { homeDir, packageRoot }
  );
  const codexEntries = await fs.readdir(codexTargetDir);
  const codexSkill = path.join(codexTargetDir, "ai-skills-one", "SKILL.md");
  const failedTargetDir = path.join(homeDir, ".claude", "skills");

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /create target directory failed/);
  assert.ok(harness.output().stderr.includes(failedTargetDir));
  assert.equal(
    await fs.readFile(path.join(codexTargetDir, "custom-user-skill", "SKILL.md"), "utf8"),
    "keep"
  );
  assert.equal(await fs.readFile(blockingPath, "utf8"), "blocking file");
  assert.equal(await fs.readFile(codexSkill, "utf8"), "---\nname: ai-skills-one\n---\n");
  assertNoTemporaryResetDirs(codexEntries);
});

test("rolls back package-owned skills after a partial reset failure", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-one", "ai-skills-two"]);
  const homeDir = await createHomeDir();
  const targetDir = await seedTarget(homeDir, ".codex", [
    ["ai-skills-old", "old"],
    ["custom-user-skill", "keep"]
  ]);
  const blockingPath = path.join(targetDir, "ai-skills-two");
  const harness = createIo();

  await fs.writeFile(blockingPath, "blocking file");

  const exitCode = await run(
    ["install", "--assume-yes"],
    harness.io,
    { homeDir, packageRoot }
  );
  const entries = await fs.readdir(targetDir);

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /install staged ai-skills-two failed/);
  assert.equal(await fs.readFile(path.join(targetDir, "ai-skills-old", "SKILL.md"), "utf8"), "old");
  assert.equal(
    await fs.readFile(path.join(targetDir, "custom-user-skill", "SKILL.md"), "utf8"),
    "keep"
  );
  assert.equal(await fs.readFile(blockingPath, "utf8"), "blocking file");
  await assert.rejects(fs.access(path.join(targetDir, "ai-skills-one")));
  assertNoTemporaryResetDirs(entries);
});

test("rejects unknown install options", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-new"]);
  const homeDir = await createHomeDir();
  const harness = createIo();

  const exitCode = await run(["install", "--dry-run"], harness.io, { homeDir, packageRoot });

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /Unknown option for install: --dry-run/);
});

test("requires confirmation when assume yes is absent", async () => {
  const packageRoot = await createPackageRoot(["ai-skills-new"]);
  const homeDir = await createHomeDir();
  const harness = createIo();

  const exitCode = await run(["update"], harness.io, { homeDir, packageRoot });

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /No changes made/);
});

test("prints help after an unknown command error", async () => {
  const harness = createIo();

  const exitCode = await run(["unknown"], harness.io);

  assert.equal(exitCode, 1);
  assert.match(harness.output().stderr, /Unknown command: unknown/);
  assert.match(harness.output().stderr, /Usage:/);
  assert.equal(harness.output().stdout, "");
});

test("runs directly through a relative script path", () => {
  const result = spawnSync(process.execPath, ["dist/cli.js", "--version"], {
    cwd: repoRoot,
    encoding: "utf8"
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, `${VERSION}\n`);
  assert.equal(result.stderr, "");
});

async function createPackageRoot(skillIds: string[]) {
  const packageRoot = await createTempDir();
  const skillsDir = path.join(packageRoot, "skills");

  await fs.mkdir(skillsDir);

  for (const skillId of skillIds) {
    const skillDir = path.join(skillsDir, skillId);

    await fs.mkdir(skillDir);
    await fs.writeFile(path.join(skillDir, "SKILL.md"), `---\nname: ${skillId}\n---\n`);
  }

  return packageRoot;
}

async function createHomeDir() {
  return createTempDir();
}

async function createTempDir() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-cli-"));

  onTestFinished(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  return tempDir;
}

async function seedTarget(homeDir: string, targetName: string, skills: Array<[string, string]>) {
  const targetDir = path.join(homeDir, targetName, "skills");

  await fs.mkdir(targetDir, { recursive: true });

  for (const [skillId, content] of skills) {
    const skillDir = path.join(targetDir, skillId);

    await fs.mkdir(skillDir, { recursive: true });
    await fs.writeFile(path.join(skillDir, "SKILL.md"), content);
  }

  return targetDir;
}

function assertNoTemporaryResetDirs(entries: string[]) {
  assert.ok(!entries.some((entry) => entry.startsWith(".ai-skills-stage-")));
  assert.ok(!entries.some((entry) => entry.startsWith(".ai-skills-backup-")));
}
