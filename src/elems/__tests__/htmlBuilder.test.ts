// noinspection CssRedundantUnit

import { render, userEvent } from "../../testing.ts";
import { html } from "../htmlBuilder.ts";
import { isElemOfType } from "../isElemOfType.ts";

describe("html function", () => {
  it("builds an element with no children or properties", () => {
    const result = html("div", {}, null).build();

    expect(result.outerHTML).toBe("<div></div>");
  });

  it("builds an element with children and no properties", () => {
    const parent = html("main", {}, null).build();

    html("div", {}, html("span", {}, "Hello")).build(parent);

    expect(parent.outerHTML).toBe("<main><div><span>Hello</span></div></main>");
  });

  it("builds an element with no children and properties", () => {
    const result = html("div", { class: "test", styles: { margin: 0, padding: 0 } }).build();

    expect(result.outerHTML).toBe(`<div class="test" style="margin: 0px; padding: 0px;"></div>`);
  });

  it("builds an element with children and properties", () => {
    const result = html("input", { props: { type: "text", value: "hello" } }).build();

    expect(result).toHaveProperty("type", "text");
    expect(result).toHaveProperty("value", "hello");
  });

  it("builds an element children, properties, and event listeners", async () => {
    const click = vi.fn();
    const keydown = vi.fn();

    const result = html("button", {
      id: "test",
      attrs: {
        "aria-label": "Test",
      },
      data: {
        stringProperty: "value",
        booleanProperty: true,
        numberProperty: 24,
      },
      cssVars: {
        "--color-bg": "blue",
      },
      props: {
        type: "button",
        ariaDisabled: "false",
      },
      on: {
        click,
        dblclick: {
          listener: keydown,
          options: { once: true },
        },
      },
    }).build(undefined, new AbortController());

    expect(result).toHaveProperty("type", "button");

    await userEvent.click(result);
    expect(click).toHaveBeenCalled();

    await userEvent.dblClick(result);
    await userEvent.dblClick(result);
    expect(keydown).toHaveBeenCalledTimes(1);

    expect(result).toMatchInlineSnapshot(`
      <button
        aria-disabled="false"
        aria-label="Test"
        data-boolean-property="true"
        data-number-property="24"
        data-string-property="value"
        id="test"
        style="--color-bg: blue;"
        type="button"
      />
    `);
  });

  it("appends text children to the created element", () => {
    const result = html("div", {}, html("span", {}, "child element")).build();

    expect(result.children).toHaveLength(1);
    expect(isElemOfType(result.firstElementChild!, "span")).toBeTruthy();
    expect(result.firstElementChild!).toHaveTextContent("child element");
  });

  it("appends a child Element to the created element", () => {
    const child = render(`<span>Child</span>`);
    child.remove();

    const result = html("div", {}, child).build();

    expect(result.children).toHaveLength(1);
  });

  it("invokes child builder functions", () => {
    const child = html("span", {});
    const result = html("div", {}, () => child).build();

    expect(result.children).toHaveLength(1);
    expect(isElemOfType(result.firstElementChild!, "span")).toBeTruthy();
  });

  it("ignores null children", () => {
    const result = html("div", {}, null).build();

    expect(result.children).toHaveLength(0);
  });

  it("ignores undefined properties", () => {
    // @ts-ignore
    const result = html("div", undefined, null).build();

    expect(result.children).toHaveLength(0);
  });

  it("ignores null events", () => {
    // @ts-ignore
    const result = html("div", { on: { click: null } }, null).build(
      undefined,
      new AbortController(),
    );

    expect(result.children).toHaveLength(0);
  });

  it("appends element to parent when parent is provided", () => {
    const parent = render(`<section></section>`);

    const result = html("div", {}).build(parent);

    expect(parent.children).toHaveLength(1);
    expect(parent.firstElementChild!).toEqual(result);
  });

  it("throws an error if an invalid child is specified", () => {
    expect(() => {
      // @ts-ignore
      html("div", {}, BigInt(20)).build();
    }).toThrow(/Invalid child/);
  });

  it("throws an error if an AbortController isn't passed in with event listeners", () => {
    expect(() => {
      html("div", { on: { click: vi.fn() } }).build();
    }).toThrow(/must pass in an AbortController/);
  });
});
