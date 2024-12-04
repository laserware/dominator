import { render } from "../../testing.ts";
import { isElementOfType } from "../isElementOfType.ts";

describe("the isElementOfType function", () => {
  it("returns true if the target is of the specified tag type", () => {
    const target = document.createElement("div");

    expect(isElementOfType(target, "div")).toBeTruthy();
  });

  it("returns false if the target is not of the specified tag type", () => {
    const target = document.createElement("span");

    expect(isElementOfType(target, "div")).toBeFalsy();
  });

  it("handles CSS selector strings and return true for matching elements", () => {
    render(`<div class="test">Test</div>`);

    expect(isElementOfType(".test", "div")).toBeTruthy();
  });

  it("handles CSS selector strings and return false for non-matching elements", () => {
    render(`<span class="test">Test</span>`);

    expect(isElementOfType(".test", "div")).toBeFalsy();
  });

  it("returns false if the target is not a valid element", () => {
    // @ts-ignore
    expect(isElementOfType(null, "div")).toBeFalsy();

    // @ts-ignore
    expect(isElementOfType(undefined, "div")).toBeFalsy();
  });
});
