import { render, selectorForNonExistent } from "../../testing.ts";
import { toElem } from "../toElem.ts";

describe("the toElem function", () => {
  it("returns the element when given an Element", () => {
    const target = render(`<div>Test</div>`);

    expect(toElem(target)).toEqual(target);
  });

  it("returns null when given null or undefined", () => {
    expect(toElem(null)).toBeNull();
    expect(toElem(undefined)).toBeNull();
  });

  it("returns the element when given an EventTarget", () => {
    const target = render(`<div>Test</div>`);

    const event = new Event("click", { bubbles: true });
    target.dispatchEvent(event);

    expect(toElem(event.target)).toEqual(target);
  });

  it("returns the element when given a CSS selector", () => {
    const target = render(`<div id="test">Test</div>`);

    expect(toElem("#test")).toBe(target);
  });

  it("returns the element when given a parent CSS selector", () => {
    const child = render(`<span class="child">Child</span>`);

    const parent = render(`<div id="parent"></div>`, {}, child);

    const outer = render(`<span class="child">Outer</span>`);

    expect(toElem(".child", `#${parent.id}`)).toEqual(child);
    expect(toElem(".child", `#${parent.id}`)).not.toEqual(outer);
  });

  it("returns null when given a non-existing CSS selector", () => {
    expect(toElem(selectorForNonExistent)).toBeNull();
  });
});
