import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  outExtension: () => ({ js: ".mjs" }),
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: true,
  minify: false,
  tsconfig: "./tsconfig.build.json",
});
