import { InvalidElemError } from "../../elems/InvalidElemError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeProp, removeProps } from "../removeProps.ts";

describe("within removeProps", () => {
  describe("the removeProp function", () => {
    it("removes the the specified property from the target", () => {
      const element = render(`<span>Hello</span>`);
      element.ariaLabel = "Test element";

      const result = removeProp(element, "ariaLabel");

      expect(result.ariaLabel).toBeUndefined();
    });

    it("does nothing if the specified property does not exist in the target", () => {
      const element = render(`<span>Hello</span>`);
      element.ariaLabel = "Test element";

      const result = removeProp(element, "name");

      expect(result.ariaLabel).toBe("Test element");
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeProp(selectorForNonExistent, "name");
      }).toThrow(InvalidElemError);
    });
  });

  describe("the removeProps function", () => {
    it("removes the the specified property names from the target", () => {
      const element = render(`<span>Hello</span>`);
      element.id = "hello";
      element.ariaLabel = "Test element";

      const result = removeProps(element, ["id", "ariaLabel"]);

      expect(result.id).toBeUndefined();
      expect(result.ariaLabel).toBeUndefined();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeProps(selectorForNonExistent, ["name"]);
      }).toThrow(InvalidElemError);
    });
  });
});
