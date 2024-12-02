import type { Primitive } from "@laserware/arcade";

/**
 * CSS selector string. Note that no validation is performed on the selector,
 * so this could represent any string value (even if it is not a valid CSS
 * selector).
 */
export type CssSelector = string;

/**
 * Valid name for a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * CSS variables *must* start with `--`.
 */
export type CssVarName = `--${string}`;

/**
 * Valid value for a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * @remarks
 * The {@linkcode arcade!Primitive} type represents a boolean, number, or string.
 */
export type CssVarValue = Primitive;

/**
 * Represents an object with key of {@linkcode CssVarName} and value
 * of {@linkcode CssVarValue}.
 */
export type CssVars = Record<CssVarName, CssVarValue>;
