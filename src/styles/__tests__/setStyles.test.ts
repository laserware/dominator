import { describe, expect, it } from "bun:test";

import { getCssVar } from "../../css/getCssVars.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { setStyle, setStyles } from "../setStyles.ts";

describe("within setStyles", () => {
  describe("the setStyle function", () => {
    it("sets the style on the target when a name and string value is specified", () => {
      const element = render("<div>Test</div>");

      const result = setStyle(element, "color", "red")!;

      expect(result.style.color).toBe("red");
    });

    it("sets the style on the target when a name and number value is specified", () => {
      const element = render("<div>Test</div>");

      const result = setStyle(element, "margin", "24px")!;

      expect(result.style.margin).toBe("24px");
    });

    it("removes the style from a target when undefined is specified as the value", () => {
      const element = render(`<div style="margin: 24px">Test</div>`);

      // @ts-ignore
      const result = setStyle(element, "margin", undefined);

      expect(result.style.margin).toBe("");
    });

    it("sets the style on the target when a CSS variable is specified", () => {
      const element = render("<div>Test</div>");

      const result = setStyle(element, "--color-bg", "blue")!;

      expect(getCssVar("--color-bg", result)).toBe("blue");
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        setStyle(selectorForNonExistent, "color", "green");
      }).toThrow(/Cannot set/);
    });
  });

  describe("the setStyles function", () => {
    it("sets the styles on a target when a styles object is specified", () => {
      const element = render("<div>Test</div>");

      const result = setStyles(element, {
        color: "green",
        fontSize: "24px",
      })!;

      expect(result.style.color).toBe("green");
      expect(result.style.fontSize).toBe("24px");
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        setStyles(selectorForNonExistent, { color: "green" });
      }).toThrow(/Cannot set/);
    });
  });
});
