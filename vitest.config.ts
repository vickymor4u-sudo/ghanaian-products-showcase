import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  test: {
    environment: "node",
    include: [
      "functions/**/*.test.ts",
      "shared/**/*.test.ts",
      "client/src/lib/**/*.test.ts",
    ],
  },
});
