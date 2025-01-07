import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { hasAllStyles, hasSomeStyles, hasStyle } from "../hasStyles.ts";

describe("within hasStyles", () => {
  describe("the hasStyle function", () => {
    it("returns true if the specified style exists on the target", () => {
      const element = render(`<button style="color: red;">Test</button>`);

      const result = hasStyle(element, "color");

      expect(result).toBeTruthy();
    });

    it("returns true if the specified style name with value exists on the target", () => {
      const element = render(`<button style="color: red;">Test</button>`);

      const result = hasStyle(element, "color", "red");

      expect(result).toBeTruthy();
    });

    it("returns false if the specified style does not exist on the target", () => {
      const element = render("<button>Test</button>");

      const result = hasStyle(element, "color");

      expect(result).toBeFalsy();
    });

    it("returns false if the specified style name with value does not exist on the target", () => {
      const element = render(`<button style="color: red;">Test</button>`);

      const result = hasStyle(element, "color", "blue");

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render("<span>Test</span>");

      expect(() => {
        hasStyle("button", "color");
      }).toThrow(/Cannot check/);
    });
  });

  describe("the hasAllStyles function", () => {
    it("returns true if all specified styles exist on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasAllStyles(element, ["color", "background", "lineHeight"]);

      expect(result).toBeTruthy();
    });

    it("returns true if all specified styles match search filter on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasAllStyles(element, {
        color: "red",
        background: "blue",
        lineHeight: 1.5,
      });

      expect(result).toBeTruthy();
    });

    it("returns false if one of the specified styles do not exist on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasAllStyles(element, ["color", "background", "lineHeight", "border"]);

      expect(result).toBeFalsy();
    });

    it("returns false if any of the specified styles search filters do not match the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasAllStyles(element, {
        color: "red",
        background: "blue",
        lineHeight: 1.5,
        border: "1px solid",
      });

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render("<span>Test</span>");

      expect(() => {
        hasAllStyles("button", ["color"]);
      }).toThrow(/Cannot check/);
    });
  });

  describe("the hasSomeStyles function", () => {
    it("returns true if some of the specified styles exist on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasSomeStyles(element, ["color", "background", "border"]);

      expect(result).toBeTruthy();
    });

    it("returns true if some of the specified styles match search filter on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasSomeStyles(element, { color: "red" });

      expect(result).toBeTruthy();
    });

    it("returns false if none of the specified styles exist on the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasSomeStyles(element, ["border", "padding"]);

      expect(result).toBeFalsy();
    });

    it("returns false if all of the specified styles search filters do not match the target", () => {
      // biome-ignore format:
      const element = render(`<button style="color: red; background: blue; line-height: 1.5;">Test</button>`);

      const result = hasSomeStyles(element, {
        color: "blue",
        background: "red",
        lineHeight: 2,
      });

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render("<span>Test</span>");

      expect(() => {
        hasSomeStyles("button", ["color"]);
      }).toThrow(/Cannot check/);
    });
  });
});
