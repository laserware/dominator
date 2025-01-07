import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { hasParentElement } from "../hasParentElement.ts";

describe("the hasParentElement function", () => {
  it("returns true when the child is directly within the parent", () => {
    const child = render("<span></span>");
    const parent = render("<div></div>", {}, child);

    expect(hasParentElement(child, parent)).toBe(true);
  });

  it("returns true when the child is deeply nested within the parent", () => {
    const child = render("<span></span>");
    const middle = render("<span></span>", {}, child);
    const parent = render("<div></div>", {}, middle);

    parent.appendChild(middle);
    middle.appendChild(child);

    expect(hasParentElement(child, parent)).toBe(true);
  });

  it("returns false when the child is not in the parent", () => {
    const child = render("<span></span>");
    const parent = render("<div></div>");

    expect(hasParentElement(child, parent)).toBeFalsy();
  });

  it("returns false when the parent is null", () => {
    const child = render("<span></span>");

    expect(hasParentElement(child, null)).toBeFalsy();
  });

  it("returns false when the child is null", () => {
    const parent = render("<div></div>");

    expect(hasParentElement(null, parent)).toBeFalsy();
  });

  it("returns true when CSS selectors find matching parent and child", () => {
    const child = render(`<span id="child"></span>`);
    render(`<div id="parent"></div>`, {}, child);

    expect(hasParentElement("#child", "#parent")).toBe(true);
  });

  it("returns false for CSS selectors when child is not within parent", () => {
    render(`<span id="child"></span>`);
    render(`<div id="parent"></div>`);

    expect(hasParentElement("#child", "#parent")).toBeFalsy();
  });

  it("returns false when invalid CSS selectors are provided", () => {
    expect(hasParentElement("#invalid-child", "#invalid-parent")).toBeFalsy();
  });
});
