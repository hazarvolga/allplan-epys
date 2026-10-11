import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["lib/demo/**/*.ts", "scripts/check-content.ts"],
      exclude: ["**/types.ts"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
