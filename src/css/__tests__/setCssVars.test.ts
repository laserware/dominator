import { render, selectorForNonExistent } from "../../testing.ts";
import { InvalidCssVarError } from "../InvalidCssVarError.ts";
import { setCssVar, setCssVars } from "../setCssVars.ts";

const getCssVarNative = (name: string, target = document.documentElement): unknown =>
  window.getComputedStyle(target).getPropertyValue(name);

describe("within setCssVars", () => {
  describe("the setCssVar function", () => {
    it("sets the CSS string variable on the :root element", () => {
      setCssVar("--color-bg", "blue");

      expect(getCssVarNative("--color-bg")).toBe("blue");
    });

    it("sets the CSS number variable on the :root element", () => {
      setCssVar("--gap", 24);

      expect(getCssVarNative("--gap")).toBe("24");
    });

    it("sets the CSS boolean variable on the :root element", () => {
      setCssVar("--is-big", true);

      expect(getCssVarNative("--is-big")).toBeTruthy();
    });

    it("sets the CSS string variable on a target element", () => {
      const element = render(`<button>Click</button>`);

      setCssVar("--color-button", "blue", element);

      expect(getCssVarNative("--color-button", element)).toBe("blue");
    });

    it("does not set an undefined value on the :root element", () => {
      // @ts-ignore
      setCssVar("--color-button", undefined);

      expect(getCssVarNative("--color-button")).toBe("");
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        setCssVar("--button-color", "red", selectorForNonExistent);
      }).toThrow(/Unable to set/);
    });

    it("throws an error if an invalid name is specified", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        // @ts-ignore
        setCssVar("button-color", "red", element);
      }).toThrow(InvalidCssVarError);
    });
  });

  describe("the setCssVars function", () => {
    it("sets the CSS variables on the :root element", () => {
      setCssVars({ "--color-bg": "blue", "--gap": 24, "--is-big": true });

      expect(getCssVarNative("--color-bg")).toBe("blue");
      expect(getCssVarNative("--gap")).toBe("24");
      expect(getCssVarNative("--is-big")).toBe("true");
    });

    it("sets the CSS variables on a target element", () => {
      const element = render(`<button>Click</button>`);

      setCssVars({ "--color-bg": "blue", "--gap": 24, "--is-big": true }, element);

      expect(getCssVarNative("--color-bg", element)).toBe("blue");
      expect(getCssVarNative("--gap", element)).toBe("24");
      expect(getCssVarNative("--is-big", element)).toBe("true");
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        setCssVars({ "--button-color": "red" }, selectorForNonExistent);
      }).toThrow(/Unable to set/);
    });

    it("throws an error if an invalid name is specified", () => {
      const element = render(`<button style="--button-color: blue;">Click</button>`);

      expect(() => {
        // @ts-ignore
        setCssVars({ "button-color": "red" }, element);
      }).toThrow(InvalidCssVarError);
    });
  });
});
