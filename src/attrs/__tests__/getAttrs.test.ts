import { render, selectorForNonExistent } from "../../testing.ts";
import { getAttr, getAttrs } from "../getAttrs.ts";

describe("within getAttrs", () => {
  describe("the getAttr function", () => {
    it("returns the attribute value associated with the name if it exists", () => {
      const element = render(`<button name="button">Button</button>`);

      const result = getAttr(element, "name");

      expect(result).toBe("button");
    });

    it("returns null if the attribute isn't present and no default value specified", () => {
      const element = render(`<button name="button">Button</button>`);

      const result = getAttr(element, "invalid");

      expect(result).toBeNull();
    });

    it("throws an error if the element doesn't exist", () => {
      render(`<span>Test</span>`);

      expect(() => getAttr("button", "name")).toThrow(/Unable to get/);
    });

    it("returns the specified default value if the attribute isn't present", () => {
      const element = render(`<button>Button</button>`);

      const result = getAttr(element, "invalid", "Default");

      expect(result).toBe("Default");
    });
  });

  describe("the getAttrs function", () => {
    it("returns an object with the key of names passed in and values when all attributes exist", () => {
      const element = render(`<button name="button" disabled>Button</button>`);

      const result = getAttrs(element, ["name", "disabled"]);

      expect(result).toEqual({ name: "button", disabled: true });
    });

    it("returns an object with the key of names passed in and values when some attributes missing", () => {
      const element = render(`<button name="button" disabled>Button</button>`);

      const result = getAttrs(element, ["name", "disabled", "invalid"]);

      expect(result).toEqual({ name: "button", disabled: true });
    });

    it("returns an object with the key of all names passed in and values when some attributes missing and fallback defined", () => {
      const element = render(`<button name="button" disabled>Button</button>`);

      const result = getAttrs<{ name: string; disabled: boolean; invalid: boolean }>(
        element,
        ["name", "disabled", "invalid"],
        { invalid: true },
      );

      expect(result).toEqual({ name: "button", disabled: true, invalid: true });
    });

    it("throws an error if the target isn't found when passing in an attributes object", () => {
      expect(() => {
        getAttrs(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Unable to get attributes/);
    });
  });
});
