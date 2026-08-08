/**
 * Build-blocking guard: confirms there is exactly one authoritative product
 * registry (BPIP Phase 2). Two things must both hold:
 *
 * 1. No file outside `shared/productIntelligence/publishedRegistry.ts` and
 *    `shared/productIntelligence/internalCandidates.ts` defines a hardcoded
 *    product record (a `slug: "<literal>"` key). If this ever fires, a
 *    second, independent source of product data has been introduced —
 *    exactly what BPIP Phase 2 removed.
 * 2. `functions/api/export-quote.ts` (the RFQ Function) imports its product
 *    data from `shared/productIntelligence`, not from
 *    `client/src/data/products.ts`. The website may still use
 *    `client/src/data/products.ts` as a presentation-layer adapter, but the
 *    server-trusted RFQ allowlist must read the registry directly.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["client/src", "functions", "shared"];
const SKIP_DIR_NAMES = new Set(["node_modules", "dist", "ui"]);
const CANONICAL_REGISTRY_FILES = new Set([
  "shared/productIntelligence/publishedRegistry.ts",
  "shared/productIntelligence/internalCandidates.ts",
]);
const SLUG_LITERAL_PATTERN = /slug:\s*"[a-z0-9-]+"/;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR_NAMES.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (
      [".ts", ".tsx"].includes(extname(entry)) &&
      !entry.endsWith(".test.ts")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function verifySingleSourceOfTruth(): void {
  const violations: string[] = [];

  for (const dir of SCAN_DIRS) {
    const files = walk(join(ROOT, dir));
    for (const filePath of files) {
      const relativePath = relative(ROOT, filePath).replace(/\\/g, "/");
      if (CANONICAL_REGISTRY_FILES.has(relativePath)) continue;

      const contents = readFileSync(filePath, "utf8");
      if (SLUG_LITERAL_PATTERN.test(contents)) {
        violations.push(
          `${relativePath} contains a hardcoded product-record slug literal — a second source of product data.`
        );
      }
    }
  }

  const rfqFunctionPath = join(ROOT, "functions/api/export-quote.ts");
  const rfqFunctionSource = readFileSync(rfqFunctionPath, "utf8");
  // Match only actual import statement paths (quoted module specifiers),
  // not prose in comments that happens to mention the same path.
  const importsFromClientProducts =
    /from\s+["'][^"']*client\/src\/data\/products["']/.test(rfqFunctionSource);
  const importsFromSharedRegistry =
    /from\s+["'][^"']*shared\/productIntelligence[^"']*["']/.test(
      rfqFunctionSource
    );

  if (importsFromClientProducts) {
    violations.push(
      "functions/api/export-quote.ts imports from client/src/data/products — the RFQ Function must consume shared/productIntelligence directly."
    );
  }
  if (!importsFromSharedRegistry) {
    violations.push(
      "functions/api/export-quote.ts does not import from shared/productIntelligence."
    );
  }

  if (violations.length > 0) {
    throw new Error(
      `Single-source-of-truth check failed:\n${violations.join("\n")}`
    );
  }

  console.info(
    "Verified exactly one authoritative product registry (shared/productIntelligence) and that the RFQ Function consumes it directly."
  );
}

try {
  verifySingleSourceOfTruth();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
