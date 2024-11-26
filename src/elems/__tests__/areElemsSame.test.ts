import { render, selectorForNonExistent } from "../../testing.ts";
import { areElemsSame } from "../areElemsSame.ts";

describe("the areElemsSame function", () => {
  it("returns true for the same element", () => {
    const element = render(`<div id="test">Test</div>`);

    expect(areElemsSame(element, "#test")).toBeTruthy();
  });

  it("returns false if both elements are null", () => {
    // @ts-ignore
    expect(areElemsSame(null, null)).toBeFalsy();
  });

  it("returns false for different elements", () => {
    const elementLeft = render(`<div id="a">Test</div>`);
    const elementRight = render(`<div id="b">Test</div>`);

    expect(areElemsSame(elementLeft, elementRight)).toBeFalsy();
  });

  it("returns true if any element in the array matches the target element", () => {
    const elementA = render(`<div id="a">Test</div>`);
    const elementB = render(`<div id="b">Test</div>`);
    const elementC = render(`<div id="c">Test</div>`);

    expect(areElemsSame([elementA, elementB, elementC], "#a")).toBeTruthy();
  });

  it("returns false if no elements in the array match the target element", () => {
    const elementA = render(`<div id="a">Test</div>`);
    const elementB = render(`<div id="b">Test</div>`);
    const elementC = render(`<div id="c">Test</div>`);

    expect(areElemsSame([elementA, elementB, elementC], "#d")).toBeFalsy();
  });

  it("returns false for non-existing left element", () => {
    const left = render(`<div id="test">Test</div>`);

    expect(areElemsSame(selectorForNonExistent, left)).toBeFalsy();
  });

  it("returns false for non-existing right element", () => {
    const right = render(`<div id="test">Test</div>`);

    expect(areElemsSame(right, selectorForNonExistent)).toBeFalsy();
  });

  it("returns false for non-matching CSS selectors", () => {
    render(`<div id="test">Test</div>`);

    expect(areElemsSame("#test", selectorForNonExistent)).toBeFalsy();
  });
});
