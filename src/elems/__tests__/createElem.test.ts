import { createElem } from "../createElem.ts";

describe("the createElem function", () => {
  it("creates an element from a simple HTML string", () => {
    const result = createElem(`<div>Test</div>`);

    expect(result).toBeInstanceOf(HTMLDivElement);
  });

  it("assigns provided attributes to the created element", () => {
    const result = createElem(`<div>Test</div>`, {
      attrs: {
        id: "test-id",
        class: "test-class",
      },
    });

    expect(result).toHaveAttribute("id", "test-id");
    expect(result).toHaveAttribute("class", "test-class");
  });

  it("assigns provided CSS variables to the created element", () => {
    const result = createElem(`<div>Test</div>`, { cssVars: { "--test-var": "test-value" } });

    expect(result.style.getPropertyValue("--test-var")).toBe("test-value");
  });

  it("assigns provided dataset entries to the created element", () => {
    const result = createElem(`<div>Test</div>`, { data: { test: "test-data" } });

    expect(result.dataset.test).toBe("test-data");
  });

  it("assigns provided styles to the created element", () => {
    const results = createElem(`<div>Test</div>`, { styles: { color: "red" } });

    expect(results.style.color).toBe("red");
  });

  it("throws an error for invalid markup", () => {
    expect(() => {
      createElem("<div");
    }).toThrow(/Unable to create element/);
  });
});
