import { render } from "../../testing.ts";
import { hasAllAttributes, hasAttribute, hasSomeAttributes } from "../hasAttributes.ts";

describe("within hasAttributes", () => {
  describe("the hasAttribute function", () => {
    it("returns true if the specified attribute exists on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttribute(element, "name");

      expect(result).toBeTruthy();
    });

    it("returns true if the specified attribute name with value exists on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttribute(element, "name", "button");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", () => {
      const element = render(`<button>Test</button>`);

      const result = hasAttribute(element, "invalid");

      expect(result).toBeFalsy();
    });

    it("returns false if the specified attribute name with value does not exist on the target", () => {
      const element = render(`<button name="button">Test</button>`);

      const result = hasAttribute(element, "name", "not-button");

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render(`<span>Test</span>`);

      expect(() => {
        hasAttribute("button", "name");
      }).toThrow(/Unable to check/);
    });
  });

  describe("the hasAllAttributes function", () => {
    it("returns true if all specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttributes(element, ["name", "type", "inert"]);

      expect(result).toBeTruthy();
    });

    it("returns true if all specified attributes match search filter on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttributes(element, { name: "button", type: "submit", inert: null });

      expect(result).toBeTruthy();
    });

    it("returns false if one of the specified attributes do not exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttributes(element, ["name", "type", "inert", "missing"]);

      expect(result).toBeFalsy();
    });

    it("returns false if any of the specified attributes search filters do not match the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasAllAttributes(element, {
        name: "button",
        type: "submit",
        inert: null,
        missing: null,
      });

      expect(result).toBeFalsy();
    });
  });

  describe("the hasSomeAttributes function", () => {
    it("returns true if some of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttributes(element, ["name", "type", "missing"]);

      expect(result).toBeTruthy();
    });

    it("returns true if some of the specified attributes match search filter on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttributes(element, { name: "button" });

      expect(result).toBeTruthy();
    });

    it("returns false if none of the specified attributes exist on the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttributes(element, ["missing", "invalid"]);

      expect(result).toBeFalsy();
    });

    it("returns false if all of the specified attributes search filters do not match the target", () => {
      const element = render(`<button name="button" type="submit" inert>Test</button>`);

      const result = hasSomeAttributes(element, {
        name: "incorrect",
        type: "button",
        inert: "true",
      });

      expect(result).toBeFalsy();
    });
  });
});
