import { render } from "../../testing.ts";
import { getCssVar } from "../getCssVars.ts";

describe("within getCssVars", () => {
  describe("the getCssVar function", () => {
    it("returns the CSS string variable on the :root element", () => {
      render(`<style>:root { --color-blue: blue; --color-green: green; }</style>`);

      const result = getCssVar("--color-blue");

      expect(result).toBe("blue");
    });

    it("returns the CSS number variable on the :root element", () => {
      render(`<style>:root { --gap-small: 24; }</style>`);

      const result = getCssVar("--gap-small");

      expect(result).toBe(24);
    });
  });
});
