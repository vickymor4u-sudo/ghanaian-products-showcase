/**
 * Build-blocking guard: confirms Google/Bing site-verification meta tags
 * end up in the raw built index.html, not only in the post-hydration DOM.
 * Run after `vite build` (see package.json).
 *
 * This exists because both providers' "HTML tag" verification methods
 * fetch the document without executing JavaScript. A tag added by React
 * after mount is real and visible in a browser's rendered DOM, but
 * invisible to that fetch — which is exactly the bug this guard prevents
 * from being reintroduced. See the Vite plugin in vite.config.ts and
 * docs/SEO_FOUNDATION.md.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const INDEX_HTML_PATH = resolve("dist/public/index.html");

interface VerificationTag {
  envVar: string;
  metaName: string;
}

const TAGS: VerificationTag[] = [
  { envVar: "VITE_GOOGLE_SITE_VERIFICATION", metaName: "google-site-verification" },
  { envVar: "VITE_BING_SITE_VERIFICATION", metaName: "msvalidate.01" },
];

function verifySiteVerificationTags(): void {
  const html = readFileSync(INDEX_HTML_PATH, "utf8");
  const violations: string[] = [];
  const confirmed: string[] = [];

  for (const { envVar, metaName } of TAGS) {
    const value = process.env[envVar]?.trim();
    const tagPattern = new RegExp(
      `<meta[^>]*name=["']${metaName.replace(".", "\\.")}["'][^>]*>`,
      "i"
    );
    const match = html.match(tagPattern);

    if (value) {
      if (!match) {
        violations.push(
          `${envVar} is set, but no <meta name="${metaName}"> tag was found in ${INDEX_HTML_PATH}.`
        );
      } else if (!match[0].includes(value)) {
        violations.push(
          `<meta name="${metaName}"> is present in ${INDEX_HTML_PATH} but its content does not match ${envVar}.`
        );
      } else {
        confirmed.push(metaName);
      }
    } else if (match) {
      violations.push(
        `${envVar} is unset, but a <meta name="${metaName}"> tag was still found in ${INDEX_HTML_PATH}. It must be fully absent, not empty, when unconfigured.`
      );
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Site-verification meta tag check failed:\n${violations.join("\n")}`
    );
  }

  console.info(
    confirmed.length > 0
      ? `Verified ${confirmed.join(" and ")} present in built index.html with matching content.`
      : "Verified no site-verification meta tags are present (none configured)."
  );
}

try {
  verifySiteVerificationTags();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
