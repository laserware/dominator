/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  categorizeByGroup: false,
  categoryOrder: ["Attrs", "CSS", "Data", "Elems", "Styles", "DOM", "Other"],
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
    includeCategories: true,
    includeFolders: false,
    includeGroups: true,
  },
  out: "site",
  useFirstParagraphOfCommentAsSummary: true,
};

export default config;
