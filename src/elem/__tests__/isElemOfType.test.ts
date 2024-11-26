import { render } from "../../testing.ts";
import { isElemOfType } from "../isElemOfType.ts";

describe("the isElemOfType function", () => {
  it("returns true if the target is of the specified tag type", () => {
    const target = document.createElement("div");

    expect(isElemOfType(target, "div")).toBeTruthy();
  });

  it("returns false if the target is not of the specified tag type", () => {
    const target = document.createElement("span");

    expect(isElemOfType(target, "div")).toBeFalsy();
  });

  it("handles CSS selector strings and return true for matching elements", () => {
    render(`<div class="test">Test</div>`);

    expect(isElemOfType(".test", "div")).toBeTruthy();
  });

  it("handles CSS selector strings and return false for non-matching elements", () => {
    render(`<span class="test">Test</span>`);

    expect(isElemOfType(".test", "div")).toBeFalsy();
  });

  it("returns false if the target is not a valid element", () => {
    // @ts-ignore
    expect(isElemOfType(null, "div")).toBeFalsy();

    // @ts-ignore
    expect(isElemOfType(undefined, "div")).toBeFalsy();
  });
});
