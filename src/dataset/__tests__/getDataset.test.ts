import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { getDatasetEntries, getDatasetValue } from "../getDataset.ts";

describe("within getDataset", () => {
  describe("the getDatasetValue function", () => {
    it("returns the string dataset value if it exists", () => {
      const element = render(`<button data-name="button">Button</button>`);

      expect(getDatasetValue(element, "name")).toBe("button");
      expect(getDatasetValue(element, "data-name")).toBe("button");
    });

    it("returns the number dataset value if it exists", () => {
      const element = render(`<div data-count="20">Button</div>`);

      expect(getDatasetValue(element, "count")).toBe(20);
      expect(getDatasetValue(element, "data-count")).toBe(20);
    });

    it("returns the boolean dataset values if they exist", () => {
      const element = render(`<div data-checked="true" data-valid>Button</div>`);

      expect(getDatasetValue(element, "checked")).toBe(true);
      expect(getDatasetValue(element, "data-checked")).toBe(true);
      expect(getDatasetValue(element, "valid")).toBe(true);
      expect(getDatasetValue(element, "data-valid")).toBe(true);
    });

    it("returns undefined if the dataset isn't present and no default value specified", () => {
      const element = render(`<button data-name="button">Button</button>`);

      expect(getDatasetValue(element, "invalid")).toBeUndefined();
      expect(getDatasetValue(element, "data-invalid")).toBeUndefined();
    });

    it("throws an error if the element doesn't exist", () => {
      render("<span>Test</span>");

      expect(() => {
        getDatasetValue("button", "name");
      }).toThrow(/Cannot get/);
    });
  });

  describe("the getDatasetEntries function", () => {
    it("returns an object with the key of names passed in and values when all dataset entries exist", () => {
      // biome-ignore format: Ignore
      const element = render(`<button data-name="button" data-disabled data-checked="true" data-count="20">Button</button>`);

      const result = getDatasetEntries(element, ["name", "disabled", "data-checked", "data-count"]);

      expect(result).toEqual({
        name: "button",
        disabled: true,
        "data-checked": true,
        "data-count": 20,
      });
    });

    it("returns an object with the key of names passed in and values when some dataset entries missing", () => {
      // biome-ignore format: Ignore
      const element = render(`<button data-name="button" data-disabled data-checked="true" data-count="20">Button</button>`);

      const result = getDatasetEntries(element, [
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
        getDatasetEntries(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Cannot get dataset/);
    });
  });
});
