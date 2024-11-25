import { InvalidElemError } from "../../elem/InvalidElemError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeAttr, removeAttrs } from "../removeAttrs.ts";

describe("within removeAttrs", () => {
  describe("the removeAttr function", () => {
    it("removes the the specified attribute from the target", () => {
      const element = render(`<span aria-label="Test element">Hello</span>`);

      const result = removeAttr(element, "aria-label");

      expect(result.hasAttribute("aria-label")).toBeFalsy();
    });

    it("does nothing if the specified attribute does not exist in the target", () => {
      const element = render(`<span aria-label="Test element">Hello</span>`);

      const result = removeAttr(element, "name");

      expect(result.hasAttribute("aria-label")).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => removeAttr(selectorForNonExistent, "name")).toThrow(InvalidElemError);
    });
  });

  describe("the removeAttrs function", () => {
    it("removes the the specified attribute names from the target", () => {
      const element = render(`<span id="hello" aria-label="Test element">Hello</span>`);

      const result = removeAttrs(element, ["id", "aria-label"]);

      expect(result.hasAttribute("id")).toBeFalsy();
      expect(result.hasAttribute("aria-label")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => removeAttrs(selectorForNonExistent, ["name"])).toThrow(InvalidElemError);
    });
  });
});
