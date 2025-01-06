import { render } from "../../testing.ts";
import { getElementValue } from "../getElementValue.ts";

describe("the getElementValue function", () => {
  it("returns a number value for a number input", () => {
    const element = render(`<input type="number" value="22e2" />`);

    const result = getElementValue(element);

    expect(result).toBe(2200);
  });

  it("returns a string value for a text input", () => {
    const element = render(`<input type="text" value="22" />`);

    const result = getElementValue(element);

    expect(result).toBe("22");
  });

  it("returns a Date for a date input", () => {
    const element = render(`<input type="date" value="2024-01-01" />`);

    const result = getElementValue(element);

    expect(result).toBeInstanceOf(Date);
  });

  it("returns true for a checkbox input if checked is true", () => {
    const element = render(`<input type="checkbox" checked />`);

    const result = getElementValue(element);

    expect(result).toBeTruthy();
  });

  it("returns false for a checkbox input if checked is undefined", () => {
    const element = render(`<input type="checkbox" />`);

    const result = getElementValue(element);

    expect(result).toBeFalsy();
  });

  it("returns true for a radio input if checked is true", () => {
    const element = render(`<input type="radio" checked />`);

    const result = getElementValue(element);

    expect(result).toBeTruthy();
  });

  it("returns false for a radio input if checked is undefined", () => {
    const element = render(`<input type="radio" />`);

    const result = getElementValue(element);

    expect(result).toBeFalsy();
  });
});
