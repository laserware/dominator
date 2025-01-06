import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { asElement } from "../asElement.ts";

describe("the asElement function", () => {
  it("returns the element if target is an instance of Element", () => {
    const target = render<"div">("<div>Test</div>");

    const result = asElement<"div">(target);

    expect(result).toEqual(target);
    expect(result).toBeInstanceOf(HTMLDivElement);
  });

  it("throws error if target is null", () => {
    expect(() => {
      asElement<"div">(null);
    }).toThrow(/Cannot assert as element/);
  });

  it("throws error if target is undefined", () => {
    expect(() => {
      asElement<"div">(undefined);
    }).toThrow(/Cannot assert as element/);
  });

  it("casts the EventTarget to the specified Element type", () => {
    const target = render<"button">("<button>Click Me</button>");

    const result = asElement<"button">(target);

    expect(result).toEqual(target);
    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  it("doesn't change the element type, just casts it to the type", () => {
    const target = render("<div>Test</div>");

    const result = asElement<"input">(target);

    expect(result).toBeInstanceOf(HTMLDivElement);
    expect(result.value).toBeUndefined();
  });
});
