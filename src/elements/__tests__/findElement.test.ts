import { describe, expect, it } from "bun:test";

import { selectDatasetEntry } from "../../dataset/selectDataset.ts";
import { render } from "../../testing.ts";
import { findElement } from "../findElement.ts";

describe("the findElement function", () => {
  it("finds an element with a matching CSS selector", () => {
    render(`<div id="parent" class="parent">Parent</div>`);

    const result = findElement(".parent", document);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching dataset", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    const selector = selectDatasetEntry("value", "test");

    const result = findElement(selector);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching attribute in an options object", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    const result = findElement({ withAttributes: { "aria-hidden": true } });

    expect(result).not.toBeNull();
  });

  it("finds an element with a CSS selector in an options object", () => {
    render(`<div id="parent"><div aria-hidden="true" data-value="test">Child</div></div>`);

    const parent = findElement({ withSelector: "#parent" });

    const result = findElement({ withSelector: "[aria-hidden]", parent });

    expect(result?.innerHTML).toBe("Child");
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

    const result = findElement({
      withAttributes: {
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

    const result = findElement({
      withAttributes: {
        name: "button",
        disabled: null,
        "aria-disabled": true,
        "aria-expanded": true,
        draggable: true,
        inert: null,
      },
      tagName: "button",
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with dataset and tag in an options object", () => {
    const element = render(`<button data-some-property="thing">Button</button>`);

    const result = findElement({
      withDataset: { someProperty: "thing" },
      tagName: "button",
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

    const result = findElement({
      withSelector: ".test",
      withAttributes: {
        name: "button",
        disabled: null,
        "aria-disabled": true,
        "aria-expanded": true,
        draggable: true,
        inert: null,
      },
      withDataset: {
        someProperty: "thing",
      },
      tagName: "button",
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with selector, attributes, dataset, and tag in different formats", () => {
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

    const result = findElement({
      withSelector: ".test",
      withAttributes: ["name", "disabled"],
      withDataset: "someProperty",
      tagName: "button",
    });

    expect(result!).toEqual(element);
  });

  it("throws an error if an invalid selector is specified", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    expect(() => {
      findElement("29c8aeb1-6519-4a5e-8f67-4505d9b46d9c");
    }).toThrow(/is not a valid selector/);
  });

  it("throws an error if invalid options are specified", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    expect(() => {
      findElement({});
    }).toThrow();
  });
});
