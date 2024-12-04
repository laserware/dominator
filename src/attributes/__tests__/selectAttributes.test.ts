import { InvalidAttributeError } from "../InvalidAttributeError.ts";
import { selectAttribute, selectAttributes } from "../selectAttributes.ts";

describe("within selectAttrs", () => {
  describe("the selectAttr function", () => {
    it("returns a selector when an attribute name is specified", () => {
      const result = selectAttribute("inert");

      expect(result).toBe("[inert]");
    });

    it("returns a selector when an attribute name and undefined is specified", () => {
      const result = selectAttribute("aria-hidden", undefined);

      expect(result).toBe(`[aria-hidden]`);
    });

    it("returns a selector when an attribute name and valid value is specified", () => {
      const result = selectAttribute("aria-hidden", true);

      expect(result).toBe(`[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name, valid value, and tag is specified", () => {
      const result = selectAttribute("aria-hidden", true, "button");

      expect(result).toBe(`button[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name and array value is specified", () => {
      // @ts-ignore
      const result = selectAttribute("data-array", [1, 2, 3]);

      expect(result).toBe(`[data-array="[1,2,3]"]`);
    });

    it("returns a selector when an attribute name and object value is specified", () => {
      const result = selectAttribute("data-object", { thisIs: "object" });

      expect(result).toBe(`[data-object="{\\"thisIs\\":\\"object\\"}"]`);
    });

    it("throws an error if an invalid value is passed in", () => {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
      expect(() => {
        // @ts-ignore
        selectAttribute("data-big-int", BigInt(20));
      }).toThrow(InvalidAttributeError);
    });
  });

  describe("the selectAttrs function", () => {
    it("returns a selector when an attributes object is specified", () => {
      const result = selectAttributes({ "aria-hidden": true, inert: null });

      expect(result).toBe(`[aria-hidden="true"][inert]`);
    });

    it("returns a selector when an attributes object and tag is specified", () => {
      const result = selectAttributes({ "aria-hidden": true, inert: null }, "svg");

      expect(result).toBe(`svg[aria-hidden="true"][inert]`);
    });
  });
});
