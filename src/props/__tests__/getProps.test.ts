import { render, selectorForNonExistent } from "../../testing.ts";
import { getProp, getProps } from "../getProps.ts";

describe("within getAttrs", () => {
  describe("the getProp function", () => {
    it("returns the string attribute value if it exists", () => {
      const element = render(`<button id="button">Button</button>`);

      const result = getProp(element, "id");

      expect(result).toBe("button");
    });

    it("returns the number attribute value if it exists", () => {
      const element = render<HTMLCanvasElement>(`<canvas></canvas>`);

      element.width = 400;

      const result = getProp(element, "width");

      expect(result).toBe(400);
    });

    it("returns the boolean attribute values if they exist", () => {
      const element = render<HTMLButtonElement>(`<button id="button">Button</button>`);

      element.formNoValidate = true;

      expect(getProp(element, "formNoValidate")).toBe(true);
    });

    it("returns null if the attribute isn't present", () => {
      const element = render(`<button name="button">Button</button>`);

      // @ts-ignore
      const result = getProp(element, "invalid");

      expect(result).toBeUndefined();
    });

    it("throws an error if the element doesn't exist", () => {
      expect(() => {
        getProp(selectorForNonExistent, "id");
      }).toThrow(/Unable to get/);
    });
  });

  describe("the getProps function", () => {
    it("returns an object with the key of names passed in and values when all attributes exist", () => {
      const target = render<HTMLInputElement>(`<input />`);

      target.name = "text";
      target.type = "type";

      const result = getProps(target, ["name", "type"]);

      expect(result).toEqual({ name: "text", type: "text" });
    });

    it("returns an object with the key of names passed in and values when some attributes missing", () => {
      const target = render<HTMLButtonElement>(`<button name="button">Button</button>`);

      target.name = "button";
      target.disabled = true;

      const result = getProps(target, ["name", "disabled", "ariaDisabled"]);

      expectTypeOf(result).toMatchTypeOf<{
        name: string;
        disabled: boolean;
        ariaDisabled: string | null;
      }>();

      expect(result).toEqual({
        name: "button",
        disabled: true,
        ariaDisabled: null,
      });
    });

    it("throws an error if the target doesn't exist", () => {
      expect(() => {
        // @ts-ignore
        getProps(selectorForNonExistent, ["name", "disabled"]);
      }).toThrow(/Unable to get properties/);
    });
  });
});
