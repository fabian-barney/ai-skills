import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateCatalog } from "../tools/validate-catalog.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const validatorScript = path.join(repoRoot, "tools", "validate-catalog.mjs");

test("accepts a valid catalog skill", async (t) => {
  const skillsDir = await createTempSkillsDir(t);
  const skillDir = path.join(skillsDir, "ai-skills-example");

  await fs.mkdir(path.join(skillDir, "references"), { recursive: true });
  await fs.writeFile(path.join(skillDir, "references", "example.md"), "# Example\n");
  await fs.writeFile(
    path.join(skillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-example", "- use `references/example.md` when needed\n")
  );

  const result = await validateCatalog({ skillsDir });

  assert.equal(result.skillCount, 1);
  assert.deepEqual(result.errors, []);
});

test("reports representative invalid skill metadata and structure", async (t) => {
  const skillsDir = await createTempSkillsDir(t);
  const skillDir = path.join(skillsDir, "bad-skill");
  const uppercaseSkillDir = path.join(skillsDir, "ai-skills-Bad");

  await fs.mkdir(skillDir, { recursive: true });
  await fs.mkdir(uppercaseSkillDir, { recursive: true });
  await fs.writeFile(
    path.join(skillDir, "SKILL.md"),
    [
      "---",
      "name: wrong-name",
      "---",
      "# Purpose",
      "",
      "A broken skill.",
      "",
      "# Workflow"
    ].join("\n")
  );
  await fs.writeFile(
    path.join(uppercaseSkillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-Bad")
  );

  const result = await validateCatalog({ skillsDir });
  const messages = result.errors.map((error) => error.message);

  assert.equal(
    messages.filter((message) => message.includes("lowercase kebab-case")).length,
    2
  );
  assert.ok(messages.includes("frontmatter description is required"));
  assert.ok(messages.includes("frontmatter name must match directory name bad-skill"));
  assert.ok(messages.includes("missing required section: When to Use"));
});

test("reports missing SKILL.md and broken local references", async (t) => {
  const skillsDir = await createTempSkillsDir(t);
  const missingSkillDir = path.join(skillsDir, "ai-skills-missing-file");
  const brokenRefDir = path.join(skillsDir, "ai-skills-broken-reference");

  await fs.mkdir(missingSkillDir, { recursive: true });
  await fs.mkdir(brokenRefDir, { recursive: true });
  await fs.writeFile(
    path.join(brokenRefDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-broken-reference", "- use `references/missing.md`\n")
  );

  const result = await validateCatalog({ skillsDir });
  const messages = result.errors.map((error) => error.message);

  assert.ok(messages.some((message) => message.startsWith("required file is missing")));
  assert.ok(messages.includes("local catalog reference does not exist: references/missing.md"));
});

test("exits non-zero for invalid catalog state", async (t) => {
  const skillsDir = await createTempSkillsDir(t);

  await fs.mkdir(path.join(skillsDir, "ai-skills-invalid"), { recursive: true });

  const result = spawnSync(
    process.execPath,
    [validatorScript, "--skills-dir", skillsDir],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /required file is missing/);
});

async function createTempSkillsDir(t) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-validation-"));
  const skillsDir = path.join(tempDir, "skills");

  t.after(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  await fs.mkdir(skillsDir);
  await fs.writeFile(path.join(skillsDir, ".gitkeep"), "");

  return skillsDir;
}

function validSkillMarkdown(skillId, whenToUseExtra = "") {
  return [
    "---",
    `name: ${skillId}`,
    "description: >-",
    "  Test skill.",
    "---",
    "",
    "# Purpose",
    "",
    "Describe the purpose.",
    "",
    "# When to Use",
    "",
    "- use for tests",
    whenToUseExtra.trimEnd(),
    "",
    "# Inputs",
    "",
    "- test input",
    "",
    "# Workflow",
    "",
    "1. Do the work.",
    "",
    "# Outputs",
    "",
    "- test output",
    "",
    "# Guardrails",
    "",
    "- stay scoped",
    "",
    "# Exit Checks",
    "",
    "- validation passes",
    ""
  ].join("\n");
}
