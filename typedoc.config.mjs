/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  categorizeByGroup: false,
  categoryOrder: ["Attrs", "CSS", "Data", "Elems", "Styles", "DOM", "Other"],
  cleanOutputDir: true,
  entryPoints: ["./src/index.ts"],
  exclude: [
    "**/**test.ts",
    "src/internal/**",
    "src/testing.ts",
    "src/declarations.d.ts",
  ],
  excludeInternal: true,
  excludeNotDocumented: true,
  headings: {
    readme: false,
    document: false,
  },
  hideGenerator: true,
  navigation: {
    compactFolders: true,
    excludeReferences: true,
    includeCategories: true,
    includeFolders: false,
    includeGroups: true,
  },
  navigationLinks: {
    GitHub: "https://github.com/laserware/dominator",
  },
  out: "site",
  readme: "./README.md",
};

export default config;
