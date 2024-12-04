import { render, selectorForNonExistent } from "../../testing.ts";
import { setDatasetEntries, setDatasetEntry } from "../setDataset.ts";

describe("within setDataset", () => {
  describe("the setDatasetEntry function", () => {
    it("sets the dataset property on the target when a name and value is specified", () => {
      const element = render(`<div>Test</div>`);

      expect(setDatasetEntry(element, "data-big", null).hasAttribute("data-big")).toBeTruthy();
      expect(setDatasetEntry(element, "small", null).hasAttribute("data-small")).toBeTruthy();
    });

    it("sets the dataset property on the target with an object value", () => {
      const element = render(`<div>Test</div>`);

      const result = setDatasetEntry(element, "data-object", { a: "b" });

      expect(JSON.parse(result.getAttribute("data-object")!)).toEqual({ a: "b" });
    });

    it("sets the dataset property on the target with an array value", () => {
      const element = render(`<div>Test</div>`);

      const result = setDatasetEntry(element, "data-array", [1, "2", true]);

      expect(JSON.parse(result.getAttribute("data-array")!)).toEqual([1, "2", true]);
    });

    it("throws an error if the target does not exist", () => {
      render(`<div>Test</div>`);

      expect(() => {
        setDatasetEntry(selectorForNonExistent, "name", "parent");
      }).toThrow(/Unable to set/);
    });
  });

  describe("the setDatasetEntries function", () => {
    it("sets the dataset on a target to the specified object", () => {
      const element = render(`<div>Test</div>`);

      const result = setDatasetEntries(element, {
        name: "parent",
        "data-invalid": true,
      })!;

      expect(result.getAttribute("data-name")).toBe("parent");
      expect(result.getAttribute("data-invalid")).toBe("true");
    });
  });
});
