import { render } from "../../testing.ts";
import { hasAllAttrs, hasAttr, hasSomeAttrs } from "../hasAttrs.ts";

describe("within hasAttrs", () => {
  describe("the hasAttr function", () => {
    it("returns true if the specified attribute exists on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttr(element, "name");

      expect(result).toBeTruthy();
    });

    it("returns true if the specified attribute name with value exists on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttr(element, "name", "button");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", () => {
      const element = render(`<button>Test</button>`);

      const result = hasAttr(element, "invalid");

      expect(result).toBeFalsy();
    });

    it("returns false if the specified attribute name with value does not exist on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttr(element, "name", "not-button");

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

    it("returns true if all specified attributes match search filter on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttrs(element, { name: "button", type: "submit", inert: null });

      expect(result).toBeTruthy();
    });

    it("returns false if one of the specified attributes do not exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttrs(element, ["name", "type", "inert", "missing"]);

      expect(result).toBeFalsy();
    });

    it("returns false if any of the specified attributes search filters do not match the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttrs(element, {
        name: "button",
        type: "submit",
        inert: null,
        missing: null,
      });

      expect(result).toBeFalsy();
    });
  });

  describe("the hasSomeAttrs function", () => {
    it("returns true if some of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, ["name", "type", "missing"]);

      expect(result).toBeTruthy();
    });

    it("returns true if some of the specified attributes match search filter on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, { name: "button" });

      expect(result).toBeTruthy();
    });

    it("returns false if none of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, ["missing", "invalid"]);

      expect(result).toBeFalsy();
    });

    it("returns false if all of the specified attributes search filters do not match the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttrs(element, {
        name: "incorrect",
        type: "button",
        inert: "true",
      });

      expect(result).toBeFalsy();
    });
  });
});
