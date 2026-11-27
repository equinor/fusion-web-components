#!/usr/bin/env node
/**
 * Read-only static invariant checker for Fusion Design non-negotiable UI rules.
 * Uses erasable TypeScript syntax so Node >= 22.18 / 24+ and Bun run it natively.
 *
 * Blueprint safety invariants (preserve when adapting):
 * - Read-only: inspects local source files only; never modifies files, writes state, or accesses the network.
 * - Bounded: skips dependency/build directories and files larger than 1 MiB.
 * - Non-sensitive: reports file paths, line numbers, and rule IDs only; never prints environment variables or secrets.
 *
 * Usage:
 *   node scripts/check-design-invariants.ts [--json] <path> [more paths...]
 *   bun scripts/check-design-invariants.ts [--json] <path> [more paths...]
 *
 * Exit codes:
 *   0 = no violations found
 *   1 = one or more design invariant violations found
 *   2 = invalid arguments or unreadable target path
 */

import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface DesignFinding {
  file: string;
  line: number;
  rule:
    | "bare-text-tag"
    | "banner-icon-outside-banner"
    | "block-typography-in-banner-message"
    | "hardcoded-px-spacing";
  message: string;
}

const MAX_FILE_BYTES = 1024 * 1024;
const IGNORED_DIRS = new Set([
  ".git",
  "node_modules",
  "vendor",
  "dist",
  "build",
  "coverage",
  ".next",
  ".turbo",
]);
const TSX_EXTENSIONS = new Set([".tsx", ".jsx"]);
const STYLE_EXTENSIONS = new Set([".css", ".scss", ".less", ".tsx", ".jsx", ".ts", ".js"]);

const BARE_TEXT_TAG_RE = /<(h[1-6]|p|span)(?=[\s>])/g;
const NON_ZERO_PX = "(?<![\\w-])-?(?:0*\\.[0-9]*[1-9][0-9]*|[1-9][0-9]*(?:\\.[0-9]+)?)px\\b";
const HARDCODED_SPACING_CSS_RE = new RegExp(
  `\\b(?:padding|margin|gap)(?:-(?:top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end))?\\s*:\\s*[^;\\n}]*?${NON_ZERO_PX}`,
  "gi",
);
const HARDCODED_SPACING_JS_RE = new RegExp(
  `\\b(?:padding|margin|gap|paddingTop|paddingRight|paddingBottom|paddingLeft|paddingInline|paddingBlock|paddingInlineStart|paddingInlineEnd|paddingBlockStart|paddingBlockEnd|marginTop|marginRight|marginBottom|marginLeft|marginInline|marginBlock|marginInlineStart|marginInlineEnd|marginBlockStart|marginBlockEnd|rowGap|columnGap)\\s*:\\s*['"\`][^'"\`\\n]*?${NON_ZERO_PX}[^'"\`\\n]*['"\`]`,
  "g",
);
const BANNER_TOKEN_RE =
  /<\/Banner\s*>|<Banner(?=\s|>)(?:[^>"']|"[^"]*"|'[^']*')*>|<(?:BannerIcon|Banner\.Icon)\b/g;
const BANNER_MESSAGE_BLOCK_RE = /<BannerMessage\b[^>]*>([\s\S]*?)<\/BannerMessage>/g;
const TYPOGRAPHY_TAG_RE = /<Typography\b([^>]*)>/g;

function lineNumberAt(source: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (source.charCodeAt(i) === 10) {
      line += 1;
    }
  }
  return line;
}

function stripCommentsPreservingLines(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, " "))
    .replace(
      /(^|[^:\\])\/\/[^\n]*/g,
      (match, prefix: string) => `${prefix}${" ".repeat(match.length - prefix.length)}`,
    );
}

export function checkSource(filePath: string, rawSource: string): DesignFinding[] {
  const ext = extname(filePath).toLowerCase();
  if (!STYLE_EXTENSIONS.has(ext)) {
    return [];
  }

  const source = stripCommentsPreservingLines(rawSource);
  const findings: DesignFinding[] = [];

  if (TSX_EXTENSIONS.has(ext)) {
    for (const match of source.matchAll(BARE_TEXT_TAG_RE)) {
      const tag = match[1];
      findings.push({
        file: filePath,
        line: lineNumberAt(source, match.index ?? 0),
        rule: "bare-text-tag",
        message: `Bare <${tag}> tag found; use EDS <Typography> instead.`,
      });
    }

    let bannerDepth = 0;
    for (const match of source.matchAll(BANNER_TOKEN_RE)) {
      const token = match[0];
      if (token.startsWith("</Banner")) {
        bannerDepth = Math.max(0, bannerDepth - 1);
      } else if (token.startsWith("<BannerIcon") || token.startsWith("<Banner.Icon")) {
        if (bannerDepth === 0) {
          findings.push({
            file: filePath,
            line: lineNumberAt(source, match.index ?? 0),
            rule: "banner-icon-outside-banner",
            message: "<BannerIcon> rendered outside <Banner> (runtime crash risk).",
          });
        }
      } else if (!token.endsWith("/>")) {
        bannerDepth += 1;
      }
    }

    for (const match of source.matchAll(BANNER_MESSAGE_BLOCK_RE)) {
      const blockStart = match.index ?? 0;
      const inner = match[1] ?? "";
      const innerOffset = (match[0] ?? "").indexOf(inner);
      for (const typo of inner.matchAll(TYPOGRAPHY_TAG_RE)) {
        const attrs = typo[1] ?? "";
        if (!/\bas\s*=\s*['"]span['"]/.test(attrs)) {
          findings.push({
            file: filePath,
            line: lineNumberAt(source, blockStart + innerOffset + (typo.index ?? 0)),
            rule: "block-typography-in-banner-message",
            message:
              "Block <Typography> nested inside <BannerMessage> (invalid HTML/hydration failure).",
          });
        }
      }
    }
  }

  const spacingPatterns =
    ext === ".css" || ext === ".scss" || ext === ".less"
      ? [HARDCODED_SPACING_CSS_RE]
      : [HARDCODED_SPACING_JS_RE, HARDCODED_SPACING_CSS_RE];

  const seenSpacingLines = new Set<number>();
  for (const pattern of spacingPatterns) {
    for (const match of source.matchAll(pattern)) {
      const line = lineNumberAt(source, match.index ?? 0);
      if (!seenSpacingLines.has(line)) {
        seenSpacingLines.add(line);
        findings.push({
          file: filePath,
          line,
          rule: "hardcoded-px-spacing",
          message: "Hardcoded px spacing in padding/margin/gap; use EDS spacing variables.",
        });
      }
    }
  }

  findings.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));
  return findings;
}

function collectFiles(targetPath: string, out: string[], skippedOversized: string[]): void {
  const stat = lstatSync(targetPath);
  if (stat.isSymbolicLink()) {
    return;
  }
  if (stat.isFile()) {
    if (STYLE_EXTENSIONS.has(extname(targetPath).toLowerCase())) {
      if (stat.size <= MAX_FILE_BYTES) {
        out.push(targetPath);
      } else {
        skippedOversized.push(targetPath);
      }
    }
    return;
  }
  if (!stat.isDirectory()) {
    return;
  }
  for (const entry of readdirSync(targetPath, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name) || entry.isSymbolicLink()) {
      continue;
    }
    collectFiles(resolve(targetPath, entry.name), out, skippedOversized);
  }
}

export interface RunCliDeps {
  readFile?: (filePath: string, encoding: BufferEncoding) => string;
}

export function runCli(argv: string[], deps: RunCliDeps = {}): number {
  const readFile = deps.readFile ?? readFileSync;
  let jsonOutput = false;
  const rawTargets: string[] = [];

  for (const arg of argv) {
    if (arg === "--json") {
      jsonOutput = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node check-design-invariants.ts [--json] <path> [more paths...]");
      return 0;
    } else if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      return 2;
    } else {
      rawTargets.push(arg);
    }
  }

  if (rawTargets.length === 0) {
    console.error("Error: provide at least one file or directory path to check.");
    return 2;
  }

  const files: string[] = [];
  const skippedOversized: string[] = [];
  for (const rawTarget of rawTargets) {
    const resolved = resolve(rawTarget);
    try {
      collectFiles(resolved, files, skippedOversized);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error reading target "${rawTarget}": ${message}`);
      return 2;
    }
  }

  const cwd = process.cwd();
  const allFindings: DesignFinding[] = [];
  for (const file of files) {
    const displayPath = relative(cwd, file) || file;
    let content: string;
    try {
      content = readFile(file, "utf8");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error reading file "${displayPath}": ${message}`);
      return 2;
    }
    allFindings.push(...checkSource(displayPath, content));
  }

  const skippedDisplay = skippedOversized.map((file) => relative(cwd, file) || file);

  if (jsonOutput) {
    console.log(
      JSON.stringify(
        {
          filesChecked: files.length,
          skippedOversized: skippedDisplay,
          violations: allFindings,
        },
        null,
        2,
      ),
    );
  } else {
    for (const item of allFindings) {
      console.log(`${item.file}:${item.line} [${item.rule}] ${item.message}`);
    }
    if (skippedDisplay.length > 0) {
      console.error(
        `Skipped ${skippedDisplay.length} oversized file(s) (>1 MiB); scan incomplete: ${skippedDisplay.join(", ")}`,
      );
    }
    console.log(
      `Design invariants: ${allFindings.length} violation(s) across ${files.length} file(s).`,
    );
  }

  if (skippedDisplay.length > 0) {
    return 2;
  }
  return allFindings.length > 0 ? 1 : 0;
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  process.exitCode = runCli(process.argv.slice(2));
}
