"use strict";

module.exports = {
  extends: ["@laserware/eslint-config"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: ["*.js", "*.cjs"],
  overrides: [
    {
      files: "*.test.ts",
      rules: {
        "import/no-named-as-default": "off"
      }
    }
  ]
};
