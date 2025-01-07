import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { elementExists } from "../elementExists.ts";

describe("the elementExists function", () => {
  it("returns false when target is null", () => {
    expect(elementExists(null)).toBeFalsy();
  });

  it("returns false when target is undefined", () => {
    expect(elementExists(undefined)).toBeFalsy();
  });

  it("returns true when target is a valid CSS selector for an existing element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(elementExists(`#${element.id}`)).toBe(true);
  });

  it("returns false when target is a CSS selector for a non-existing element", () => {
    render(`<div id="test">Test</div>`);

    expect(elementExists(selectorForNonExistent)).toBeFalsy();
  });

  it("returns true when target is an existing element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(elementExists(element)).toBe(true);
  });

  it("returns false when target is a non-existing element", () => {
    const element = document.createElement("div");

    expect(elementExists(element)).toBeFalsy();
  });
});
