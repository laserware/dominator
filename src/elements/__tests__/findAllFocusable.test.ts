import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { findAllFocusable } from "../findAllFocusable.ts";
import { findElement } from "../findElement.ts";
import { isElementType } from "../isElementType.ts";

describe("the findAllFocusable function", () => {
  it("returns all focusable elements in the document when no parent is specified", () => {
    render(`
      <div>
        <a href="#">Link</a>
        <input type="text" />
        <button>Button</button>
        <div>Non-focusable</div>
      </div>
    `);

    const result = findAllFocusable();

    expect(result).toHaveLength(3);
    expect(isElementType(result[0], "a")).toBeTruthy();
    expect(isElementType(result[1], "input")).toBeTruthy();
    expect(isElementType(result[2], "button")).toBeTruthy();
  });

  it("returns all focusable elements within the specified parent", () => {
    render(`
      <div>
        <div id="parent">
          <a href="#">Link</a>
          <input type="text" />
        </div>
        <button>Button outside parent</button>
      </div>
    `);

    const parent = findElement("#parent")!;

    const result = findAllFocusable(parent);

    expect(result).toHaveLength(2);
    expect(isElementType(result[0], "a")).toBeTruthy();
    expect(isElementType(result[1], "input")).toBeTruthy();
  });

  it("returns an empty array if no focusable elements are found", () => {
    const element = render(`
      <div id="parent">
        <span>Non-focusable</span>
        <div>Non-focusable</div>
      </div>
    `);

    const result = findAllFocusable(element);

    expect(result).toHaveLength(0);
  });

  it("returns all focusable elements when parent is null", () => {
    render(`
      <div>
        <a href="#">Link</a>
        <input type="text" />
        <button>Button</button>
        <div>Non-focusable</div>
      </div>
    `);

    const result = findAllFocusable(null);

    expect(result).toHaveLength(3);
    expect(isElementType(result[0], "a")).toBeTruthy();
    expect(isElementType(result[1], "input")).toBeTruthy();
    expect(isElementType(result[2], "button")).toBeTruthy();
  });

  it("returns all focusable elements when parent is undefined", () => {
    render(`
      <div>
        <a href="#">Link</a>
        <input type="text" />
        <button>Button</button>
        <div>Non-focusable</div>
      </div>
    `);

    const result = findAllFocusable(undefined);

    expect(result).toHaveLength(3);
    expect(isElementType(result[0], "a")).toBeTruthy();
    expect(isElementType(result[1], "input")).toBeTruthy();
    expect(isElementType(result[2], "button")).toBeTruthy();
  });
});
