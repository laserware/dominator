import { render, selectorForNonExistent } from "../../testing.ts";
import { getAttr, getAttrs } from "../getAttrs.ts";

describe("within getAttrs", () => {
  describe("the getAttr function", () => {
    it("returns the string attribute value if it exists", () => {
      const element = render(`<button name="button">Button</button>`);

      const result = getAttr(element, "name");

      expect(result).toBe("button");
    });

    it("returns the number attribute value if it exists", () => {
      const element = render(`<div aria-colcount="20">Button</div>`);

      const result = getAttr(element, "aria-colcount");

      expect(result).toBe(20);
    });

    it("returns the boolean attribute values if they exist", () => {
      const element = render(`<div aria-checked="true" inert>Button</div>`);

      expect(getAttr(element, "aria-checked")).toBe(true);
      expect(getAttr(element, "inert")).toBe(true);
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
  });

  describe("the getAttrs function", () => {
    it("returns an object with the key of names passed in and values when all attributes exist", () => {
      // prettier-ignore
      const element = render(`<button name="button" disabled aria-checked="true" data-count="20">Button</button>`);

      const result = getAttrs(element, ["name", "disabled", "aria-checked", "data-count"]);

      expect(result).toEqual({
        name: "button",
        disabled: true,
        "aria-checked": true,
        "data-count": 20,
      });
    });

    it("returns an object with the key of names passed in and values when some attributes missing", () => {
      // prettier-ignore
      const element = render(`<button name="button" disabled aria-checked="true" data-count="20">Button</button>`);

      const result = getAttrs(element, [
        "name",
        "disabled",
        "aria-checked",
        "data-count",
        "invalid",
      ]);

      expect(result).toEqual({
        name: "button",
        disabled: true,
        "aria-checked": true,
        "data-count": 20,
      });
    });

    it("throws an error if the target isn't found when passing in an attributes object", () => {
      expect(() => {
        getAttrs(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Unable to get attributes/);
    });
  });
});
