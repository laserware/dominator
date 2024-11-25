import { render, selectorForNonExistent } from "../../testing.ts";
import { setData, setDataEntry } from "../setData.ts";

describe("within setData", () => {
  describe("the setDataEntry function", () => {
    it("sets the dataset property on the target when a name and value is specified", () => {
      const element = render(`<div>Test</div>`);

      expect(setDataEntry(element, "data-big", null).hasAttribute("data-big")).toBeTruthy();
      expect(setDataEntry(element, "small", null).hasAttribute("data-small")).toBeTruthy();
    });

    it("sets the dataset property on the target with an object value", () => {
      const element = render(`<div>Test</div>`);

      const result = setDataEntry(element, "data-object", { a: "b" });

      expect(JSON.parse(result.getAttribute("data-object")!)).toEqual({ a: "b" });
    });

    it("sets the dataset property on the target with an array value", () => {
      const element = render(`<div>Test</div>`);

      const result = setDataEntry(element, "data-array", [1, "2", true]);

      expect(JSON.parse(result.getAttribute("data-array")!)).toEqual([1, "2", true]);
    });

    it("throws an error if the target does not exist", () => {
      render(`<div>Test</div>`);

      expect(() => {
        setDataEntry(selectorForNonExistent, "name", "parent");
      }).toThrow(/Unable to set/);
    });
  });

  describe("the setData function", () => {
    it("sets the data on a target to the specified object", () => {
      const element = render(`<div>Test</div>`);

      const result = setData(element, {
        name: "parent",
        "data-invalid": true,
      })!;

      expect(result.getAttribute("data-name")).toBe("parent");
      expect(result.getAttribute("data-invalid")).toBe("true");
    });
  });
});
