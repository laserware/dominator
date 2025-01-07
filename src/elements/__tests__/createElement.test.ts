import { describe, expect, it, mock } from "bun:test";

import { getAttribute } from "../../attributes/getAttributes.ts";
import { render } from "../../testing.ts";
import { createElement } from "../createElement.ts";
import { isElementType } from "../isElementType.ts";

describe("the createElement function", () => {
  it("creates an element with no options", () => {
    const result = createElement("div");

    expect(result).toBeInstanceOf(HTMLDivElement);
  });

  it("assigns provided options and attributes to the created element", () => {
    const result = createElement("div", {
      id: "test-id",
      className: "test-class",
      attributes: {
        "aria-label": "Example",
      },
    });

    expect(getAttribute(result, "id")).toBe("test-id");
    expect(getAttribute(result, "class")).toBe("test-class");
    expect(getAttribute(result, "aria-label")).toBe("Example");
  });

  it("assigns provided CSS variables to the created element", () => {
    const result = createElement("div", { cssVars: { "--test-var": "test-value" } });

    expect(result.style.getPropertyValue("--test-var")).toBe("test-value");
  });

  it("assigns provided dataset entries to the created element", () => {
    const result = createElement("div", { dataset: { test: "test-dataset" } });

    expect(result.dataset.test).toBe("test-dataset");
  });

  it("assigns provided styles to the created element", () => {
    const results = createElement("div", { styles: { color: "red" } });

    expect(results.style.color).toBe("red");
  });

  it("creates an element with no children or properties", () => {
    const result = createElement("div", {}, null);

    expect(result.outerHTML).toBe("<div></div>");
  });

  it("creates an element with children and no properties", () => {
    const result = createElement("main", {}, createElement("span", {}, "Hello"));

    expect(result.outerHTML).toBe("<main><span>Hello</span></main>");
  });

  it("creates an element with no children and properties", () => {
    const result = createElement("div", { className: "test", styles: { margin: 0, padding: 0 } });

    expect(result.outerHTML).toBe(`<div style="margin: 0px; padding: 0px;" class="test"></div>`);
  });

  it("creates an element with children and properties", () => {
    const result = createElement("input", { type: "text", value: "hello" });

    expect(result).toHaveProperty("type", "text");
    expect(result).toHaveProperty("value", "hello");
  });

  it("creates an element children, properties, and event listeners", () => {
    const click = mock();
    const keydown = mock();

    const element = createElement(
      "button",
      {
        id: "test",
        type: "button",
        ariaDisabled: "false",
        attributes: {
          "aria-label": "Test",
        },
        dataset: {
          stringProperty: "value",
          booleanProperty: true,
          numberProperty: 24,
        },
        cssVars: {
          "--color-bg": "blue",
        },
        onclick: click,
        on: {
          keydown: {
            listener: keydown,
            options: { once: true },
          },
        },
      },
      null,
    );

    expect(getAttribute(element, "type")).toBe("button");

    element.click();
    expect(click).toHaveBeenCalled();

    const event = new KeyboardEvent("keydown", { key: "Enter" });
    element.dispatchEvent(event);
    element.dispatchEvent(event);
    expect(keydown).toHaveBeenCalledTimes(1);

    expect(element.outerHTML).toBe(
      `<button aria-label="Test" style="--color-bg: blue;" data-string-property="value" data-boolean-property="true" data-number-property="24" id="test" type="button" aria-disabled="false"></button>`,
    );
  });

  it("appends text children to the created element", () => {
    const result = createElement("div", {}, createElement("span", {}, "child element"));

    expect(result.children).toHaveLength(1);
    expect(isElementType(result.firstElementChild!, "span")).toBeTruthy();
    expect(result.firstElementChild!.textContent).toBe("child element");
  });

  it("appends a child Element to the created element", () => {
    const child = render("<span>Child</span>");
    child.remove();

    const result = createElement("div", {}, child);

    expect(result.children).toHaveLength(1);
  });

  it("invokes child builder functions", () => {
    const result = createElement("div", {}, createElement("span", {}));

    expect(result.children).toHaveLength(1);
    expect(isElementType(result.firstElementChild!, "span")).toBeTruthy();
  });

  it("ignores null children", () => {
    const result = createElement("div", {}, null);

    expect(result.children).toHaveLength(0);
  });

  it("ignores undefined properties", () => {
    // @ts-ignore
    const result = createElement("div", undefined, null);

    expect(result.children).toHaveLength(0);
  });

  it("ignores null events", () => {
    // @ts-ignore
    const result = createElement("div", { on: { click: null } }, null);

    expect(result.children).toHaveLength(0);
  });

  it("appends element to parent when parent is provided", () => {
    const parent = render("<section></section>");

    const child = createElement("div", {});

    parent.appendChild(child);

    expect(parent.children).toHaveLength(1);
    expect(parent.firstElementChild!).toEqual(child);
  });

  it("creates a basic element with no properties when only tag is passed", () => {
    const result = createElement("div");

    expect(result.outerHTML).toBe("<div></div>");
  });

  it.each([
    { options: null, children: [], expected: "<div></div>" },
    { options: null, children: null, expected: "<div></div>" },
    { options: undefined, children: undefined, expected: "<div></div>" },
    { options: undefined, children: "Test", expected: "<div>Test</div>" },
    { options: 10, children: undefined, expected: "<div></div>" },
    { options: 10, children: 10, expected: "<div>10</div>" },
    { options: "Test", children: undefined, expected: "<div>Test</div>" },
    { options: undefined, children: createElement("span"), expected: "<div><span></span></div>" },
  ])(
    "creates an element when options is $options and children is $children",
    ({ options, children, expected }) => {
      // @ts-ignore
      const result = createElement("div", options, children);

      expect(result.outerHTML).toBe(expected);
    },
  );
});
