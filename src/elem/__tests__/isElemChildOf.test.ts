import { render, selectorForNonExistent } from "../../testing.ts";
import { findElem } from "../findElem.ts";
import { isElemChildOf } from "../isElemChildOf.ts";

describe("isElemChildOf", () => {
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
    const child = findElem("#child")!;
    const parent = findElem("#parent")!;

    expect(isElemChildOf(child, parent)).toBeTruthy();
  });

  it("returns false when child is not a child of parent", () => {
    const child = findElem("#child")!;
    const parent = render(`<div>Test</div>`);

    expect(isElemChildOf(child, parent)).toBeFalsy();
  });

  it("returns true when child is a descendant of parent", () => {
    const grandchild = findElem("#grandchild")!;
    const parent = findElem("#parent")!;

    expect(isElemChildOf(grandchild, parent)).toBeTruthy();
  });

  it("returns false if child or parent does not exist", () => {
    expect(isElemChildOf(selectorForNonExistent, "#parent")).toBeFalsy();

    expect(isElemChildOf("#child", selectorForNonExistent)).toBeFalsy();
  });

  it("returns false if the child and parent match", () => {
    expect(isElemChildOf("#parent", "#parent")).toBeFalsy();
  });

  it("handles CSS selectors", () => {
    expect(isElemChildOf("#child", "#parent")).toBeTruthy();
    expect(isElemChildOf("#grandchild", "#parent")).toBeTruthy();
    expect(isElemChildOf("#child", selectorForNonExistent)).toBeFalsy();
  });
});
