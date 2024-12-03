/**
 * This module provides functions for querying and manipulating [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) on HTML and SVG elements.
 *
 * The API for working with CSS variables is _slightly_ different from the rest
 * of the modules. Instead of specifying a `target` as the first argument, you
 * specify it as the last argument.
 *
 * > [!NOTE]
 * > In my experience, CSS variables are normally stored on the `:root` element,
 * > so omitting the `target` argument uses the `:root` element.
 * >
 * > See the {@linkcode getCssVar} function as an example.
 *
 * @module css
 */
export {
  clsx,
  type ClassArray,
  type ClassDict,
  type ClassValue,
} from "./clsx.ts";
export { getCssVar, getCssVars } from "./getCssVars.ts";
export {
  hasAllCssVars,
  hasCssVar,
  hasSomeCssVars,
  type CssVarsSearch,
} from "./hasCssVars.ts";
export { InvalidCssVarError } from "./InvalidCssVarError.ts";
export { removeCssVar, removeCssVars } from "./removeCssVars.ts";
export { setCssVar, setCssVars } from "./setCssVars.ts";
export type { CssSelector, CssVarName, CssVars, CssVarValue } from "./types.ts";
