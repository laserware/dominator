import { createElem } from "../createElem.ts";

describe("the createElem function", () => {
  it("creates an element", () => {
    const result = createElem("<span>Test</span>", {
      attrs: { inert: null },
      cssVars: { "--color-bg": "blue" },
      data: { itemCount: 24 },
      styles: { margin: 0 },
    });

    expect(result).toHaveAttribute("inert", "");
    expect(result).toHaveAttribute("data-item-count", "24");
    expect(result).toHaveStyle("--color-bg: blue; margin: 0px;");
    expect(result).toHaveTextContent("Test");
  });
});
