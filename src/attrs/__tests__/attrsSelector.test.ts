import { attrSelector, attrsSelector } from "../attrsSelector.ts";

describe("within attrsSelector", () => {
  describe("the attrSelector function", () => {
    it("returns a selector when an attribute name is specified", () => {
      const result = attrSelector("inert");

      expect(result).toBe("[inert]");
    });

    it("returns a selector when an attribute name and valid value is specified", () => {
      const result = attrSelector("aria-hidden", true);

      expect(result).toBe(`[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name, valid value, and tag is specified", () => {
      const result = attrSelector("aria-hidden", true, "button");

      expect(result).toBe(`button[aria-hidden="true"]`);
    });

    it("returns a selector when an attribute name and invalid value is specified", () => {
      // @ts-ignore
      const result = attrSelector("aria-hidden", { thisIs: "invalid" });

      expect(result).toBe(`[aria-hidden]`);
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
