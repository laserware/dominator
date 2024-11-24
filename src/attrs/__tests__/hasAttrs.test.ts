import { hasAttr } from "../hasAttrs.ts";

describe("within hasAttrs", () => {
  describe("the hasAttr function", () => {
    it("returns true if the specified attribute exists on the target", ({ selectors }) => {
      const result = hasAttr(selectors.forButton, "name");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", ({ selectors }) => {
      const result = hasAttr(selectors.forButton, "invalid");

      expect(result).toBeFalsy();
    });

    it("returns false if the target does not exist", ({ selectors }) => {
      const result = hasAttr(selectors.forMissing, "name");

      expect(result).toBeFalsy();
    });
  });
});
