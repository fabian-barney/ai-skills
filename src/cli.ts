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
const BACKUP_DIR_PREFIX = ".ai-skills-backup-";
const STAGING_DIR_PREFIX = ".ai-skills-stage-";
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

  if (isHelpCommand(command)) {
    io.stdout.write(HELP);
    return 0;
  }

  if (isVersionCommand(command)) {
    io.stdout.write(`${VERSION}\n`);
    return 0;
  }

  if (isInstallOrUpdateCommand(command)) {
    return installOrUpdate(command, args, io, options);
  }

  io.stderr.write(`Unknown command: ${command}\n\n${HELP}`);
  return 1;
}

function isHelpCommand(command: string | undefined): command is undefined | "-h" | "--help" {
  return command === undefined || command === "-h" || command === "--help";
}

function isVersionCommand(command: string): boolean {
  return command === "-v" || command === "--version";
}

function isInstallOrUpdateCommand(command: string): command is "install" | "update" {
  return command === "install" || command === "update";
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
    await resetTarget(packagedSkillsDir, skillIds, targetDir);
  }

  return skillIds.length;
}

async function resetTarget(
  packagedSkillsDir: string,
  skillIds: string[],
  targetDir: string
): Promise<void> {
  let backupDir: string | undefined;
  let stagingDir: string | undefined;
  const installedNewSkillIds: string[] = [];
  const backedUpSkillIds: string[] = [];

  try {
    await withTargetContext(targetDir, "create target directory", async () => {
      await fs.mkdir(targetDir, { recursive: true });
    });

    stagingDir = await withTargetContextResult(targetDir, "create staging directory", async () =>
      fs.mkdtemp(path.join(targetDir, STAGING_DIR_PREFIX))
    );
    await stagePackagedSkills(packagedSkillsDir, skillIds, stagingDir, targetDir);

    backupDir = await withTargetContextResult(targetDir, "create backup directory", async () =>
      fs.mkdtemp(path.join(targetDir, BACKUP_DIR_PREFIX))
    );
    await moveExistingPackageOwnedSkills(targetDir, backupDir, backedUpSkillIds);
    await moveStagedSkills(targetDir, stagingDir, skillIds, installedNewSkillIds);

    await bestEffortRemove(backupDir);
    backupDir = undefined;
    await bestEffortRemove(stagingDir);
    stagingDir = undefined;
  } catch (error) {
    await rollbackTargetReset(
      targetDir,
      backupDir,
      stagingDir,
      installedNewSkillIds,
      backedUpSkillIds
    );
    throw error;
  }
}

async function stagePackagedSkills(
  packagedSkillsDir: string,
  skillIds: string[],
  stagingDir: string,
  targetDir: string
): Promise<void> {
  for (const skillId of skillIds) {
    await withTargetContext(targetDir, `stage ${skillId}`, async () => {
      await fs.cp(
        path.join(packagedSkillsDir, skillId),
        path.join(stagingDir, skillId),
        { recursive: true }
      );
    });
  }
}

async function moveExistingPackageOwnedSkills(
  targetDir: string,
  backupDir: string,
  backedUpSkillIds: string[]
): Promise<void> {
  const existingSkillIds = await withTargetContextResult(
    targetDir,
    "list existing package-owned skills",
    async () => listPackageOwnedTargetSkillIds(targetDir)
  );

  for (const skillId of existingSkillIds) {
    await withTargetContext(targetDir, `back up ${skillId}`, async () => {
      await fs.rename(path.join(targetDir, skillId), path.join(backupDir, skillId));
    });
    backedUpSkillIds.push(skillId);
  }
}

async function moveStagedSkills(
  targetDir: string,
  stagingDir: string,
  skillIds: string[],
  installedNewSkillIds: string[]
): Promise<void> {
  for (const skillId of skillIds) {
    await withTargetContext(targetDir, `install staged ${skillId}`, async () => {
      const destination = path.join(targetDir, skillId);

      if (await pathExists(destination)) {
        throw new Error(`target entry already exists: ${destination}`);
      }

      await fs.rename(path.join(stagingDir, skillId), destination);
    });
    installedNewSkillIds.push(skillId);
  }
}

async function rollbackTargetReset(
  targetDir: string,
  backupDir: string | undefined,
  stagingDir: string | undefined,
  installedNewSkillIds: string[],
  backedUpSkillIds: string[]
): Promise<void> {
  for (const skillId of [...installedNewSkillIds].reverse()) {
    await bestEffortRemove(path.join(targetDir, skillId));
  }

  if (backupDir !== undefined && await pathExists(backupDir)) {
    for (const skillId of [...backedUpSkillIds].reverse()) {
      await bestEffortRename(path.join(backupDir, skillId), path.join(targetDir, skillId));
    }

    await bestEffortRemove(backupDir);
  }

  if (stagingDir !== undefined) {
    await bestEffortRemove(stagingDir);
  }
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

async function withTargetContextResult<T>(
  targetDir: string,
  operation: string,
  action: () => Promise<T>
): Promise<T> {
  try {
    return await action();
  } catch (error) {
    throw new Error(`${operation} failed for ${targetDir}: ${errorMessage(error)}`);
  }
}

async function bestEffortRemove(entryPath: string): Promise<void> {
  try {
    await fs.rm(entryPath, { force: true, recursive: true });
  } catch {
    // Preserve the original install/update error.
  }
}

async function bestEffortRename(source: string, destination: string): Promise<void> {
  try {
    await fs.rename(source, destination);
  } catch {
    // Preserve the original install/update error.
  }
}

async function pathExists(entryPath: string): Promise<boolean> {
  try {
    await fs.access(entryPath);
    return true;
  } catch {
    return false;
  }
}

async function listPackagedSkillIds(packagedSkillsDir: string): Promise<string[]> {
  const entries = await fs.readdir(packagedSkillsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(PACKAGE_OWNED_PREFIX))
    .map((entry) => entry.name)
    .sort();
}

async function listPackageOwnedTargetSkillIds(targetDir: string): Promise<string[]> {
  const entries = await fs.readdir(targetDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(PACKAGE_OWNED_PREFIX))
    .map((entry) => entry.name)
    .sort();
}

const isEntrypoint = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isEntrypoint) {
  process.exitCode = await run();
}
