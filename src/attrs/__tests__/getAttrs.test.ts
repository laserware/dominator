import { getAttr, getAttrs } from "../getAttrs.ts";

describe("within getAttrs", () => {
  describe("the getAttr function", () => {
    it("returns the attribute value associated with the name if it exists", ({ selectors }) => {
      const result = getAttr(selectors.forButton, "name");

      expect(result).toBe("button");
    });

    it("returns null if the attribute isn't present and no default value specified", ({
      selectors,
    }) => {
      const result = getAttr(selectors.forButton, "invalid");

      expect(result).toBeNull();
    });

    it("throws an error if the element doesn't exist an no default value specified", ({
      selectors,
    }) => {
      expect(() => {
        getAttr(selectors.forMissing, "name");
      }).toThrow(/missing or invalid/);
    });

    it("returns the specified default value if the attribute isn't present", ({ selectors }) => {
      const result = getAttr(selectors.forButton, "invalid", "Default");

      expect(result).toBe("Default");
    });

    it("throws an error if the element doesn't exist", ({ selectors }) => {
      expect(() => {
        getAttr(selectors.forMissing, "name", "Default");
      }).toThrow(/missing or invalid/);
    });
  });

  describe("the getAttrs function", () => {
    it("returns an object with the key of names passed in and values when all attributes exist", ({
      selectors,
    }) => {
      const result = getAttrs(selectors.forButton, ["name", "disabled"]);

      expect(result).toEqual({ name: "button", disabled: true });
    });

    it("returns an object with the key of names passed in and values when some attributes missing", ({
      selectors,
    }) => {
      const result = getAttrs(selectors.forButton, ["name", "disabled", "invalid"]);

      expect(result).toEqual({ name: "button", disabled: true });
    });

    it("returns an object with the key of all names passed in and values when some attributes missing and fallback defined", ({
      selectors,
    }) => {
      const result = getAttrs<{ name: string; disabled: boolean; invalid: boolean }>(
        selectors.forButton,
        ["name", "disabled", "invalid"],
        { invalid: true },
      );

      expect(result).toEqual({ name: "button", disabled: true, invalid: true });
    });

    it("throws an error if the target isn't found when passing in an attributes object", ({
      selectors,
    }) => {
      expect(() => {
        getAttrs(selectors.forMissing, ["name", "disabled"]);
      }).toThrow(/Unable to get attributes/);
    });
  });
});
