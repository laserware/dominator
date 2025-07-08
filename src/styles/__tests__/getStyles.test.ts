import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { getStyle, getStyles } from "../getStyles.ts";

describe("within getStyles", () => {
  describe("the getStyle function", () => {
    it("returns the string style value if it exists", () => {
      const element = render(`<button style="color: red;">Button</button>`);

      const result = getStyle(element, "color");

      expect(result).toBe("red");
    });

    it("returns the number style value if it exists", () => {
      const element = render(`<div style="opacity: 0.5;">Button</div>`);

      const result = getStyle<number>(element, "opacity");

      expect(result).toBe(0.5);
    });

    it("handles a kebab-case style key that exists", () => {
      const element = render(`<div style="flex-basis: auto;">Button</div>`);

      // @ts-ignore
      const result = getStyle(element, "flex-basis");

      expect(result).toBe("auto");
    });

    it("handles a CSS variable that exists", () => {
      const element = render(`<div style="--color-bg: blue;">Button</div>`);

      const result = getStyle(element, "--color-bg");

      expect(result).toBe("blue");
    });

    it("returns undefined if the style isn't present", () => {
      const element = render(`<button style="color: red;">Button</button>`);

      const result = getStyle(element, "fontSize");

      expect(result).toBeUndefined();
    });

    it("returns undefined when a kebab-case style key does not exist", () => {
      const element = render(`<div style="margin: 12px;">Button</div>`);

      // @ts-ignore
      const result = getStyle(element, "font-size");

      expect(result).toBeUndefined();
    });

    it("throws an error if the target doesn't exist", () => {
      expect(() => {
        getStyle(selectorForNonExistent, "color");
      }).toThrow(/Cannot get/);
    });
  });

  describe("the getStyles function", () => {
    it("returns an object with the key of names passed in and values when all styles exist", () => {
      // biome-ignore format: Ignore
      const element = render(`<button style="color: red; display: block; opacity: 0.5;">Button</button>`);

      const result = getStyles(element, ["color", "display", "opacity"]);

      expect(result).toEqual({
        color: "red",
        display: "block",
        opacity: 0.5,
      });
    });

    it("returns an object with the key of names passed in and values when some styles are missing", () => {
      // biome-ignore format: Ignore
      const element = render(`<button style="color: red; display: block; opacity: 0.5;">Button</button>`);

      const result = getStyles(element, ["color", "display", "opacity", "fontSize"]);

      expect(result).toEqual({
        color: "red",
        display: "block",
        opacity: 0.5,
        fontSize: undefined,
      });
    });

    it("throws an error if the target doesn't exist", () => {
      expect(() => {
        getStyles(selectorForNonExistent, ["color", "display"]);
      }).toThrow(/Cannot get styles/);
    });
  });
});
