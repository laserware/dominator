import { render, selectorForNonExistent } from "../../testing.ts";
import { isElemInViewport } from "../isElemInViewport.ts";

const getBoundingClientRect = (rect: Partial<DOMRect>) => () =>
  ({
    ...rect,
    top: rect.top ?? 0,
    right: rect.right ?? 0,
    bottom: rect.bottom ?? 0,
    left: rect.left ?? 0,
    width: rect.width ?? 0,
    height: rect.height ?? 0,
    x: rect.x ?? 0,
    y: rect.y ?? 0,
    toJSON: () => {},
  }) as DOMRect;

describe("the isElemInViewport function", () => {
  it("returns true if element is fully in the viewport", () => {
    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({ top: 10, right: 50, bottom: 50, left: 10 }),
    });

    expect(isElemInViewport(element)).toBe(true);
  });

  it("returns false if element is partially out of the viewport to the top", () => {
    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({ top: -10, right: 50, bottom: 50, left: 10 }),
    });

    expect(isElemInViewport(element)).toBeFalsy();
  });

  it("returns false if element is partially out of the viewport to the left", () => {
    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({ top: 10, right: 50, bottom: 50, left: -10 }),
    });

    expect(isElemInViewport(element)).toBeFalsy();
  });

  it("returns false if element is partially out of the viewport to the bottom", () => {
    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({
        top: 10,
        right: 50,
        bottom: window.innerHeight + 10,
        left: 10,
      }),
    });

    expect(isElemInViewport(element)).toBeFalsy();
  });

  it("returns false if element is partially out of the viewport to the right", () => {
    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({
        top: 10,
        right: window.innerWidth + 10,
        bottom: 50,
        left: 10,
      }),
    });

    expect(isElemInViewport(element)).toBeFalsy();
  });

  it("falls back to document client width/height if window width/height is 0", () => {
    Object.defineProperty(window, "innerWidth", { value: 0 });
    Object.defineProperty(window, "innerHeight", { value: 0 });

    const element = render(`<div>Test</div>`, {
      getBoundingClientRect: getBoundingClientRect({ top: 10, right: 50, bottom: 50, left: 10 }),
    });

    expect(isElemInViewport(element)).toBeFalsy();
  });

  it("throws an error if the element was not found", () => {
    expect(() => {
      isElemInViewport(selectorForNonExistent);
    }).toThrow(/Unable to determine if element is in view/);
  });
});
