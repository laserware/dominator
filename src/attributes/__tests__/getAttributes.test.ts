import { render, selectorForNonExistent } from "../../testing.ts";
import { getAttribute, getAttributes } from "../getAttributes.ts";

describe("within getAttributes", () => {
  describe("the getAttribute function", () => {
    it("returns the string attribute value if it exists", () => {
      const element = render(`<button name="button">Button</button>`);

      const result = getAttribute(element, "name");

      expect(result).toBe("button");
    });

    it("returns the number attribute value if it exists", () => {
      const element = render<"div">(`<div aria-colcount="20">Button</div>`);

      const result = getAttribute(element, "aria-colcount");

      expect(result).toBe(20);
    });

    it("returns the boolean attribute values if they exist", () => {
      const element = render(`<div aria-checked="true" inert>Button</div>`);

      expect(getAttribute(element, "aria-checked")).toBe(true);
      expect(getAttribute(element, "inert")).toBe(true);
    });

    it("returns null if the attribute isn't present", () => {
      const element = render(`<button name="button">Button</button>`);

      const result = getAttribute(element, "invalid");

      expect(result).toBeNull();
    });

    it("throws an error if the element doesn't exist", () => {
      expect(() => {
        getAttribute(selectorForNonExistent, "name");
      }).toThrow(/Cannot get/);
    });
  });

  describe("the getAttributes function", () => {
    it("returns an object with the key of names passed in and values when all attributes exist", () => {
      // prettier-ignore
      const element = render(`<button name="button" disabled aria-checked="true" data-count="20">Button</button>`);

      const result = getAttributes(element, ["name", "disabled", "aria-checked", "data-count"]);

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

      const result = getAttributes(element, [
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
        invalid: null,
      });
    });

    it("throws an error if the target doesn't exist", () => {
      expect(() => {
        getAttributes(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Cannot get attributes/);
    });
  });
});
