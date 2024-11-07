import { fileURLToPath } from "node:url";

import { filePatterns, getBaseConfigs } from "@laserware/eslint-config/base";

const thisDirPath = fileURLToPath(new URL(".", import.meta.url));

const baseConfigs = getBaseConfigs({
  tsConfigRootDir: thisDirPath,
  tsConfigFiles: ["./tsconfig.json", "./tsconfig.node.json"],
});

export default [
  ...baseConfigs,
  {
    files: filePatterns.base,
    rules: {
      "import/order": [
        "error",
        {
          // prettier-ignore
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "object",
          ],
          "newlines-between": "always-and-inside-groups",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          named: {
            cjsExports: true,
            enabled: true,
            export: true,
            import: true,
            require: true,
            types: "types-last",
          },
        },
      ],
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
];
