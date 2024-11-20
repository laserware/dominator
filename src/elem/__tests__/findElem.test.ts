import { dataSelector } from "../../data/dataSelector.ts";
import { findElem } from "../findElem.ts";

describe("the findElem function", () => {
  it("finds an element with a matching CSS selector", ({ selectors }) => {
    const result = findElem(selectors.forRoot, document);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching dataset", () => {
    const selector = dataSelector("value", "test");

    const result = findElem(selector);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching attribute (key/value pair)", () => {
    const result = findElem("aria-hidden", true);

    expect(result).not.toBeNull();
  });

  it("finds an element with a CSS selector in an options object", ({ selectors }) => {
    const parent = findElem({ withSelector: selectors.forParent });

    const result = findElem({ withSelector: `[aria-hidden]`, parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with key/value pair in an options object", ({ selectors }) => {
    const parent = findElem(selectors.forParent);

    const result = findElem({ withName: "data-value", withValue: "test", parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with attrs", () => {
    const result = findElem({
      name: "button",
      disabled: null,
      "aria-disabled": true,
      "aria-expanded": true,
      draggable: true,
      inert: null,
    });

    expect(result!).toHaveRole("button");
  });

  it("finds an element with attrs and tag in an options object", () => {
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

    expect(result!).toHaveRole("button");
  });

  it("finds an element with dataset and tag in an options object", () => {
    const result = findElem({
      withData: { someProperty: "thing" },
      tag: "button",
    });

    expect(result!).toHaveRole("button");
  });
});
