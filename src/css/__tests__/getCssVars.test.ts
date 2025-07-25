import { describe, expect, it } from "bun:test";

import { render, selectorForNonExistent } from "../../testing.ts";
import { getCssVar, getCssVars } from "../getCssVars.ts";
import { InvalidCssVarError } from "../InvalidCssVarError.ts";

describe("within getCssVars", () => {
  describe("the getCssVar function", () => {
    it("returns a CSS string variable on the :root element", () => {
      render("<style>:root { --color-blue: blue; --color-green: green; }</style>");

      const result = getCssVar("--color-blue");

      expect(result).toBe("blue");
    });

    it("returns a CSS number variable on the :root element", () => {
      render("<style>:root { --gap-small: 24; }</style>");

      const result = getCssVar<number>("--gap-small");

      expect(result).toBe(24);
    });

    it("returns a CSS boolean variable on the :root element", () => {
      render("<style>:root { --is-big: true; }</style>");

      const result = getCssVar("--is-big");

      expect(result).toBeTruthy();
    });

    it("returns a CSS variable from a specified target", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      const result = getCssVar("--button-color", element);

      expect(result).toBe("blue");
    });

    it("returns undefined if the specified variable does not exist", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      const result = getCssVar("--button", element);

      expect(result).toBeUndefined();
    });

    it("throws an error if the target does not exist", () => {
      render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        getCssVar("--button-color", selectorForNonExistent);
      }).toThrow(/Cannot get/);
    });

    it("throws an error if an invalid name is specified", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        // @ts-ignore
        getCssVar("button-color", element);
      }).toThrow(InvalidCssVarError);
    });
  });

  describe("the getCssVars function", () => {
    it("returns the CSS vars from the :root element", () => {
      // biome-ignore format: Ignore
      render("<style>:root { --color-bg: blue; --color-fg: green; --gap: 24; --is-big: true }</style>");

      const result = getCssVars(["--color-bg", "--color-fg", "--gap", "--is-big"]);

      expect(result).toEqual({
        "--color-bg": "blue",
        "--color-fg": "green",
        "--gap": 24,
        "--is-big": true,
      });
    });

    it("returns the CSS vars from a specified target", () => {
      // biome-ignore format: Ignore
      const element = render(`<button style="--color-bg: blue; --color-fg: green; --gap: 24; --is-big: true">Click</button>`);

      const result = getCssVars(["--color-bg", "--color-fg", "--gap", "--is-big"], element);

      expect(result).toEqual({
        "--color-bg": "blue",
        "--color-fg": "green",
        "--gap": 24,
        "--is-big": true,
      });
    });

    it("throws an error if the target does not exist", () => {
      render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        getCssVars(["--button-color"], selectorForNonExistent);
      }).toThrow(/Cannot get/);
    });

    it("throws an error if an invalid name is specified", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        // @ts-ignore
        getCssVars(["button-color"], element);
      }).toThrow(InvalidCssVarError);
    });
  });
});
