import { attrSelector, attrsSelector } from "../attrsSelector.ts";

describe("within attrsSelector", () => {
  describe("the attrSelector function", () => {
    it("returns a selector when an attribute name is specified", () => {
      const result = attrSelector("inert");

      expect(result).toBe("[inert]");
    });

    it("returns a selector when an attribute name and undefined is specified", () => {
      const result = attrSelector("aria-hidden", undefined);

      expect(result).toBe(`[aria-hidden]`);
    });

    it("returns a selector when an attribute name and valid value is specified", () => {
      const result = attrSelector("aria-hidden", true);

      expect(result).toBe(`[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name, valid value, and tag is specified", () => {
      const result = attrSelector("aria-hidden", true, "button");

      expect(result).toBe(`button[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name and array value is specified", () => {
      // @ts-ignore
      const result = attrSelector("data-array", [1, 2, 3]);

      expect(result).toBe(`[data-array="[1,2,3]"]`);
    });

    it("returns a selector when an attribute name and object value is specified", () => {
      const result = attrSelector("data-object", { thisIs: "object" });

      expect(result).toBe(`[data-object="{\\"thisIs\\":\\"object\\"}"]`);
    });

    it("throws an error if an invalid value is passed in", () => {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
      expect(() => {
        // @ts-ignore
        attrSelector("data-big-int", BigInt(20));
      }).toThrow(/could not get selector/i);
    });
  });

  describe("the attrsSelector function", () => {
    it("returns a selector when an attributes object is specified", () => {
      const result = attrsSelector({ "aria-hidden": true, inert: null });

      expect(result).toBe(`[aria-hidden="true"][inert]`);
    });

    it("returns a selector when an attributes object and tag is specified", () => {
      const result = attrsSelector({ "aria-hidden": true, inert: null }, "svg");

      expect(result).toBe(`svg[aria-hidden="true"][inert]`);
    });
  });
});
