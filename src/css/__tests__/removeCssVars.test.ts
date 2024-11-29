import { InvalidElemError } from "../../errors.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeCssVar, removeCssVars } from "../removeCssVars.ts";

describe("within removeCssVars", () => {
  describe("the removeCssVar function", () => {
    it("removes the the specified CSS variable from the target", () => {
      const element = render(`<span style="--color: red;">Hello</span>`);

      const result = removeCssVar("--color", element);

      expect(result.style.getPropertyValue("--color")).toBeFalsy();
    });

    it("does nothing if the specified CSS variable does not exist on the target", () => {
      const element = render(`<span style="--color: red;">Hello</span>`);

      const result = removeCssVar("--background", element);

      expect(result.style.getPropertyValue("--color")).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeCssVar("--background", selectorForNonExistent);
      }).toThrow(InvalidElemError);
    });
  });

  describe("the removeCssVars function", () => {
    it("removes the the specified CSS variable names from the target", () => {
      const element = render(`<span style="--color: red; --background: yellow;">Hello</span>`);

      const result = removeCssVars(["--color", "--background"], element);

      expect(result.style.getPropertyValue("--color")).toBeFalsy();
      expect(result.style.getPropertyValue("--background")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeCssVars(["--background"], selectorForNonExistent);
      }).toThrow(InvalidElemError);
    });
  });
});
