import { render, selectorForNonExistent } from "../../testing.ts";
import { isElemSameOrChildOf } from "../isElemSameOrChildOf.ts";

describe("the isElemSameOrChildOf function", () => {
  it("returns true when the child and parent are the same element", () => {
    const element = render(`<div>Test</div>`);
    expect(isElemSameOrChildOf(element, element)).toBe(true);
  });

  it("returns true when the child is a direct child of the parent", () => {
    const child = render(`<span>Child</span>`);
    const parent = render(`<div>Parent</div>`, {}, child);

    expect(isElemSameOrChildOf(child, parent)).toBe(true);
  });

  it("returns true when the child is a nested child of the parent", () => {
    const child = render(`<span>Child</span>`);

    const parent = render(`<div>Parent</div>`, {}, render(`<div>Intermediate</div>`, {}, child));

    expect(isElemSameOrChildOf(child, parent)).toBe(true);
  });

  it("returns false when the child is not a descendant of the parent", () => {
    const parent = render(`<div>Parent</div>`);
    const child = render(`<span>Child</span>`);

    expect(isElemSameOrChildOf(child, parent)).toBeFalsy();
  });

  it("returns true when the child is identified by a CSS selector and is a child", () => {
    const parent = render(`<div>Parent</div>`, {}, render(`<span class="child">Child</span>`));

    expect(isElemSameOrChildOf(".child", parent)).toBe(true);
  });

  it("returns false when neither the child nor parent exist in the DOM", () => {
    // @ts-ignore
    expect(isElemSameOrChildOf(null, null)).toBeFalsy();
  });

  it("returns false when the CSS selector for child does not match any element", () => {
    const parent = render(`<div>Test</div>`);

    expect(isElemSameOrChildOf(selectorForNonExistent, parent)).toBeFalsy();
  });

  it("returns true when the parent is identified by a CSS selector and the child is a child", () => {
    const child = render(`<span>Child</span>`);

    render(`<div class="parent">Parent</div>`, {}, child);

    expect(isElemSameOrChildOf(child, ".parent")).toBe(true);
  });
});
