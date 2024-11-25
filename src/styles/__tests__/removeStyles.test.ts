import { getCssVar } from "../../css/getCssVars.ts";
import { InvalidElemError } from "../../elem/InvalidElemError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeStyle, removeStyles } from "../removeStyles.ts";

describe("within removeAttrs", () => {
  describe("the removeStyle function", () => {
    it("removes the the specified style property from the target", () => {
      const element = render(`<span style="color: red;">Hello</span>`);

      const result = removeStyle(element, "color");

      expect(result.style.color).toBeFalsy();
    });

    it("removes the the specified style property from the target if it is a CSS variable", () => {
      const element = render(`<span style="--bg-color: red;">Hello</span>`);

      const result = removeStyle(element, "--bg-color");

      expect(getCssVar("--bg-color", result)).toBeUndefined();
    });

    it("does nothing if the specified style property does not exist in the target", () => {
      const element = render(`<span style="color: red;">Hello</span>`);

      const result = removeStyle(element, "backgroundColor");

      expect(result.style.color).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeStyle(selectorForNonExistent, "color");
      }).toThrow(InvalidElemError);
    });
  });

  describe("the removeStyles function", () => {
    it("removes the the specified style property names from the target", () => {
      const element = render(`<span style="color: red; margin: 10px;">Hello</span>`);

      const result = removeStyles(element, ["color", "margin"]);

      expect(result.style.color).toBeFalsy();
      expect(result.style.margin).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeStyles(selectorForNonExistent, ["color"]);
      }).toThrow(InvalidElemError);
    });
  });
});
