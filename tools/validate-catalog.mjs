#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const REQUIRED_SECTIONS = [
  "Purpose",
  "When to Use",
  "Inputs",
  "Workflow",
  "Outputs",
  "Guardrails",
  "Exit Checks"
];

const REFERENCE_SEGMENTS = new Set([
  "examples",
  "references",
  "scripts",
  "targets",
  "templates"
]);

const IGNORED_SKILLS_ENTRIES = new Set([
  ".gitkeep"
]);

const CANONICAL_SKILL_ID_PATTERN = /^ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const SKILL_ID_REFERENCE_PATTERN = /\b(ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*)\b/gu;
const CANONICAL_SKILL_REFERENCE_PATTERN =
  /\bskill\s+`(ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*)`/gu;
const RAW_SKILL_ID_ALLOWED_LINE_PATTERNS = [
  /^\s*name:\s*ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*\s*$/u,
  /^\s*[-*]\s*`?skill-id-or-name`?:\s*`?ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*`?\s*$/u,
  /^\s*skill-id-or-name:\s*`?ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*`?\s*$/u,
  /^\s*Proposed skill id\/name:\s*ai-skills-[a-z0-9]+(?:-[a-z0-9]+)*\s*$/iu
];

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function validateCatalog(options = {}) {
  const skillsDir = path.resolve(options.skillsDir ?? path.join(repoRoot, "skills"));
  const errors = [];
  const entries = await readDirectory(skillsDir, errors);

  if (entries.length === 0) {
    return {
      errors,
      skillCount: 0
    };
  }

  let skillCount = 0;

  for (const entry of entries) {
    const location = path.join("skills", entry.name);

    if (IGNORED_SKILLS_ENTRIES.has(entry.name)) {
      continue;
    }

    if (!entry.isDirectory()) {
      errors.push({
        location,
        message: "unexpected non-directory entry in skills root"
      });
      continue;
    }

    skillCount += 1;
    await validateSkillDirectory(skillsDir, entry.name, errors);
  }

  return {
    errors,
    skillCount
  };
}

export function formatValidationResult(result) {
  if (result.errors.length === 0) {
    return `Catalog validation passed for ${result.skillCount} skill(s).`;
  }

  return result.errors
    .map((error) => `${error.location}: ${error.message}`)
    .join("\n");
}

async function readDirectory(directory, errors) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries.sort((left, right) => left.name.localeCompare(right.name));
  } catch (error) {
    errors.push({
      location: directory,
      message: `cannot read directory: ${error.message}`
    });
    return [];
  }
}

async function validateSkillDirectory(skillsDir, skillId, errors) {
  const skillDir = path.join(skillsDir, skillId);
  const skillMarkdown = path.join(skillDir, "SKILL.md");
  const skillLocation = path.join("skills", skillId);

  if (!CANONICAL_SKILL_ID_PATTERN.test(skillId)) {
    errors.push({
      location: skillLocation,
      message: "canonical skill id must be lowercase kebab-case and start with ai-skills-"
    });
  }

  const markdown = await readRequiredFile(skillMarkdown, errors);

  if (markdown !== undefined) {
    validateSkillMarkdown(skillId, skillMarkdown, markdown, errors);
  }

  await validateMarkdownConventions(skillsDir, skillDir, skillId, errors);
}

async function readRequiredFile(filePath, errors) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    errors.push({
      location: relativeToRepo(filePath),
      message: `required file is missing or unreadable: ${error.message}`
    });
    return undefined;
  }
}

function validateSkillMarkdown(skillId, skillMarkdown, markdown, errors) {
  const parsed = parseFrontmatter(markdown);
  const skillLocation = relativeToRepo(skillMarkdown);

  if (!parsed.ok) {
    errors.push({
      location: skillLocation,
      message: parsed.message
    });
    return;
  }

  requireFrontmatterField(parsed.fields, "name", skillLocation, errors);
  requireFrontmatterField(parsed.fields, "description", skillLocation, errors);

  if (parsed.fields.name !== undefined && parsed.fields.name !== skillId) {
    errors.push({
      location: skillLocation,
      message: `frontmatter name must match directory name ${skillId}`
    });
  }

  validateSectionOrder(parsed.body, skillLocation, errors);
}

function parseFrontmatter(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");

  if (lines[0]?.trim() !== "---") {
    return {
      ok: false,
      message: "SKILL.md must start with YAML frontmatter"
    };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");

  if (closingIndex === -1) {
    return {
      ok: false,
      message: "YAML frontmatter must be closed with ---"
    };
  }

  return {
    ok: true,
    fields: parseYamlFields(lines.slice(1, closingIndex)),
    body: lines.slice(closingIndex + 1)
  };
}

function parseYamlFields(lines) {
  const fields = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.trim().length === 0 || line.trimStart().startsWith("#") || /^\s/.test(line)) {
      continue;
    }

    const match = /^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/.exec(line);

    if (match === null) {
      continue;
    }

    const [, key, rawValue = ""] = match;
    fields[key] = parseYamlValue(rawValue, lines, index);
  }

  return fields;
}

function parseYamlValue(rawValue, lines, currentIndex) {
  const trimmedValue = rawValue.trim();

  if (/^[>|][+-]?$/.test(trimmedValue)) {
    const blockLines = [];

    for (let index = currentIndex + 1; index < lines.length; index += 1) {
      const line = lines[index];

      if (line.length > 0 && !/^\s/.test(line)) {
        break;
      }

      if (line.trim().length > 0) {
        blockLines.push(line.trim());
      }
    }

    return blockLines.join("\n");
  }

  return trimmedValue.replace(/^["']|["']$/gu, "");
}

function requireFrontmatterField(fields, fieldName, location, errors) {
  const fieldValue = fields[fieldName];

  if (typeof fieldValue !== "string" || fieldValue.trim().length === 0) {
    errors.push({
      location,
      message: `frontmatter ${fieldName} is required`
    });
  }
}

function validateSectionOrder(bodyLines, location, errors) {
  const headings = bodyLines
    .map((line, index) => {
      const match = /^# (.+)$/u.exec(line);

      return match === null
        ? undefined
        : {
            line: index + 1,
            title: match[1].trim()
          };
    })
    .filter((heading) => heading !== undefined);

  let previousIndex = -1;

  for (const section of REQUIRED_SECTIONS) {
    const sectionIndex = headings.findIndex((heading) => heading.title === section);

    if (sectionIndex === -1) {
      errors.push({
        location,
        message: `missing required section: ${section}`
      });
      continue;
    }

    if (sectionIndex < previousIndex) {
      errors.push({
        location,
        message: `section is out of order: ${section}`
      });
    }

    previousIndex = sectionIndex;
  }
}

async function validateMarkdownConventions(skillsDir, skillDir, skillId, errors) {
  const markdownFiles = await findMarkdownFiles(skillDir, errors);

  for (const markdownFile of markdownFiles) {
    let markdown;

    try {
      markdown = await fs.readFile(markdownFile, "utf8");
    } catch (error) {
      errors.push({
        location: relativeToRepo(markdownFile),
        message: `cannot read markdown file: ${error.message}`
      });
      continue;
    }

    for (const reference of findCatalogPathReferences(markdown)) {
      await validateCatalogPathReference(skillsDir, skillDir, markdownFile, reference, errors);
    }

    validateCrossSkillReferenceSyntax(skillId, markdownFile, markdown, errors);
  }
}

async function findMarkdownFiles(directory, errors) {
  let entries;
  const files = [];

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    errors.push({
      location: relativeToRepo(directory),
      message: `cannot read directory: ${error.message}`
    });
    return files;
  }

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(entryPath, errors));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function findCatalogPathReferences(markdown) {
  const references = new Set();
  const patterns = [
    /!?\[[^\]]*\]\(([^)]+)\)/gu,
    /`([^`\n]+)`/gu
  ];

  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const candidate = normalizeReference(match[1]);

      if (candidate !== undefined && targetsCatalogPath(candidate)) {
        references.add(candidate);
      }
    }
  }

  return [...references].sort();
}

function normalizeReference(candidate) {
  const withoutTitle = candidate.trim().split(/\s+/u)[0];
  const withoutAnchor = withoutTitle.split("#")[0];
  const normalized = withoutAnchor.replace(/^<|>$/gu, "").replace(/[),.;:]+$/u, "");

  if (
    normalized.length === 0
    || normalized.startsWith("#")
    || /^[a-z][a-z0-9+.-]*:/iu.test(normalized)
  ) {
    return undefined;
  }

  return normalized;
}

function targetsCatalogPath(reference) {
  if (!reference.includes("/") && !reference.includes("\\")) {
    return false;
  }

  return reference
    .split(/[\\/]+/u)
    .some((segment) =>
      REFERENCE_SEGMENTS.has(segment)
      || segment === "SKILL.md"
      || CANONICAL_SKILL_ID_PATTERN.test(segment)
    );
}

async function validateCatalogPathReference(skillsDir, skillDir, sourceFile, reference, errors) {
  const resolvedReference = reference.startsWith("skills/")
    ? path.resolve(path.dirname(skillsDir), reference)
    : path.resolve(path.dirname(sourceFile), reference);

  if (!isPathInside(skillsDir, resolvedReference)) {
    errors.push({
      location: relativeToRepo(sourceFile),
      message: `local catalog reference leaves skills directory: ${reference}`
    });
    return;
  }

  const targetCatalogDir = topLevelCatalogDirName(skillsDir, resolvedReference);
  const sourceSkillId = path.basename(skillDir);

  if (targetCatalogDir !== undefined && targetCatalogDir !== sourceSkillId) {
    const referenceHint = CANONICAL_SKILL_ID_PATTERN.test(targetCatalogDir)
      ? `; reference skill \`${targetCatalogDir}\` instead`
      : "";

    errors.push({
      location: relativeToRepo(sourceFile),
      message: `cross-skill file reference is not allowed: ${reference}${referenceHint}`
    });
    return;
  }

  try {
    const stat = await fs.stat(resolvedReference);

    if (!stat.isFile()) {
      errors.push({
        location: relativeToRepo(sourceFile),
        message: `local catalog reference is not a file: ${reference}`
      });
    }
  } catch {
    errors.push({
      location: relativeToRepo(sourceFile),
      message: `local catalog reference does not exist: ${reference}`
    });
  }
}

function validateCrossSkillReferenceSyntax(skillId, markdownFile, markdown, errors) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  let inFrontmatter = false;
  let frontmatterClosed = false;
  let inCodeFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!frontmatterClosed && trimmed === "---") {
      inFrontmatter = !inFrontmatter;
      frontmatterClosed = frontmatterClosed || !inFrontmatter;
      continue;
    }

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inFrontmatter || inCodeFence || !line.includes("ai-skills-")) {
      continue;
    }

    if (allowsRawSkillIdLine(line)) {
      continue;
    }

    const withoutLinkTargets = stripMarkdownLinkTargets(line);
    const withoutPathReferences = stripCatalogPathReferences(withoutLinkTargets);
    const withoutCanonicalReferences = withoutPathReferences.replaceAll(
      CANONICAL_SKILL_REFERENCE_PATTERN,
      ""
    );
    const otherSkillIds = [...withoutCanonicalReferences.matchAll(SKILL_ID_REFERENCE_PATTERN)]
      .map((match) => match[1])
      .filter((candidateSkillId) => candidateSkillId !== skillId);

    if (otherSkillIds.length > 0) {
      errors.push({
        location: relativeToRepo(markdownFile),
        message:
          "cross-skill references must use the form skill "
          + `\`<skill-id>\`: ${[...new Set(otherSkillIds)].join(", ")}`
      });
    }
  }
}

function allowsRawSkillIdLine(line) {
  return RAW_SKILL_ID_ALLOWED_LINE_PATTERNS.some((pattern) => pattern.test(line.trim()));
}

function stripCatalogPathReferences(line) {
  return line.replace(/`([^`\n]+)`/gu, (match, candidate) => (
    targetsCatalogPath(normalizeReference(candidate) ?? "")
      ? ""
      : match
  ));
}

function stripMarkdownLinkTargets(line) {
  return line.replace(/(!?\[[^\]]*\])\(([^)]+)\)/gu, "$1");
}

function topLevelCatalogDirName(skillsDir, filePath) {
  const relativePath = path.relative(skillsDir, filePath);

  if (
    relativePath.length === 0
    || relativePath.startsWith("..")
    || path.isAbsolute(relativePath)
  ) {
    return undefined;
  }

  const [directoryName] = relativePath.split(path.sep);
  return directoryName;
}

function isPathInside(parent, child) {
  const relativePath = path.relative(parent, child);

  return relativePath.length === 0
    || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function relativeToRepo(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

const isEntrypoint = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isEntrypoint) {
  try {
    await runCli(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

async function runCli(argv) {
  const options = parseCliOptions(argv);
  const result = await validateCatalog(options);
  const output = formatValidationResult(result);

  if (result.errors.length === 0) {
    console.log(output);
  } else {
    console.error(output);
  }

  if (result.errors.length > 0) {
    process.exitCode = 1;
  }
}

function parseCliOptions(argv) {
  if (argv.length === 0) {
    return {};
  }

  if (argv.length === 2 && argv[0] === "--skills-dir") {
    return {
      skillsDir: argv[1]
    };
  }

  throw new Error("Usage: node tools/validate-catalog.mjs [--skills-dir <path>]");
}
