import { setAttr, setAttrs } from "../setAttrs.ts";

describe("within setAttrs", () => {
  describe("the setAttr function", () => {
    it("sets the attribute on the target when a name and value is specified", ({ selectors }) => {
      const elem = setAttr(selectors.forParent, "inert", null)!;

      expect(elem.hasAttribute("inert")).toBeTruthy();
    });

    it("removes the attribute from a target when undefined is specified as the value", ({
      selectors,
    }) => {
      const elem = setAttr(selectors.forParent, "inert", null)!;

      setAttr(selectors.forParent, "inert", undefined);

      expect(elem.hasAttribute("inert")).toBeFalsy();
    });

    it("returns null and does not set attributes if the target does not exist", ({ selectors }) => {
      const elem = setAttr(selectors.forMissing, "name", "parent");

      expect(elem).toBeNull();
    });
  });

  describe("the setAttrs function", () => {
    it("sets the attributes on a target when an attributes object is specified", ({
      selectors,
    }) => {
      const elem = setAttrs(selectors.forParent, { name: "parent", "aria-invalid": true })!;

      expect(elem.getAttribute("name")).toBe("parent");
      expect(elem.getAttribute("aria-invalid")).toBe("true");
    });
  });
});
