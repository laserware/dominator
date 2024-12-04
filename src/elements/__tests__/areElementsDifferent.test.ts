import { render, selectorForNonExistent } from "../../testing.ts";
import { areElementsDifferent } from "../areElementsDifferent.ts";

describe("the areElementsDifferent function", () => {
  it("returns false when both inputs are null", () => {
    const result = areElementsDifferent(selectorForNonExistent, selectorForNonExistent);

    expect(result).toBeFalsy();
  });

  it("returns true when comparing different elements", () => {
    const left = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);

    expect(areElementsDifferent(left, right)).toBeTruthy();
  });

  it("returns false when comparing the same element", () => {
    const element = render(`<div>Test</div>`);

    expect(areElementsDifferent(element, element)).toBeFalsy();
  });

  it("returns true when all elements in the array are different from the target", () => {
    const leftOne = render(`<div>Left</div>`);
    const leftTwo = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);

    expect(areElementsDifferent([leftOne, leftTwo], right)).toBeTruthy();
  });

  it("returns false when any element in the array is the same as the target", () => {
    const left = render(`<div>Left</div>`);
    const right = render(`<div>Right</div>`);
    const span = render(`<span>Span</span>`);

    expect(areElementsDifferent([left, right, span], right)).toBeFalsy();
  });

  it("returns true when comparing a CSS selector with an element that doesn't match", () => {
    const element = render(`<div>Test</div>`);

    expect(areElementsDifferent(selectorForNonExistent, element)).toBeTruthy();
  });

  it("returns false when comparing a CSS selector with an element that matches", () => {
    const element = render(`<div id="target">Test</div>`);

    expect(areElementsDifferent("#target", element)).toBeFalsy();
  });

  it("returns true when all elements in the array are different from the CSS selector", () => {
    render(`<div id="target">Test</div>`);

    const leftOne = render(`<div>Left</div>`);
    const leftTwo = render(`<div>Left</div>`);

    expect(areElementsDifferent([leftOne, leftTwo], "#target")).toBeTruthy();
  });

  it("returns false when any element in the array matches the CSS selector", () => {
    const right = render(`<div id="right">Test</div>`);
    const left = render(`<div id="left">Test</div>`);

    expect(areElementsDifferent([left, right], "#right")).toBeFalsy();
  });
});
