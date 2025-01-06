import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { findAllElements } from "../findAllElements.ts";

describe("the findAllElements function", () => {
  it("finds all elements with a matching selector", () => {
    render(`
      <ul>
        <li class="item">A</li>
        <li class="item">B</li>
        <li class="item">C</li>
      </ul>
    `);

    expect(findAllElements(".item")).toHaveLength(3);
  });

  it("finds all elements with matching attributes in an options object", () => {
    render(`
      <ul>
        <li aria-label="Label">A</li>
        <li aria-label="Label">B</li>
        <li aria-label="Label">C</li>
      </ul>
    `);

    expect(findAllElements({ withAttributes: { "aria-label": "Label" } })).toHaveLength(3);
    expect(findAllElements({ withAttributes: { "aria-label": null } })).toHaveLength(3);
  });

  it("finds all elements with matching dataset in an options object", () => {
    render(`
      <ul>
        <li data-label="Label">A</li>
        <li data-label="Label">B</li>
        <li data-label="Label">C</li>
      </ul>
    `);

    expect(findAllElements({ withDataset: { "data-label": "Label" } })).toHaveLength(3);
    expect(findAllElements({ withDataset: { "data-label": null } })).toHaveLength(3);
    expect(findAllElements({ withDataset: { label: "Label" } })).toHaveLength(3);
    expect(findAllElements({ withDataset: { label: null } })).toHaveLength(3);
  });

  it("finds all elements with matching selector and dataset in an options object", () => {
    render(`
      <ul>
        <li class="item" data-label="Label">A</li>
        <li class="item" data-label="Label">B</li>
        <li class="item" data-label="Label">C</li>
      </ul>
    `);

    const result = findAllElements({
      withDataset: { "data-label": "Label" },
      withSelector: ".item",
    });

    expect(result).toHaveLength(3);
  });

  it("finds all elements with selector, attributes, dataset, and tag in an options object", () => {
    const Button = `
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
        data-other-property
      >
        Button
      </button>
    `;
    render(`<div>${Button}${Button}${Button}</div>`);

    const result = findAllElements({
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
        "data-other-property": null,
      },
      tagName: "button",
    });

    expect(result).toHaveLength(3);
  });

  it("throws an error if an invalid selector is specified", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    expect(() => {
      findAllElements("29c8aeb1-6519-4a5e-8f67-4505d9b46d9c");
    }).toThrow(/is not a valid selector/);
  });

  it("throws an error if invalid options are specified", () => {
    expect(() => {
      findAllElements({});
    }).toThrow();
  });
});
