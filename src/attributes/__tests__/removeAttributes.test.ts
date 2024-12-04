import { InvalidElemError } from "../../elems/InvalidElemError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeAttribute, removeAttributes } from "../removeAttributes.ts";

describe("within removeAttributes", () => {
  describe("the removeAttribute function", () => {
    it("removes the the specified attribute from the target", () => {
      const element = render(`<span aria-label="Test element">Hello</span>`);

      const result = removeAttribute(element, "aria-label");

      expect(result.hasAttribute("aria-label")).toBeFalsy();
    });

    it("does nothing if the specified attribute does not exist in the target", () => {
      const element = render(`<span aria-label="Test element">Hello</span>`);

      const result = removeAttribute(element, "name");

      expect(result.hasAttribute("aria-label")).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeAttribute(selectorForNonExistent, "name");
      }).toThrow(InvalidElemError);
    });
  });

  describe("the removeAttributes function", () => {
    it("removes the the specified attribute names from the target", () => {
      const element = render(`<span id="hello" aria-label="Test element">Hello</span>`);

      const result = removeAttributes(element, ["id", "aria-label"]);

      expect(result.hasAttribute("id")).toBeFalsy();
      expect(result.hasAttribute("aria-label")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeAttributes(selectorForNonExistent, ["name"]);
      }).toThrow(InvalidElemError);
    });
  });
});
