import { render, selectorForNonExistent } from "../../testing.ts";
import { getData, getDataValue } from "../getData.ts";

describe("within getData", () => {
  describe("the getDataValue function", () => {
    it("returns the string dataset value if it exists", () => {
      const element = render(`<button data-name="button">Button</button>`);

      expect(getDataValue(element, "name")).toBe("button");
      expect(getDataValue(element, "data-name")).toBe("button");
    });

    it("returns the number dataset value if it exists", () => {
      const element = render(`<div data-count="20">Button</div>`);

      expect(getDataValue(element, "count")).toBe(20);
      expect(getDataValue(element, "data-count")).toBe(20);
    });

    it("returns the boolean dataset values if they exist", () => {
      const element = render(`<div data-checked="true" data-valid>Button</div>`);

      expect(getDataValue(element, "checked")).toBe(true);
      expect(getDataValue(element, "data-checked")).toBe(true);
      expect(getDataValue(element, "valid")).toBe(true);
      expect(getDataValue(element, "data-valid")).toBe(true);
    });

    it("returns undefined if the dataset isn't present and no default value specified", () => {
      const element = render(`<button data-name="button">Button</button>`);

      expect(getDataValue(element, "invalid")).toBeUndefined();
      expect(getDataValue(element, "data-invalid")).toBeUndefined();
    });

    it("throws an error if the element doesn't exist", () => {
      render(`<span>Test</span>`);

      expect(() => {
        getDataValue("button", "name");
      }).toThrow(/Unable to get/);
    });
  });

  describe("the getData function", () => {
    it("returns an object with the key of names passed in and values when all dataset entries exist", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-disabled data-checked="true" data-count="20">Button</button>`);

      const result = getData(element, ["name", "disabled", "data-checked", "data-count"]);

      expect(result).toEqual({
        name: "button",
        disabled: true,
        "data-checked": true,
        "data-count": 20,
      });
    });

    it("returns an object with the key of names passed in and values when some dataset entries missing", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-disabled data-checked="true" data-count="20">Button</button>`);

      const result = getData(element, [
        "name",
        "disabled",
        "data-checked",
        "data-count",
        "invalid",
      ]);

      expect(result).toEqual({
        name: "button",
        disabled: true,
        "data-checked": true,
        "data-count": 20,
        invalid: undefined,
      });
    });

    it("throws an error if the target isn't found when passing in an dataset entries object", () => {
      expect(() => {
        getData(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Unable to get data/);
    });
  });
});
