import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { hasAllCssVars, hasCssVar, hasSomeCssVars } from "../hasCssVars.ts";
import { removeCssVar, removeCssVars } from "../removeCssVars.ts";
import { setCssVar, setCssVars } from "../setCssVars.ts";

describe("within hasCssVars", () => {
  describe("the hasCssVar function", () => {
    it("returns true if the specified CSS variable exists on the documentElement", () => {
      setCssVar("--color-bg", "blue");

      const result = hasCssVar("--color-bg", undefined);

      expect(result).toBeTruthy();

      removeCssVar("--color-bg");
    });

    it("returns true if the specified CSS variable exists on the target", () => {
      const element = render(`<button style="--color-bg: blue;">Test</button>`);

      const result = hasCssVar("--color-bg", undefined, element);

      expect(result).toBeTruthy();
    });

    it("returns true if the specified CSS variable name with value exists on the target", () => {
      const element = render(`<button style="--color-bg: blue;">Test</button>`);

      const result = hasCssVar("--color-bg", "blue", element);

      expect(result).toBeTruthy();

      removeCssVar("--color-bg");
    });

    it("returns true if the specified CSS variable name with value exists on the documentElement", () => {
      setCssVar("--color-bg", "blue");

      const result = hasCssVar("--color-bg", undefined);

      expect(result).toBeTruthy();
    });

    it("returns false if the specified CSS variable does not exist on the target", () => {
      const element = render(`<button style="--color-bg: blue;">Test</button>`);

      const result = hasCssVar("--invalid", undefined, element);

      expect(result).toBeFalsy();
    });

    it("returns false if the specified CSS variable name with value does not exist on the target", () => {
      const element = render(`<button style="--color-bg: blue;">Test</button>`);

      const result = hasCssVar("--color-bg", "not-blue", element);

      expect(result).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      render(`<span style="--color-bg: blue;">Test</span>`);

      expect(() => {
        hasCssVar("--color-bg", undefined, "button");
      }).toThrow(/Cannot check/);
    });
  });

  describe("the hasAllCssVars function", () => {
    it("returns true if all specified CSS variables exist on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasAllCssVars(["--color-bg", "--font-weight", "--is-big"], element);

      expect(result).toBeTruthy();
    });

    it("returns true if all specified CSS variables exist on the documentElement", () => {
      setCssVars({ "--color-bg": "blue", "--font-weight": 200, "--is-big": true });

      const result = hasAllCssVars(["--color-bg", "--font-weight", "--is-big"]);

      expect(result).toBeTruthy();

      removeCssVars(["--color-bg", "--font-weight", "--is-big"]);
    });

    it("returns true if all specified CSS variables match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasAllCssVars(
        {
          "--color-bg": "blue",
          "--font-weight": 200,
          "--is-big": null,
        },
        element,
      );

      expect(result).toBeTruthy();
    });

    it("returns false if one of the specified CSS variables do not exist on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasAllCssVars(
        ["--color-bg", "--font-weight", "--is-big", "--missing"],
        element,
      );

      expect(result).toBeFalsy();
    });

    it("returns false if any of the specified CSS variables search filters do not match the target", () => {
      const element = render(
        `<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`,
      );

      const result = hasAllCssVars(
        {
          "--color-bg": "blue",
          "--font-weight": 200,
          "--is-big": true,
          "--missing": "",
        },
        element,
      );

      expect(result).toBeFalsy();
    });
  });

  describe("the hasSomeCssVars function", () => {
    it("returns true if some of the specified CSS variables exist on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasSomeCssVars(["--color-bg", "--font-weight", "--missing"], element);

      expect(result).toBeTruthy();
    });

    it("returns true if some specified CSS variables exist on the documentElement", () => {
      setCssVars({ "--color-bg": "blue", "--font-weight": 200, "--is-big": true });

      const result = hasSomeCssVars(["--color-bg", "--font-weight", "--missing"]);

      expect(result).toBeTruthy();

      removeCssVars(["--color-bg", "--font-weight", "--is-big"]);
    });

    it("returns true if some of the specified CSS variables match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasSomeCssVars({ "--color-bg": "blue" }, element);

      expect(result).toBeTruthy();
    });

    it("returns false if none of the specified CSS variables exist on the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasSomeCssVars(["--missing", "--invalid"], element);

      expect(result).toBeFalsy();
    });

    it("returns false if none of the specified CSS variables exist on the documentElement", () => {
      setCssVars({ "--color-bg": "blue", "--font-weight": 200, "--is-big": true });

      const result = hasSomeCssVars(["--missing", "--invalid"]);

      expect(result).toBeFalsy();

      removeCssVars(["--color-bg", "--font-weight", "--is-big"]);
    });

    it("returns false if all of the specified CSS variables search filters do not match the target", () => {
      // prettier-ignore
      const element = render(`<button style="--color-bg: blue; --font-weight: 200; --is-big: true;">Test</button>`);

      const result = hasSomeCssVars(
        {
          "--color-bg": "incorrect",
          "--font-weight": "button",
          "--is-big": false,
        },
        element,
      );

      expect(result).toBeFalsy();
    });
  });
});
