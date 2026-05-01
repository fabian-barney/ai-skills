#!/usr/bin/env node

import { pathToFileURL } from "node:url";

export const VERSION = "0.1.0";

export interface CliIo {
  stderr: NodeJS.WritableStream;
  stdout: NodeJS.WritableStream;
}

const HELP = `ai-skills ${VERSION}

Usage:
  ai-skills <command>

Commands:
  install    Install the packaged ai-skills catalog (implemented in a later issue)
  update     Update the packaged ai-skills catalog (implemented in a later issue)

Options:
  -h, --help     Show this help message
  -v, --version  Show the package version
`;

export function run(argv = process.argv.slice(2), io: CliIo = process): number {
  const [command] = argv;

  if (command === undefined || command === "-h" || command === "--help") {
    io.stdout.write(HELP);
    return 0;
  }

  if (command === "-v" || command === "--version") {
    io.stdout.write(`${VERSION}\n`);
    return 0;
  }

  if (command === "install" || command === "update") {
    io.stderr.write(`ai-skills ${command} is not implemented in this package scaffold yet.\n`);
    return 1;
  }

  io.stderr.write(`Unknown command: ${command}\n\n${HELP}`);
  return 1;
}

const isEntrypoint = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntrypoint) {
  process.exitCode = run();
}
