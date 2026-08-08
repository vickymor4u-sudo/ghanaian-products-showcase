import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite";

// Google/Bing site-verification meta tags must be present in the raw HTML
// response — both providers' "HTML tag" verification methods fetch the
// document without executing JavaScript, so a tag added by React after
// mount (as this used to be) is invisible to them even though it's easy to
// find in a rendered browser DOM. Injecting it here, at build time via
// transformIndexHtml, puts it in dist/public/index.html itself. Gated on
// the same VITE_-prefixed, public, non-secret env vars as every other
// config-gated feature in this app (see docs/SEO_FOUNDATION.md); the tag
// is omitted entirely, not emitted empty, when a var is unset.
function siteVerificationMetaPlugin(): Plugin {
  return {
    name: "borgafoods-site-verification-meta",
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];

      const google = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
      if (google) {
        tags.push({
          tag: "meta",
          attrs: { name: "google-site-verification", content: google },
          injectTo: "head",
        });
      }

      const bing = process.env.VITE_BING_SITE_VERIFICATION?.trim();
      if (bing) {
        tags.push({
          tag: "meta",
          attrs: { name: "msvalidate.01", content: bing },
          injectTo: "head",
        });
      }

      return tags;
    },
  };
}

const plugins = [react(), tailwindcss(), siteVerificationMetaPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
