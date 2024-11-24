import { render } from "../../testing.ts";
import { hasAllAttrs, hasAttr, hasSomeAttrs } from "../hasAttrs.ts";

describe("within hasAttrs", () => {
  describe("the hasAttr function", () => {
    it("returns true if the specified attribute exists on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttr(element, "name");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", () => {
      const element = render(`<button>Test</button>`);

      const result = hasAttr(element, "invalid");

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render(`<span>Test</span>`);

      expect(() => hasAttr("button", "name")).toThrow(/Unable to check/);
    });
  });

  describe("the hasAllAttrs function", () => {
    it("returns true if all specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttrs(element, ["name", "type", "inert"]);

      expect(result).toBeTruthy();
    });

    it("returns false if one of the specified attributes do not exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttrs(element, ["name", "type", "inert", "missing"]);

      expect(result).toBeFalsy();
    });
  });

  describe("the hasSomeAttrs function", () => {
    it("returns true if some of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, ["name", "type", "missing"]);

      expect(result).toBeTruthy();
    });

    it("returns false if none of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, ["missing", "invalid"]);

      expect(result).toBeFalsy();
    });
  });
});
