import assert from "node:assert/strict";
import test from "node:test";

import { run, VERSION } from "../dist/cli.js";

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
