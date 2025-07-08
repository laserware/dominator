import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { toElement } from "../toElement.ts";

describe("the toElement function", () => {
  it("returns the element when given an Element", () => {
    const target = render("<div>Test</div>");

    expect(toElement(target)).toEqual(target);
  });

  it("returns null when given null or undefined", () => {
    expect(toElement(null)).toBeNull();
    expect(toElement(undefined)).toBeNull();
  });

  it("returns the element when given an EventTarget", async () => {
    const element = render("<div>Test</div>");

    // biome-ignore format: Ignore
    const getTarget = (): Promise<EventTarget> => new Promise((resolve) => {
      element.addEventListener("click", (event) => {
        resolve(event.target as EventTarget);
      });

      element.click();
    });

    const target = await getTarget();

    expect(toElement(target)).toEqual(element);
  });

  it("returns the element when given a CSS selector", () => {
    const target = render(`<div id="test">Test</div>`);

    expect(toElement("#test")).toBe(target);
  });

  it("returns the element when given a parent CSS selector", () => {
    const child = render(`<span class="child">Child</span>`);

    const parent = render(`<div id="parent"></div>`, {}, child);

    const outer = render(`<span id="outer" class="child">Outer</span>`);

    expect(toElement(".child", `#${parent.id}`)?.id).toBe(child.id);
    expect(toElement(".child", `#${parent.id}`)?.id).not.toBe(outer.id);
  });

  it("returns null when given a non-existing CSS selector", () => {
    expect(toElement(selectorForNonExistent)).toBeNull();
  });
});
