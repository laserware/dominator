import { render, selectorForNonExistent } from "../../testing.ts";
import { setAttr, setAttrs } from "../setAttrs.ts";

describe("within setAttrs", () => {
  describe("the setAttr function", () => {
    it("sets the attribute on the target when a name and value is specified", () => {
      const element = render(`<div>Test</div>`);

      const result = setAttr(element, "inert", null)!;

      expect(result.hasAttribute("inert")).toBeTruthy();
    });

    it("sets the attribute on the target with an object value", () => {
      const element = render(`<div>Test</div>`);

      const result = setAttr(element, "data-object", { a: "b" });

      expect(JSON.parse(result.getAttribute("data-object")!)).toEqual({ a: "b" });
    });

    it("sets the attribute on the target with an array value", () => {
      const element = render(`<div>Test</div>`);

      const result = setAttr(element, "data-array", [1, "2", true]);

      expect(JSON.parse(result.getAttribute("data-array")!)).toEqual([1, "2", true]);
    });

    it("removes the attribute from a target when undefined is specified as the value", () => {
      const element = render(`<div inert>Test</div>`);

      const result = setAttr(element, "inert", null)!;

      setAttr(result, "inert", undefined);

      expect(result.hasAttribute("inert")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render(`<div>Test</div>`);

      expect(() => setAttr(selectorForNonExistent, "name", "parent")).toThrow(/Unable to set/);
    });
  });

  describe("the setAttrs function", () => {
    it("sets the attributes on a target when an attributes object is specified", () => {
      const element = render(`<div>Test</div>`);

      const result = setAttrs(element, { name: "parent", "aria-invalid": true })!;

      expect(result.getAttribute("name")).toBe("parent");
      expect(result.getAttribute("aria-invalid")).toBe("true");
    });
  });
});
