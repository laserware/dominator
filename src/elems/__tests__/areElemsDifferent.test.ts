import { render, selectorForNonExistent } from "../../testing.ts";
import { areElemsDifferent } from "../areElemsDifferent.ts";

describe("the areElemsDifferent function", () => {
  it("returns false when both inputs are null", () => {
    const result = areElemsDifferent(selectorForNonExistent, selectorForNonExistent);

    expect(result).toBeFalsy();
  });

  it("returns true when comparing different elements", () => {
    const left = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);

    expect(areElemsDifferent(left, right)).toBeTruthy();
  });

  it("returns false when comparing the same element", () => {
    const element = render(`<div>Test</div>`);

    expect(areElemsDifferent(element, element)).toBeFalsy();
  });

  it("returns true when all elements in the array are different from the target", () => {
    const leftOne = render(`<div>Left</div>`);
    const leftTwo = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);

    expect(areElemsDifferent([leftOne, leftTwo], right)).toBeTruthy();
  });

  it("returns false when any element in the array is the same as the target", () => {
    const left = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);
    const span = render(`<span>Span</span>`);

    expect(areElemsDifferent([left, right, span], right)).toBeFalsy();
  });

  it("returns true when comparing a CSS selector with an element that doesn't match", () => {
    const element = render(`<div>Test</div>`);

    expect(areElemsDifferent(selectorForNonExistent, element)).toBeTruthy();
  });

  it("returns false when comparing a CSS selector with an element that matches", () => {
    const element = render(`<div id="target">Test</div>`);

    expect(areElemsDifferent("#target", element)).toBeFalsy();
  });

  it("returns true when all elements in the array are different from the CSS selector", () => {
    render(`<div id="target">Test</div>`);

    const leftOne = render(`<div>Left</div>`);
    const leftTwo = render(`<div>Left</div>`);

    expect(areElemsDifferent([leftOne, leftTwo], "#target")).toBeTruthy();
  });

  it("returns false when any element in the array matches the CSS selector", () => {
    const right = render(`<div id="right">Test</div>`);
    const left = render(`<div id="left">Test</div>`);

    expect(areElemsDifferent([left, right], "#right")).toBeFalsy();
  });
});
