/**
 * Build-blocking guard: confirms no BPIP internal-only candidate data
 * reached the client bundle. Run after `vite build` (see package.json).
 *
 * This exists because a bundler cannot tree-shake array elements out of a
 * runtime `.filter()` call — importing the wrong BPIP module from client
 * code would silently ship internal candidate product names and internal
 * status strings to every visitor's browser. See the module-boundary
 * comment in `shared/productIntelligence/publishedRegistry.ts`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { internalCandidates } from "../shared/productIntelligence/internalCandidates";

const ASSETS_DIR = resolve("dist/public/assets");

function collectForbiddenMarkers(): string[] {
  const markers = new Set<string>();

  for (const record of internalCandidates) {
    markers.add(record.slug);
    markers.add(record.name);
  }

  // Internal-only enum literals that should never appear client-side.
  markers.add("source_only_partner_selection");
  markers.add("supplier_branded_blocked");
  markers.add("internal_approval_required");

  return Array.from(markers);
}

function verifyNoInternalLeak(): void {
  const markers = collectForbiddenMarkers();
  const jsFiles = readdirSync(ASSETS_DIR).filter(file => file.endsWith(".js"));

  if (jsFiles.length === 0) {
    throw new Error(
      `No built JS assets found in ${ASSETS_DIR}. Run "vite build" first.`
    );
  }

  const violations: string[] = [];

  for (const file of jsFiles) {
    const contents = readFileSync(resolve(ASSETS_DIR, file), "utf8");
    for (const marker of markers) {
      if (contents.includes(marker)) {
        violations.push(`${file} contains internal-only marker: "${marker}"`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Internal-only BPIP data leaked into the client bundle:\n${violations.join("\n")}`
    );
  }

  console.info(
    `Verified no internal-only BPIP markers (${markers.length} checked) in ${jsFiles.length} built JS asset(s).`
  );
}

try {
  verifyNoInternalLeak();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
