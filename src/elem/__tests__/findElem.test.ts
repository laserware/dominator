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

  it("finds an element with a matching attribute (key/value pair)", () => {
    render(`<div aria-hidden="true" data-value="test">Child</div>`);

    const result = findElem("aria-hidden", true);

    expect(result).not.toBeNull();
  });

  it("finds an element with a CSS selector in an options object", () => {
    render(`<div id="parent"><div aria-hidden="true" data-value="test">Child</div></div>`);

    const parent = findElem({ withSelector: "#parent" });

    const result = findElem({ withSelector: `[aria-hidden]`, parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with key/value pair in an options object", () => {
    render(`<div id="parent"><div aria-hidden="true" data-value="test">Child</div></div>`);

    const parent = findElem("#parent");

    const result = findElem({ withName: "data-value", withValue: "test", parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with attrs", () => {
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
      name: "button",
      disabled: null,
      "aria-disabled": true,
      "aria-expanded": true,
      draggable: true,
      inert: null,
    });

    expect(result!).toEqual(element);
  });

  it("finds an element with attrs and tag in an options object", () => {
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
});
