import { render } from "../../testing.ts";
import { hasAllProps, hasProp, hasSomeProps } from "../hasProps.ts";

describe("within hasProps", () => {
  describe("the hasProp function", () => {
    it("returns true if the specified property exists on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";

      const result = hasProp(element, "name");

      expect(result).toBeTruthy();
    });

    it("returns true if the specified property name with value exists on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";

      const result = hasProp(element, "name", "button");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified property does not exist on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);

      const result = hasProp(element, "formAction");

      expect(result).toBeFalsy();
    });

    it("returns false if the specified property name with value does not exist on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";

      const result = hasProp(element, "name", "not-button");

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasProp("button", "name");
      }).toThrow(/Unable to check/);
    });
  });

  describe("the hasAllProps function", () => {
    it("returns true if all specified properties match search filter on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";
      element.type = "submit";
      element.inert = true;

      const result = hasAllProps(element, {
        name: "button",
        type: "submit",
        inert: null,
      });

      expect(result).toBeTruthy();
    });

    it("returns false if any of the specified properties search filters do not match the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";
      element.type = "submit";
      element.inert = true;

      const result = hasAllProps(element, {
        name: "button",
        type: "submit",
        inert: null,
        formAction: null,
      });

      expect(result).toBeFalsy();
    });
  });

  describe("the hasSomeProps function", () => {
    it("returns true if some of the specified properties match search filter on the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";
      element.type = "submit";
      element.inert = true;

      const result = hasSomeProps(element, { name: "button" });

      expect(result).toBeTruthy();
    });

    it("returns false if all of the specified properties search filters do not match the target", () => {
      const element = render<HTMLButtonElement>(`<button>Test</button>`);
      element.name = "button";
      element.type = "submit";
      element.inert = true;

      const result = hasSomeProps(element, {
        name: "incorrect",
        type: "button",
        inert: "true",
      });

      expect(result).toBeFalsy();
    });
  });
});
