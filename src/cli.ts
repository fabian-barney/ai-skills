#!/usr/bin/env node

import { createRequire } from "node:module";
import os from "node:os";
import path, { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import fs from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const requirePackageJson = createRequire(import.meta.url);

function readPackageVersion(): string {
  const packageJson = requirePackageJson("../package.json") as { version?: unknown };

  if (typeof packageJson.version !== "string" || packageJson.version.length === 0) {
    throw new Error("package.json version is missing.");
  }

  return packageJson.version;
}

export const VERSION = readPackageVersion();

export interface CliIo {
  stderr: NodeJS.WritableStream;
  stdin?: NodeJS.ReadableStream;
  stdout: NodeJS.WritableStream;
}

export interface RunOptions {
  homeDir?: string;
  packageRoot?: string;
}

export interface InstallTarget {
  label: string;
  relativePath: string[];
}

export const SUPPORTED_TARGETS: InstallTarget[] = [
  {
    label: "Codex",
    relativePath: [".codex", "skills"]
  },
  {
    label: "Claude Code",
    relativePath: [".claude", "skills"]
  },
  {
    label: "GitHub Copilot",
    relativePath: [".copilot", "skills"]
  }
];

const PACKAGE_OWNED_PREFIX = "ai-skills-";
const defaultPackageRoot = resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const HELP = `ai-skills ${VERSION}

Usage:
  ai-skills <command> [--assume-yes]

Commands:
  install    Replace ai-skills-* in all supported targets with the packaged catalog
  update     Replace ai-skills-* in all supported targets with the packaged catalog

Options:
  --assume-yes  Confirm replacement of all package-owned ai-skills-* directories
  -h, --help    Show this help message
  -v, --version Show the package version

Install/update preserve non-prefixed user skills and replace only package-owned
ai-skills-* directories.
`;

export async function run(
  argv = process.argv.slice(2),
  io: CliIo = process,
  options: RunOptions = {}
): Promise<number> {
  const [command, ...args] = argv;

  if (command === undefined || command === "-h" || command === "--help") {
    io.stdout.write(HELP);
    return 0;
  }

  if (command === "-v" || command === "--version") {
    io.stdout.write(`${VERSION}\n`);
    return 0;
  }

  if (command === "install" || command === "update") {
    return installOrUpdate(command, args, io, options);
  }

  io.stderr.write(`Unknown command: ${command}\n\n${HELP}`);
  return 1;
}

async function installOrUpdate(
  command: string,
  args: string[],
  io: CliIo,
  options: RunOptions
): Promise<number> {
  const assumeYes = args.includes("--assume-yes");
  const unknownArgs = args.filter((arg) => arg !== "--assume-yes");

  if (unknownArgs.length > 0) {
    io.stderr.write(`Unknown option for ${command}: ${unknownArgs.join(" ")}\n\n${HELP}`);
    return 1;
  }

  const homeDir = options.homeDir ?? os.homedir();
  const packageRoot = options.packageRoot ?? defaultPackageRoot;
  const targetDirs = resolveTargetDirs(homeDir);

  writeReplacementWarning(command, targetDirs, io);

  if (!assumeYes && !await confirmReplacement(io)) {
    io.stderr.write("No changes made.\n");
    return 1;
  }

  let installedSkillCount;

  try {
    installedSkillCount = await resetInstallCatalog(packageRoot, targetDirs);
  } catch (error) {
    io.stderr.write(`ai-skills ${command} failed: ${errorMessage(error)}\n`);
    return 1;
  }

  io.stdout.write(
    `ai-skills ${command} complete: installed ${installedSkillCount} skill(s) into `
      + `${targetDirs.length} target(s).\n`
  );

  return 0;
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : String(error);
}

function resolveTargetDirs(homeDir: string): string[] {
  return SUPPORTED_TARGETS.map((target) => path.join(homeDir, ...target.relativePath));
}

function writeReplacementWarning(command: string, targetDirs: string[], io: CliIo): void {
  io.stderr.write(
    [
      `Warning: ai-skills ${command} will delete and replace every ${PACKAGE_OWNED_PREFIX}*`,
      "directory under the supported target directories.",
      "Non-prefixed user skills will be preserved.",
      "",
      "Targets:",
      ...targetDirs.map((targetDir) => `- ${targetDir}`),
      ""
    ].join("\n")
  );
}

async function confirmReplacement(io: CliIo): Promise<boolean> {
  if (io.stdin === undefined) {
    return false;
  }

  const readline = createInterface({
    input: io.stdin,
    output: io.stderr
  });

  try {
    const answer = await readline.question("Type \"yes\" to continue: ");
    return answer.trim().toLowerCase() === "yes";
  } finally {
    readline.close();
  }
}

async function resetInstallCatalog(packageRoot: string, targetDirs: string[]): Promise<number> {
  const packagedSkillsDir = path.join(packageRoot, "skills");
  const skillIds = await listPackagedSkillIds(packagedSkillsDir);

  for (const targetDir of targetDirs) {
    await withTargetContext(targetDir, "create target directory", async () => {
      await fs.mkdir(targetDir, { recursive: true });
    });
    await withTargetContext(targetDir, "remove existing package-owned skills", async () => {
      await removePackageOwnedSkills(targetDir);
    });

    for (const skillId of skillIds) {
      await withTargetContext(targetDir, `copy ${skillId}`, async () => {
        await fs.cp(
          path.join(packagedSkillsDir, skillId),
          path.join(targetDir, skillId),
          { recursive: true }
        );
      });
    }
  }

  return skillIds.length;
}

async function withTargetContext(
  targetDir: string,
  operation: string,
  action: () => Promise<void>
): Promise<void> {
  try {
    await action();
  } catch (error) {
    throw new Error(`${operation} failed for ${targetDir}: ${errorMessage(error)}`);
  }
}

async function listPackagedSkillIds(packagedSkillsDir: string): Promise<string[]> {
  const entries = await fs.readdir(packagedSkillsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(PACKAGE_OWNED_PREFIX))
    .map((entry) => entry.name)
    .sort();
}

async function removePackageOwnedSkills(targetDir: string): Promise<void> {
  const entries = await fs.readdir(targetDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith(PACKAGE_OWNED_PREFIX)) {
      await fs.rm(path.join(targetDir, entry.name), { force: true, recursive: true });
    }
  }
}

const isEntrypoint = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isEntrypoint) {
  process.exitCode = await run();
}
