import { render, selectorForNonExistent } from "../../testing.ts";
import { findElement } from "../findElement.ts";
import { isElementChildOf } from "../isElementChildOf.ts";

describe("the isElementChildOf function", () => {
  beforeEach(() => {
    render(`
      <div id="parent">
        <div id="child">
          <div id="grandchild">
            <div id="great-grandchild">Test</div>
          </div>
        </div>
      </div>
    `);
  });

  it("returns true when child is a direct child of parent", () => {
    const child = findElement("#child")!;
    const parent = findElement("#parent")!;

    expect(isElementChildOf(child, parent)).toBeTruthy();
  });

  it("returns false when child is not a child of parent", () => {
    const child = findElement("#child")!;
    const parent = render(`<div>Test</div>`);

    expect(isElementChildOf(child, parent)).toBeFalsy();
  });

  it("returns true when child is a descendant of parent", () => {
    const grandchild = findElement("#grandchild")!;
    const parent = findElement("#parent")!;

    expect(isElementChildOf(grandchild, parent)).toBeTruthy();
  });

  it("returns false if child or parent does not exist", () => {
    expect(isElementChildOf(selectorForNonExistent, "#parent")).toBeFalsy();

    expect(isElementChildOf("#child", selectorForNonExistent)).toBeFalsy();
  });

  it("returns false if the child and parent match", () => {
    expect(isElementChildOf("#parent", "#parent")).toBeFalsy();
  });

  it("handles CSS selectors", () => {
    expect(isElementChildOf("#child", "#parent")).toBeTruthy();
    expect(isElementChildOf("#grandchild", "#parent")).toBeTruthy();
    expect(isElementChildOf("#child", selectorForNonExistent)).toBeFalsy();
  });
});
