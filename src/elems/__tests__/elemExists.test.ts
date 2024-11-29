import { render, selectorForNonExistent } from "../../testing.ts";
import { elemExists } from "../elemExists.ts";

describe("the elemExists function", () => {
  it("returns false when target is null", () => {
    expect(elemExists(null)).toBeFalsy();
  });

  it("returns false when target is undefined", () => {
    expect(elemExists(undefined)).toBeFalsy();
  });

  it("returns true when target is a valid CSS selector for an existing element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(elemExists(`#${element.id}`)).toBe(true);
  });

  it("returns false when target is a CSS selector for a non-existing element", () => {
    render(`<div id="test">Test</div>`);

    expect(elemExists(selectorForNonExistent)).toBeFalsy();
  });

  it("returns true when target is an existing element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(elemExists(element)).toBe(true);
  });

  it("returns false when target is a non-existing element", () => {
    const element = document.createElement("div");

    expect(elemExists(element)).toBeFalsy();
  });
});
