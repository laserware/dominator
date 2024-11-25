import { fileURLToPath } from "node:url";

import { getBaseConfigs, filePatterns } from "@laserware/eslint-config/base";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));

const baseConfigs = getBaseConfigs({
  tsConfigRootDir: rootDirPath,
  tsConfigFiles: ["./tsconfig.json", "./tsconfig.node.json"],
});

export default [
  ...baseConfigs,
  {
    files: filePatterns.tests,
    rules: {
      "no-console": "off",
      "vitest/no-done-callback": "off",
      // In some cases, we _need_ to check if the value is `true` and not just
      // truthy:
      "vitest/prefer-to-be-truthy": "off",
    },
  },
  {
    ignores: ["eslint.config.mjs", "dist"],
  },
];
