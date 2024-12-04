import { render, selectorForNonExistent, waitFor } from "../../testing.ts";
import { focusElement } from "../focusElement.ts";

describe("the focusElement function", () => {
  it("does not throw if target is null", () => {
    expect(() => {
      focusElement(null);
    }).not.toThrow();
  });

  it("focuses an existing element by element reference", async () => {
    const element = render(`<button>Test</button>`);
    element.focus = vi.fn();

    focusElement(element);

    await waitFor(() => {
      expect(element.focus).toHaveBeenCalled();
    });
  });

  it("focuses an existing element by CSS selector", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = vi.fn();

    focusElement("#test");

    await waitFor(() => {
      expect(element.focus).toHaveBeenCalled();
    });
  });

  it("does not focus if element does not exist", () => {
    const focuser = (): void => focusElement(selectorForNonExistent);

    expect(focuser).not.toThrow();
  });

  it("calls onDone callback after focusing the element", async () => {
    const element = render(`<button id="test">Test</button>`);
    const onDone = vi.fn();

    focusElement(element, { onDone });

    await waitFor(() => {
      expect(onDone).toHaveBeenCalled();
    });
  });

  it("respects the delay option", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = vi.fn();
    const delay = 50;

    focusElement(element, { delay });

    expect(element.focus).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(element.focus).toHaveBeenCalled();
    }, delay);
  });

  it("respects the preventScroll option", async () => {
    const element = render(`<button id="test">Test</button>`);
    element.focus = vi.fn();

    focusElement(element, { preventScroll: true });

    await waitFor(() => {
      expect(element.focus).toHaveBeenCalledWith({ preventScroll: true });
    });
  });
});
