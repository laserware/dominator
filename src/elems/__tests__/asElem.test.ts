import { render } from "../../testing.ts";
import { asElem } from "../asElem.ts";

describe("the asElem function", () => {
  it("returns the element if target is an instance of Element", () => {
    const target = render(`<div>Test</div>`);

    const result = asElem<HTMLDivElement>(target);

    expect(result).toEqual(target);
    expect(result).toBeInstanceOf(HTMLDivElement);
  });

  it("throws error if target is null", () => {
    expect(() => {
      asElem<HTMLDivElement>(null);
    }).toThrow(/Cannot assert as elem/);
  });

  it("throws error if target is undefined", () => {
    expect(() => {
      asElem<HTMLDivElement>(undefined);
    }).toThrow(/Cannot assert as elem/);
  });

  it("casts the EventTarget to the specified Element type", () => {
    const target = render(`<button>Click Me</button>`);

    const result = asElem<HTMLButtonElement>(target);

    expect(result).toEqual(target);
    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  it("doesn't change the element type, just casts it to the type", () => {
    const target = render(`<div>Test</div>`);

    const result = asElem<HTMLInputElement>(target);

    expect(result).toBeInstanceOf(HTMLDivElement);
    expect(result.value).toBeUndefined();
  });
});
