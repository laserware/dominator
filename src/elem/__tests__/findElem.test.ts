import { dataEntrySelector } from "../../data/dataSelector.ts";
import { render } from "../../testing.ts";
import { findElem } from "../findElem.ts";

describe("the findElem function", () => {
  it("finds an element with a matching CSS selector", () => {
    render(`<div id="parent" class="parent">Parent</div>`);

    const result = findElem(".parent", document);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching dataset", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    const selector = dataEntrySelector("value", "test");

    const result = findElem(selector);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching attribute in an options object", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    const result = findElem({ withAttrs: { "aria-hidden": true } });

    expect(result).not.toBeNull();
  });

  it("finds an element with a CSS selector in an options object", () => {
    render(`<div id="parent"><div aria-hidden="true" data-value="test">Child</div></div>`);

    const parent = findElem({ withSelector: "#parent" });

    const result = findElem({ withSelector: `[aria-hidden]`, parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with several attributes in an options object", () => {
    const element = render(`
      <button 
        id="button"
        name="button"
        disabled
        aria-disabled="true"
        aria-expanded="true"
        draggable="true"
        inert
        data-some-property="thing"
      >
        Button
      </button>
    `);

    const result = findElem({
      withAttrs: {
        name: "button",
        disabled: null,
        "aria-disabled": true,
        "aria-expanded": true,
        draggable: true,
        inert: null,
      },
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with several attributes and tag in an options object", () => {
    const element = render(`
      <button 
        id="button"
        name="button"
        disabled
        aria-disabled="true"
        aria-expanded="true"
        draggable="true"
        inert
        data-some-property="thing"
      >
        Button
      </button>
    `);

    const result = findElem({
      withAttrs: {
        name: "button",
        disabled: null,
        "aria-disabled": true,
        "aria-expanded": true,
        draggable: true,
        inert: null,
      },
      tag: "button",
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with dataset and tag in an options object", () => {
    const element = render(`<button data-some-property="thing">Button</button>`);

    const result = findElem({
      withData: { someProperty: "thing" },
      tag: "button",
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with selector, attributes, dataset, and tag in an options object", () => {
    const element = render(`
      <button 
        id="button"
        class="test"
        name="button"
        disabled
        aria-disabled="true"
        aria-expanded="true"
        draggable="true"
        inert
        data-some-property="thing"
      >
        Button
      </button>
      <div class="test">Test</div>
    `);

    const result = findElem({
      withSelector: ".test",
      withAttrs: {
        name: "button",
        disabled: null,
        "aria-disabled": true,
        "aria-expanded": true,
        draggable: true,
        inert: null,
      },
      withData: {
        someProperty: "thing",
      },
      tag: "button",
    });

    expect(result!).toEqual(element);
  });

  it("throws an error if an invalid selector is specified", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    expect(() => {
      findElem("29c8aeb1-6519-4a5e-8f67-4505d9b46d9c");
    }).toThrow();
  });
});
