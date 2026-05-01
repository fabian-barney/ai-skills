import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { run, VERSION } from "../dist/cli.js";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(testDir);

function createIo() {
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
      }
    },
    output() {
      return { stderr, stdout };
    }
  };
}

test("prints help", () => {
  const harness = createIo();

  const exitCode = run(["--help"], harness.io);

  assert.equal(exitCode, 0);
  assert.match(harness.output().stdout, /Usage:/);
  assert.equal(harness.output().stderr, "");
});

test("prints version", () => {
  const harness = createIo();

  const exitCode = run(["--version"], harness.io);

  assert.equal(exitCode, 0);
  assert.equal(harness.output().stdout, `${VERSION}\n`);
  assert.equal(harness.output().stderr, "");
});

test("keeps install and update reserved for later implementation", () => {
  for (const command of ["install", "update"]) {
    const harness = createIo();

    const exitCode = run([command], harness.io);

    assert.equal(exitCode, 1);
    assert.match(harness.output().stderr, new RegExp(`${command} is not implemented`));
    assert.equal(harness.output().stdout, "");
  }
});

test("prints help after an unknown command error", () => {
  const harness = createIo();

  const exitCode = run(["unknown"], harness.io);

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
