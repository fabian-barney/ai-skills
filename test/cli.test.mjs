import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path, { dirname } from "node:path";
import { Readable } from "node:stream";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { run, SUPPORTED_TARGETS, VERSION } from "../dist/cli.js";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(testDir);

function createIo(stdinText) {
  let stderr = "";
  let stdout = "";

  return {
    io: {
      stderr: {
        write(chunk) {
          stderr += String(chunk);
        }
      },
      stdout: {
        write(chunk) {
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

test("installs and updates all targets through the same reset flow", async (t) => {
  const packageRoot = await createPackageRoot(t, ["ai-skills-one", "ai-skills-two"]);
  const installHome = await createHomeDir(t);
  const updateHome = await createHomeDir(t);

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
    }
  }

  const customSkill = path.join(updateHome, ".codex", "skills", "custom-user-skill", "SKILL.md");
  assert.equal(await fs.readFile(customSkill, "utf8"), "keep");
});

test("declined confirmation leaves targets unchanged", async (t) => {
  const packageRoot = await createPackageRoot(t, ["ai-skills-new"]);
  const homeDir = await createHomeDir(t);
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

test("requires confirmation when assume yes is absent", async (t) => {
  const packageRoot = await createPackageRoot(t, ["ai-skills-new"]);
  const homeDir = await createHomeDir(t);
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

async function createPackageRoot(t, skillIds) {
  const packageRoot = await createTempDir(t);
  const skillsDir = path.join(packageRoot, "skills");

  await fs.mkdir(skillsDir);

  for (const skillId of skillIds) {
    const skillDir = path.join(skillsDir, skillId);

    await fs.mkdir(skillDir);
    await fs.writeFile(path.join(skillDir, "SKILL.md"), `---\nname: ${skillId}\n---\n`);
  }

  return packageRoot;
}

async function createHomeDir(t) {
  return createTempDir(t);
}

async function createTempDir(t) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-cli-"));

  t.after(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  return tempDir;
}

async function seedTarget(homeDir, targetName, skills) {
  const targetDir = path.join(homeDir, targetName, "skills");

  await fs.mkdir(targetDir, { recursive: true });

  for (const [skillId, content] of skills) {
    const skillDir = path.join(targetDir, skillId);

    await fs.mkdir(skillDir, { recursive: true });
    await fs.writeFile(path.join(skillDir, "SKILL.md"), content);
  }

  return targetDir;
}
