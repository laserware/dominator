import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: resolve(rootDirPath, "vitest.setup.ts"),
    coverage: {
      provider: "istanbul",
      reporter: ["lcov"],
      include: ["src/**/*.ts"],
      clean: false,
    },
  },
});
