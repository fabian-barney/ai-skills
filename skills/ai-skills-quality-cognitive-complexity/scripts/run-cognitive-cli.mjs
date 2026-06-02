import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const TOOL_CONFIG = {
  skillId: "ai-skills-quality-cognitive-complexity",
  npmPackage: "@barney-media/cognitive-typescript",
  npmBinPath: ["node_modules", "@barney-media", "cognitive-typescript", "dist", "bin.js"],
  mavenGroupPath: "media/barney",
  mavenArtifact: "cognitive-java-cli"
};

export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
export const FETCH_TIMEOUT_MS = 30_000;

const SUPPORTED_LANGUAGES = new Set(["typescript", "java"]);

export function parseCliRequest(argv) {
  const [language, separator, ...rest] = argv;

  if (!SUPPORTED_LANGUAGES.has(language)) {
    return {
      ok: false,
      message: "Usage: node <run-cognitive-cli.mjs> <typescript|java> [--] <tool args...>"
    };
  }

  return {
    ok: true,
    language,
    toolArgs: separator === "--"
      ? rest
      : argv.slice(1)
  };
}

export function parseNpmLatestVersion(metadata) {
  const latest = metadata?.["dist-tags"]?.latest;

  if (typeof latest !== "string" || latest.length === 0) {
    throw new Error("npm metadata does not include dist-tags.latest");
  }

  return safeVersionPathSegment(latest, "npm metadata dist-tags.latest");
}

export function parseMavenLatestVersion(metadataXml) {
  const latestMatch = /<latest>([^<]+)<\/latest>/u.exec(metadataXml);
  const releaseMatch = /<release>([^<]+)<\/release>/u.exec(metadataXml);
  const version = latestMatch?.[1] ?? releaseMatch?.[1];

  if (version === undefined || version.length === 0) {
    throw new Error("Maven metadata does not include latest or release version");
  }

  return safeVersionPathSegment(version, "Maven metadata version");
}

export function safeVersionPathSegment(version, source) {
  if (typeof version !== "string" || version.length === 0) {
    throw new Error(`${source} is not a safe version path segment`);
  }

  if (!/^[A-Za-z0-9][A-Za-z0-9._+-]*$/u.test(version) || version.includes("..")) {
    throw new Error(`${source} is not a safe version path segment`);
  }

  return version;
}

export function shouldRefreshMetadata(checkedAt, nowMs) {
  if (typeof checkedAt !== "string" || checkedAt.length === 0) {
    return true;
  }

  const checkedAtMs = Date.parse(checkedAt);

  return Number.isNaN(checkedAtMs) || checkedAtMs > nowMs || nowMs - checkedAtMs >= WEEK_MS;
}

export function buildToolCommand(language, executablePath, toolArgs) {
  if (language === "typescript") {
    return {
      command: process.execPath,
      args: [executablePath, ...toolArgs]
    };
  }

  if (language === "java") {
    return {
      command: "java",
      args: ["-jar", executablePath, ...toolArgs]
    };
  }

  throw new Error(`Unsupported language: ${language}`);
}

export function getCacheRoot(env = process.env, platform = process.platform) {
  const configuredCacheDir = env.AI_SKILLS_TOOL_CACHE_DIR?.trim();

  if (configuredCacheDir !== undefined && configuredCacheDir !== "") {
    return path.resolve(configuredCacheDir, TOOL_CONFIG.skillId);
  }

  const baseCacheDir = env.XDG_CACHE_HOME
    ?? (platform === "win32" ? env.LOCALAPPDATA : undefined)
    ?? path.join(os.homedir(), ".cache");

  return path.join(baseCacheDir, "ai-skills", TOOL_CONFIG.skillId);
}

export function createDefaultDeps() {
  return {
    cacheRoot: getCacheRoot(),
    downloadFile,
    exists: pathExists,
    fetchJson,
    fetchText,
    info: (message) => console.error(message),
    mkdir: async (directory) => fs.mkdir(directory, { recursive: true }),
    now: () => Date.now(),
    readDir: async (directory) => fs.readdir(directory, { withFileTypes: true }),
    readFile: async (filePath) => fs.readFile(filePath),
    readJson: async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8")),
    rm: async (target) => fs.rm(target, { force: true, recursive: true }),
    runProcess,
    warn: (message) => console.error(message),
    writeJson: async (filePath, value) => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
    }
  };
}

export async function resolveTool(language, deps = createDefaultDeps()) {
  const cacheRoot = deps.cacheRoot ?? getCacheRoot();
  const languageRoot = path.join(cacheRoot, language);
  const statePath = path.join(languageRoot, "state.json");
  const state = await readState(statePath, deps);
  const cachedTool = await getCachedTool(language, languageRoot, state, deps);

  if (cachedTool?.fromState === true && !shouldRefreshMetadata(state.checkedAt, deps.now())) {
    return toolResult(cachedTool);
  }

  try {
    const latestVersion = await fetchLatestVersion(language, deps);
    const executablePath = executablePathFor(language, languageRoot, latestVersion);

    if (!await deps.exists(executablePath)) {
      await installTool(language, languageRoot, latestVersion, deps);
    }

    if (!await deps.exists(executablePath)) {
      throw new Error(`installed cognitive ${language} CLI is missing at ${executablePath}`);
    }

    await deps.writeJson(statePath, {
      checkedAt: new Date(deps.now()).toISOString(),
      version: latestVersion
    });
    await removeOutdatedVersions(language, languageRoot, latestVersion, deps);

    return {
      executablePath,
      language,
      stale: false,
      version: latestVersion
    };
  } catch (error) {
    if (cachedTool !== undefined) {
      deps.warn(`Using cached cognitive ${language} CLI ${cachedTool.version}: ${toErrorMessage(error)}`);
      return {
        ...toolResult(cachedTool),
        stale: true
      };
    }

    throw new Error(
      `Cannot resolve cognitive ${language} CLI and no cached tool is available: ${toErrorMessage(error)}`
    );
  }
}

export async function run(argv, deps = createDefaultDeps()) {
  const request = parseCliRequest(argv);

  if (!request.ok) {
    console.error(request.message);
    return 1;
  }

  const tool = await resolveTool(request.language, deps);
  const command = buildToolCommand(request.language, tool.executablePath, request.toolArgs);

  deps.info?.(formatResolvedToolMessage(tool));

  return deps.runProcess(command.command, command.args);
}

export function formatResolvedToolMessage(tool) {
  const cacheStatus = tool.stale ? "stale-cache" : "cache";

  return `Resolved cognitive ${tool.language} CLI ${tool.version} (${cacheStatus}) at ${tool.executablePath}`;
}

async function readState(statePath, deps) {
  try {
    return await deps.readJson(statePath);
  } catch {
    return {};
  }
}

async function getCachedTool(language, languageRoot, state, deps) {
  const stateTool = await getCachedToolFromState(language, languageRoot, state, deps);

  return stateTool ?? getCachedToolFromDisk(language, languageRoot, deps);
}

async function getCachedToolFromState(language, languageRoot, state, deps) {
  if (typeof state.version !== "string") {
    return undefined;
  }

  let version;

  try {
    version = safeVersionPathSegment(state.version, "cached cognitive CLI state version");
  } catch (error) {
    deps.warn(`Ignoring cached cognitive ${language} CLI state: ${toErrorMessage(error)}`);
    return undefined;
  }

  return getCachedToolForVersion(language, languageRoot, version, deps, true);
}

async function getCachedToolFromDisk(language, languageRoot, deps) {
  let entries;

  try {
    entries = await deps.readDir(languageRoot);
  } catch {
    return undefined;
  }

  const versions = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => safeVersionCandidate(entry.name, `cached cognitive ${language} CLI directory`, deps))
    .filter((version) => version !== undefined)
    .sort((left, right) => right.localeCompare(left, undefined, {
      numeric: true,
      sensitivity: "base"
    }));

  for (const version of versions) {
    const cachedTool = await getCachedToolForVersion(language, languageRoot, version, deps, false);

    if (cachedTool !== undefined) {
      return cachedTool;
    }
  }

  return undefined;
}

function safeVersionCandidate(version, source, deps) {
  try {
    return safeVersionPathSegment(version, source);
  } catch (error) {
    deps.warn(`Ignoring unsafe ${source}: ${toErrorMessage(error)}`);
    return undefined;
  }
}

async function getCachedToolForVersion(language, languageRoot, version, deps, fromState) {
  const executablePath = executablePathFor(language, languageRoot, version);

  if (!await deps.exists(executablePath)) {
    return undefined;
  }

  return {
    executablePath,
    fromState,
    language,
    stale: false,
    version
  };
}

function toolResult(tool) {
  return {
    executablePath: tool.executablePath,
    language: tool.language,
    stale: tool.stale,
    version: tool.version
  };
}

async function fetchLatestVersion(language, deps) {
  if (language === "typescript") {
    const metadata = await deps.fetchJson(
      `https://registry.npmjs.org/${encodeURIComponent(TOOL_CONFIG.npmPackage).replace("%40", "@")}`
    );

    return parseNpmLatestVersion(metadata);
  }

  if (language === "java") {
    const metadataXml = await deps.fetchText(mavenMetadataUrl());

    return parseMavenLatestVersion(metadataXml);
  }

  throw new Error(`Unsupported language: ${language}`);
}

async function installTool(language, languageRoot, version, deps) {
  const versionRoot = path.join(languageRoot, version);

  await deps.mkdir(versionRoot);

  if (language === "typescript") {
    const npmCommand = await npmCommandSpec(deps);
    const exitCode = await deps.runProcess(
      npmCommand.command,
      [
        ...npmCommand.args,
        "install",
        "--prefix",
        versionRoot,
        "--no-save",
        "--no-audit",
        "--no-fund",
        "--ignore-scripts",
        `${TOOL_CONFIG.npmPackage}@${version}`
      ],
      { shell: npmCommand.shell === true }
    );

    if (exitCode !== 0) {
      throw new Error(`npm install failed with exit code ${exitCode}`);
    }

    return;
  }

  if (language === "java") {
    await downloadVerifiedMavenJar(languageRoot, version, deps);
    return;
  }

  throw new Error(`Unsupported language: ${language}`);
}

function executablePathFor(language, languageRoot, version) {
  const safeVersion = safeVersionPathSegment(version, "cognitive CLI version");

  if (language === "typescript") {
    return path.join(languageRoot, safeVersion, ...TOOL_CONFIG.npmBinPath);
  }

  if (language === "java") {
    return path.join(languageRoot, safeVersion, `${TOOL_CONFIG.mavenArtifact}-${safeVersion}.jar`);
  }

  throw new Error(`Unsupported language: ${language}`);
}

async function downloadVerifiedMavenJar(languageRoot, version, deps) {
  const jarPath = executablePathFor("java", languageRoot, version);
  const expectedChecksum = parseSha256Checksum(await deps.fetchText(mavenJarChecksumUrl(version)));

  await deps.downloadFile(mavenJarUrl(version), jarPath);

  const actualChecksum = sha256(await deps.readFile(jarPath));

  if (actualChecksum !== expectedChecksum) {
    try {
      await deps.rm(jarPath);
    } catch (error) {
      deps.warn(`Could not remove invalid cognitive java CLI ${version}: ${toErrorMessage(error)}`);
    }

    throw new Error(`Maven JAR checksum mismatch for ${TOOL_CONFIG.mavenArtifact} ${version}`);
  }
}

async function removeOutdatedVersions(language, languageRoot, currentVersion, deps) {
  let entries;

  try {
    entries = await deps.readDir(languageRoot);
  } catch {
    return;
  }

  const outdatedVersions = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => safeVersionCandidate(entry.name, `outdated cognitive ${language} CLI directory`, deps))
    .filter((version) => version !== undefined && version !== currentVersion);

  await Promise.all(outdatedVersions
    .map(async (version) => {
      try {
        await deps.rm(path.join(languageRoot, version));
      } catch (error) {
        deps.warn(`Could not remove outdated cognitive ${language} CLI ${version}: ${toErrorMessage(error)}`);
      }
    }));
}

function mavenMetadataUrl() {
  return `https://repo.maven.apache.org/maven2/${TOOL_CONFIG.mavenGroupPath}/${TOOL_CONFIG.mavenArtifact}/maven-metadata.xml`;
}

function mavenJarUrl(version) {
  return `https://repo.maven.apache.org/maven2/${TOOL_CONFIG.mavenGroupPath}/${TOOL_CONFIG.mavenArtifact}/${version}/${TOOL_CONFIG.mavenArtifact}-${version}.jar`;
}

function mavenJarChecksumUrl(version) {
  return `${mavenJarUrl(version)}.sha256`;
}

export function parseSha256Checksum(checksumText) {
  const checksum = checksumText.trim().split(/\s+/u)[0]?.toLowerCase();

  if (checksum === undefined || !/^[a-f0-9]{64}$/u.test(checksum)) {
    throw new Error("Maven checksum response does not include a SHA-256 digest");
  }

  return checksum;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export async function npmCommandSpec(deps = createDefaultDeps(), platform = process.platform) {
  for (const candidate of npmCliPathCandidates()) {
    if (await deps.exists(candidate)) {
      return {
        command: process.execPath,
        args: [candidate]
      };
    }
  }

  return platform === "win32"
    ? { command: "npm.cmd", args: [], shell: true }
    : { command: "npm", args: [] };
}

function npmCliPathCandidates() {
  const nodeBinDir = path.dirname(process.execPath);

  return [
    path.resolve(nodeBinDir, "node_modules", "npm", "bin", "npm-cli.js"),
    path.resolve(nodeBinDir, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js"),
    path.resolve(nodeBinDir, "..", "node_modules", "npm", "bin", "npm-cli.js")
  ];
}

export async function fetchJson(url) {
  const response = await fetch(url, fetchRequestInit());

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }

  return response.json();
}

export async function fetchText(url) {
  const response = await fetch(url, fetchRequestInit());

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }

  return response.text();
}

export async function downloadFile(url, filePath) {
  const response = await fetch(url, fetchRequestInit());

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, bytes);
}

function fetchRequestInit() {
  return {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  };
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: options.shell === true,
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      resolve(code ?? 1);
    });
  });
}

const isEntrypoint = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isEntrypoint) {
  try {
    process.exitCode = await run(process.argv.slice(2));
  } catch (error) {
    console.error(toErrorMessage(error));
    process.exitCode = 1;
  }
}

function toErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
