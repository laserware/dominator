import { describe, expect, it, mock } from "bun:test";

import { pause } from "@laserware/arcade";
import { render, selectorForNonExistent } from "../../testing.ts";
import { focusElement } from "../focusElement.ts";

describe("the focusElement function", () => {
  it("does not throw if target is null", () => {
    expect(() => {
      focusElement(null);
    }).not.toThrow();
  });

  it("focuses an existing element by element reference", async () => {
    const element = render("<button>Test</button>");
    element.focus = mock();

    focusElement(element);

    await pause(100);
    expect(element.focus).toHaveBeenCalled();
  });

  it("focuses an existing element by CSS selector", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = mock();

    focusElement("#test");

    await pause(100);
      expect(element.focus).toHaveBeenCalled();
  });

  it("does not focus if element does not exist", () => {
    const focuser = (): void => focusElement(selectorForNonExistent);

    expect(focuser).not.toThrow();
  });

  it("calls onDone callback after focusing the element", async () => {
    const element = render(`<button id="test">Test</button>`);
    const onDone = mock();

    focusElement(element, { onDone });

    await pause(100);
      expect(onDone).toHaveBeenCalled();
  });

  it("respects the delay option", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = mock();
    const delay = 50;

    focusElement(element, { delay });

    expect(element.focus).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(element.focus).toHaveBeenCalled();
    }, delay);
  });

  it("respects the preventScroll option", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = mock();

    focusElement(element, { preventScroll: true });

    await pause(100);
      expect(element.focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});
