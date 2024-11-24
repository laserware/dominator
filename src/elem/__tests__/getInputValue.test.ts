import { render } from "../../testing.ts";
import { getInputValue, getInputValueRaw } from "../getInputValue.ts";

describe("within getInputValue", () => {
  describe("the getInputValueRaw function", () => {
    it("returns the value of the element", () => {
      render(`
        <form>
          <div>
            <label for="text">Text Input</label>
            <input id="text" type="text" value="Test" />
          </div>
        </form>
      `);

      const result = getInputValueRaw("input");

      expect(result).toBe("Test");
    });

    it("throws an error if the specified target is not a valid input element", () => {
      const element = render(`<button>Button</button>`);

      expect(() => getInputValueRaw(element)).toThrow(/Cannot get value/);
    });
  });

  describe("the getInputValue function", () => {
    it("returns a number value for a number input", () => {
      const element = render(`<input type="number" value="22e2" />`);

      const result = getInputValue(element);

      expect(result).toBe(2200);
    });

    it("returns a string value for a text input", () => {
      const element = render(`<input type="text" value="22" />`);

      const result = getInputValue(element);

      expect(result).toBe("22");
    });

    it("returns a Date for a date input", () => {
      const element = render(`<input type="date" value="2024-01-01" />`);

      const result = getInputValue(element);

      expect(result).toBeInstanceOf(Date);
    });

    it("returns true for a checkbox input if checked is true", () => {
      const element = render(`<input type="checkbox" checked />`);

      const result = getInputValue(element);

      expect(result).toBeTruthy();
    });

    it("returns false for a checkbox input if checked is undefined", () => {
      const element = render(`<input type="checkbox" />`);

      const result = getInputValue(element);

      expect(result).toBeFalsy();
    });

    it("returns true for a radio input if checked is true", () => {
      const element = render(`<input type="radio" checked />`);

      const result = getInputValue(element);

      expect(result).toBeTruthy();
    });

    it("returns false for a radio input if checked is undefined", () => {
      const element = render(`<input type="radio" />`);

      const result = getInputValue(element);

      expect(result).toBeFalsy();
    });

    it("throws an error if the specified target is not a valid input element", () => {
      const element = render(`<button>Button</button>`);

      expect(() => getInputValue(element)).toThrow(/Cannot get value/);
    });
  });
});
