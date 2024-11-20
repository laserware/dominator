import { dedent } from "@laserware/arcade";

import { dataSelector } from "../../data/dataSelector.ts";
import { findOne } from "../findOne.ts";

function createTestDOM(): { dispose(): void } {
  const main = document.createElement("main");

  main.innerHTML = dedent`
    <div id="test">
      <div>Empty</div>
      <div aria-hidden="true" data-value="test">Attrs</div>
      <div id="parent">
        <div aria-hidden="true" data-value="test">Child</div>
      </div>
      
      <button 
        id="test-button"
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
    </div>
  `;

  document.body.appendChild(main);

  return {
    dispose() {
      document.body.removeChild(main);
    },
  };
}

describe("the findOne function", () => {
  let disposable: { dispose(): void };

  beforeEach(() => {
    disposable = createTestDOM();
  });

  afterEach(() => {
    disposable.dispose();
  });

  it("finds an element with a matching CSS selector", () => {
    const result = findOne("#test", document);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching dataset", () => {
    const selector = dataSelector("value", "test");

    const result = findOne(selector);

    expect(result).not.toBeNull();
  });

  it("finds an element with a matching attribute (key/value pair)", () => {
    const result = findOne("aria-hidden", true);

    expect(result).not.toBeNull();
  });

  it("finds an element with a CSS selector in an options object", () => {
    const parent = findOne({ withSelector: "#parent" });

    const result = findOne({ withSelector: `[aria-hidden]`, parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with key/value pair in an options object", () => {
    const parent = findOne("#parent");

    const result = findOne({ withKey: "data-value", withValue: "test", parent });

    expect(result!.innerHTML).toBe("Child");
  });

  it("finds an element with attrs", () => {
    const result = findOne({
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
    const result = findOne({
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
    const result = findOne({
      withData: { someProperty: "thing" },
      tag: "button",
    });

    expect(result!).toHaveRole("button");
  });
});
