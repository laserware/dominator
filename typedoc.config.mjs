/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  categorizeByGroup: false,
  cleanOutputDir: true,
  entryPoints: ["./src/index.ts"],
  entryPointStrategy: "expand",
  exclude: [
    "**/**test.ts",
    "src/internal/**",
    "src/testing.ts",
    "src/declarations.d.ts",
    // "src/dom.ts",
  ],
  excludeInternal: true,
  excludeNotDocumented: true,
  navigation: {
    compactFolders: true,
    excludeReferences: true,
    includeCategories: false,
    includeFolders: false,
    includeGroups: true,
  },
  out: "docs",
  useFirstParagraphOfCommentAsSummary: true,
};

export default config;
