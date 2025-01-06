import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { areElementsSame } from "../areElementsSame.ts";

describe("the areElementsSame function", () => {
  it("returns true for the same element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(areElementsSame(element, "#test")).toBeTruthy();
  });

  it("returns false if both elements are null", () => {
    // @ts-ignore
    expect(areElementsSame(null, null)).toBeFalsy();
  });

  it("returns false for different elements", () => {
    const elementLeft = render(`<div id="a">Test</div>`);
    const elementRight = render(`<div id="b">Test</div>`);

    expect(areElementsSame(elementLeft, elementRight)).toBeFalsy();
  });

  it("returns true if any element in the array matches the target element", () => {
    const elementA = render(`<div id="a">Test</div>`);
    const elementB = render(`<div id="b">Test</div>`);
    const elementC = render(`<div id="c">Test</div>`);

    expect(areElementsSame([elementA, elementB, elementC], "#a")).toBeTruthy();
  });

  it("returns false if no elements in the array match the target element", () => {
    const elementA = render(`<div id="a">Test</div>`);
    const elementB = render(`<div id="b">Test</div>`);
    const elementC = render(`<div id="c">Test</div>`);

    expect(areElementsSame([elementA, elementB, elementC], "#d")).toBeFalsy();
  });

  it("returns false for non-existing left element", () => {
    const left = render(`<div id="test">Test</div>`);

    expect(areElementsSame(selectorForNonExistent, left)).toBeFalsy();
  });

  it("returns false for non-existing right element", () => {
    const right = render(`<div id="test">Test</div>`);

    expect(areElementsSame(right, selectorForNonExistent)).toBeFalsy();
  });

  it("returns false for non-matching CSS selectors", () => {
    render(`<div id="test">Test</div>`);

    expect(areElementsSame("#test", selectorForNonExistent)).toBeFalsy();
  });
});
