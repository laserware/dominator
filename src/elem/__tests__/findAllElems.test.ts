import { render } from "../../testing.ts";
import { findAllElems } from "../findAllElems.ts";

describe("the findAllElems function", () => {
  it("finds all elements with a matching selector", () => {
    render(`
      <ul>
        <li class="item">A</li>
        <li class="item">B</li>
        <li class="item">C</li>
      </ul>
    `);

    expect(findAllElems(".item")).toHaveLength(3);
  });

  it("finds all elements with matching attributes in an options object", () => {
    render(`
      <ul>
        <li aria-label="Label">A</li>
        <li aria-label="Label">B</li>
        <li aria-label="Label">C</li>
      </ul>
    `);

    expect(findAllElems({ withAttrs: { "aria-label": "Label" } })).toHaveLength(3);
    expect(findAllElems({ withAttrs: { "aria-label": null } })).toHaveLength(3);
  });

  it("finds all elements with matching dataset in an options object", () => {
    render(`
      <ul>
        <li data-label="Label">A</li>
        <li data-label="Label">B</li>
        <li data-label="Label">C</li>
      </ul>
    `);

    expect(findAllElems({ withData: { "data-label": "Label" } })).toHaveLength(3);
    expect(findAllElems({ withData: { "data-label": null } })).toHaveLength(3);
    expect(findAllElems({ withData: { label: "Label" } })).toHaveLength(3);
    expect(findAllElems({ withData: { label: null } })).toHaveLength(3);
  });

  it("finds all elements with matching selector and dataset in an options object", () => {
    render(`
      <ul>
        <li class="item" data-label="Label">A</li>
        <li class="item" data-label="Label">B</li>
        <li class="item" data-label="Label">C</li>
      </ul>
    `);

    const result = findAllElems({ withData: { "data-label": "Label" }, withSelector: ".item" });

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

    const result = findAllElems({
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
        "data-other-property": null,
      },
      tag: "button",
    });

    expect(result).toHaveLength(3);
  });
});
