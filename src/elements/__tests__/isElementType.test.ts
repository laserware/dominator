import { render } from "../../testing.ts";
import { isElementType } from "../isElementType.ts";

describe("the isElementType function", () => {
  it("returns true if the target is of the specified tag type", () => {
    const target = document.createElement("div");

    expect(isElementType(target, "div")).toBeTruthy();
  });

  it("returns false if the target is not of the specified tag type", () => {
    const target = document.createElement("span");

    expect(isElementType(target, "div")).toBeFalsy();
  });

  it("handles CSS selector strings and return true for matching elements", () => {
    render(`<div class="test">Test</div>`);

    expect(isElementType(".test", "div")).toBeTruthy();
  });

  it("handles CSS selector strings and return false for non-matching elements", () => {
    render(`<span class="test">Test</span>`);

    expect(isElementType(".test", "div")).toBeFalsy();
  });

  it("returns false if the target is not a valid element", () => {
    // @ts-ignore
    expect(isElementType(null, "div")).toBeFalsy();

    // @ts-ignore
    expect(isElementType(undefined, "div")).toBeFalsy();
  });
});
