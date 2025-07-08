import { describe, expect, it } from "bun:test";

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

  it("returns a numeric value for a select input", () => {
    // biome-ignore format: Ignore
    const element = render(`
      <select>
        <option value="1" selected>1</option>
        <option value="2">2</option>
     </select>
    `);

    const result = getElementValue(element);

    expect(result).toBe(1);
  });

  it("returns a string value for a select input", () => {
    // biome-ignore format: Ignore
    const element = render(`
      <select>
        <option value="a" selected>A</option>
        <option value="b">B</option>
     </select>
    `);

    const result = getElementValue(element);

    expect(result).toBe("a");
  });

  it("returns a boolean value for a select input", () => {
    // biome-ignore format: Ignore
    const element = render(`
      <select>
        <option value="true" selected>True</option>
        <option value="false">False</option>
     </select>
    `);

    const result = getElementValue(element);

    expect(result).toBe(true);
  });

  it("returns the first option for a select input with nothing selected", () => {
    // biome-ignore format: Ignore
    const element = render(`<select><option value="a">A</option><option value="b">B</option></select>`);

    const result = getElementValue(element);

    expect(result).toBe("a");
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
