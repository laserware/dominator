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
 */
export type CssVarValue = boolean | number | string;

/**
 * Represents an object with a key of {@linkcode CssVarName} and value
 * of {@linkcode CssVarValue}.
 */
export type CssVars = Record<CssVarName, CssVarValue>;
