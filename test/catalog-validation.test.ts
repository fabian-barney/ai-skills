import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { onTestFinished, test } from "vitest";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const validatorScript = path.join(repoRoot, "tools", "validate-catalog.mjs");

test("accepts a valid catalog skill", async () => {
  const skillsDir = await createTempSkillsDir();
  const skillDir = path.join(skillsDir, "ai-skills-example");
  const helperSkillDir = path.join(skillsDir, "ai-skills-helper");

  await fs.mkdir(path.join(skillDir, "references"), { recursive: true });
  await fs.mkdir(path.join(skillDir, "examples"), { recursive: true });
  await fs.mkdir(helperSkillDir, { recursive: true });
  await fs.writeFile(path.join(skillDir, "references", "example.md"), "# Example\n");
  await fs.writeFile(
    path.join(skillDir, "examples", "entry.md"),
    [
      "# Example Entry",
      "",
      "Proposed skill id/name: ai-skills-helper",
      "Related skills or dependencies: skill `ai-skills-helper`",
      ""
    ].join("\n")
  );
  await fs.writeFile(
    path.join(skillDir, "SKILL.md"),
    validSkillMarkdown(
      "ai-skills-example",
      [
        "- use `references/example.md` when needed",
        "- use skill `ai-skills-helper` when additional orchestration is required"
      ].join("\n")
    )
  );
  await fs.writeFile(
    path.join(helperSkillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-helper")
  );

  const result = runValidator(skillsDir);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Catalog validation passed for 2 skill\(s\)\./);
  assert.equal(result.stderr, "");
});

test("reports representative invalid skill metadata and structure", async () => {
  const skillsDir = await createTempSkillsDir();
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

  const result = runValidator(skillsDir);
  const messages = result.stderr.split("\n").filter((message) => message.length > 0);

  assert.equal(result.status, 1);
  assert.equal(
    messages.filter((message) => message.includes("lowercase kebab-case")).length,
    2
  );
  assert.ok(messages.some((message) => message.endsWith("frontmatter description is required")));
  assert.ok(messages.some((message) =>
    message.endsWith("frontmatter name must match directory name bad-skill")
  ));
  assert.ok(messages.some((message) => message.endsWith("missing required section: When to Use")));
});

test("reports missing SKILL.md and broken local references", async () => {
  const skillsDir = await createTempSkillsDir();
  const missingSkillDir = path.join(skillsDir, "ai-skills-missing-file");
  const brokenRefDir = path.join(skillsDir, "ai-skills-broken-reference");

  await fs.mkdir(missingSkillDir, { recursive: true });
  await fs.mkdir(brokenRefDir, { recursive: true });
  await fs.writeFile(
    path.join(brokenRefDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-broken-reference", "- use `references/missing.md`\n")
  );

  const result = runValidator(skillsDir);
  const messages = result.stderr.split("\n").filter((message) => message.length > 0);

  assert.equal(result.status, 1);
  assert.ok(messages.some((message) => message.includes("required file is missing")));
  assert.ok(messages.some((message) =>
    message.endsWith("local catalog reference does not exist: references/missing.md")
  ));
});

test("rejects cross-skill file paths and non-canonical skill references", async () => {
  const skillsDir = await createTempSkillsDir();
  const parentSkillDir = path.join(skillsDir, "ai-skills-parent");
  const helperSkillDir = path.join(skillsDir, "ai-skills-helper");
  const nonCanonicalSkillDir = path.join(skillsDir, "bad-skill");

  await fs.mkdir(path.join(parentSkillDir, "examples"), { recursive: true });
  await fs.mkdir(path.join(helperSkillDir, "references"), { recursive: true });
  await fs.mkdir(path.join(nonCanonicalSkillDir, "references"), { recursive: true });
  await fs.writeFile(path.join(helperSkillDir, "references", "policy.md"), "# Policy\n");
  await fs.writeFile(path.join(nonCanonicalSkillDir, "references", "policy.md"), "# Policy\n");
  await fs.writeFile(
    path.join(parentSkillDir, "SKILL.md"),
    validSkillMarkdown(
      "ai-skills-parent",
      [
        "- use `../ai-skills-helper/SKILL.md` for helper behavior",
        "- use `../ai-skills-helper/references/policy.md` for supporting policy",
        "- use `../bad-skill/references/policy.md` for legacy policy"
      ].join("\n")
    )
  );
  await fs.writeFile(
    path.join(parentSkillDir, "examples", "bad.md"),
    [
      "# Bad Example",
      "",
      "Related skills or dependencies: ai-skills-helper",
      ""
    ].join("\n")
  );
  await fs.writeFile(
    path.join(helperSkillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-helper")
  );
  await fs.writeFile(
    path.join(nonCanonicalSkillDir, "SKILL.md"),
    validSkillMarkdown("bad-skill")
  );

  const result = runValidator(skillsDir);
  const messages = result.stderr.split("\n").filter((message) => message.length > 0);

  assert.equal(result.status, 1);
  assert.ok(messages.some((message) =>
    message.includes("cross-skill file reference is not allowed")
      && message.includes("reference skill `ai-skills-helper` instead")
  ));
  assert.ok(messages.some((message) =>
    message.includes("cross-skill references must use the form skill `<skill-id>`")
      && message.includes("ai-skills-helper")
  ));
  assert.ok(messages.some((message) =>
    message.includes("cross-skill file reference is not allowed")
      && message.includes("../bad-skill/references/policy.md")
  ));
});

test("does not report a raw-skill syntax error for ids that appear only in link targets", async () => {
  const skillsDir = await createTempSkillsDir();
  const parentSkillDir = path.join(skillsDir, "ai-skills-parent");
  const helperSkillDir = path.join(skillsDir, "ai-skills-helper");

  await fs.mkdir(path.join(parentSkillDir, "examples"), { recursive: true });
  await fs.mkdir(helperSkillDir, { recursive: true });
  await fs.writeFile(
    path.join(parentSkillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-parent")
  );
  await fs.writeFile(
    path.join(parentSkillDir, "examples", "link.md"),
    [
      "# Link Example",
      "",
      "- see [helper docs](../../ai-skills-helper/SKILL.md)",
      ""
    ].join("\n")
  );
  await fs.writeFile(
    path.join(helperSkillDir, "SKILL.md"),
    validSkillMarkdown("ai-skills-helper")
  );

  const result = runValidator(skillsDir);
  const messages = result.stderr.split("\n").filter((message) => message.length > 0);

  assert.equal(result.status, 1);
  assert.equal(
    messages.filter((message) =>
      message.includes("cross-skill references must use the form skill `<skill-id>`")
    ).length,
    0
  );
  assert.ok(messages.some((message) =>
    message.includes("cross-skill file reference is not allowed")
      && message.includes("../../ai-skills-helper/SKILL.md")
  ));
});

test("exits non-zero for invalid catalog state", async () => {
  const skillsDir = await createTempSkillsDir();

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

async function createTempSkillsDir() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ai-skills-validation-"));
  const skillsDir = path.join(tempDir, "skills");

  onTestFinished(async () => {
    await fs.rm(tempDir, { force: true, recursive: true });
  });

  await fs.mkdir(skillsDir);
  await fs.writeFile(path.join(skillsDir, ".gitkeep"), "");

  return skillsDir;
}

function validSkillMarkdown(skillId: string, whenToUseExtra = "") {
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

function runValidator(skillsDir: string) {
  return spawnSync(
    process.execPath,
    [validatorScript, "--skills-dir", skillsDir],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );
}
