import { getElemValue, getElemValueAs } from "../getElemValue.ts";

describe("within values", () => {
  describe("the getElemValue function", () => {
    it("returns the value of the element", ({ selectors }) => {
      const result = getElemValue(selectors.forTextInput);

      expect(result).toBe("Test");
    });
  });

  describe("the getElemValueAs function", () => {
    it("returns a string value if valid", ({ selectors }) => {
      const result = getElemValueAs(selectors.forTextInput, "string");

      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });
  });
});
