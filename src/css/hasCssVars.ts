import { isNil } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type { PropertySearch } from "../types.ts";

import type { CssVarName, CssVarValue } from "./types.ts";

/**
 * Search criteria for checking if CSS variables are present in an element.
 * You can use an array of CSS variable names to check only if the CSS variables are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of a CSS variable.
 */
export type CssVarsSearch = PropertySearch<CssVarName, CssVarValue | null>;

/**
 * Checks if the `target` has the CSS variable with `name`. If a `value` is
 * specified, checks that the values match.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param name Name of the CSS variable to check for.
 * @param [value=undefined] Optional value of the CSS variable to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the CSS variable `name` is present.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *     --padding-small: "24px";
 *     --is-small: true;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue; --is-big: true;">
 *   Example
 * </button>
 * ```
 *
 * **Check Element**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasCssVar("--color-bg", undefined, element);
 * // true
 *
 * hasCssVar("--is-big", "true", element);
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasCssVar("--color-bg", "blue", element);
 * // true
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasCssVar("--color-fg");
 * // true
 *
 * hasCssVar("--is-small", "true");
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasCssVar("--color-fg", "green");
 * // true
 * ```
 */
export function hasCssVar(
  name: CssVarName,
  value: CssVarValue | undefined = undefined,
  target: Target = document.documentElement,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for CSS variable ${name}`);

  return hasSingleCssVar(element, name, value);
}

/**
 * Checks if **all** of the CSS variables match the `search` criteria in the
 * `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param search Array of CSS variable names or CSS variables filter to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` matches all `search` criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *     --padding-small: "24px";
 *     --is-small: true;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue; --is-big: true;">Example</button>
 * ```
 *
 * **Check Element**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasAllCssVars(["--color-bg", "--is-big"] , element);
 * // true
 *
 * hasAllCssVars({
 *   "--color-bg": "blue",
 *   "--is-big": true,
 * }, element);
 * // true
 *
 * hasAllCssVars({
 *   "--color-bg": "blue",
 *   "--missing": true,
 * }, element);
 * // false
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasAllCssVars(["--color-fg", "--padding-small"]);
 * // true
 *
 * hasAllCssVars({
 *   "--color-fg": "green",
 *   "--is-small": "true",
 * });
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasAllCssVars({
 *   "--color-fg": "green",
 *   "--is-small": false,
 * });
 * // false (`--is-small` is `true`)
 * ```
 */
export function hasAllCssVars(
  search: CssVarsSearch,
  target: Target = document.documentElement,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for all CSS variables ${formatForError(search)}`);

  return hasAllProperties(element, search, hasSingleCssVar);
}

/**
 * Checks if **some** of the CSS variables match the `search` criteria in the
 * `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param search Array of CSS variable names or CSS variables filter to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` matches some `search` criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *     --padding-small: "24px";
 *     --is-small: true;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue; --is-big: true;">Example</button>
 * ```
 *
 * **Check Element**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasSomeCssVars(["--color-bg"] , element);
 * // true
 *
 * hasSomeCssVars({
 *   "--color-bg": "blue",
 *   "--missing": null,
 * }, element);
 * // true
 *
 * hasSomeCssVars({
 *   "--color-bg": "blue",
 *   "--missing": true,
 * }, element);
 * // false
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasSomeCssVars(["--color-fg", "--padding-small"]);
 * // true
 *
 * hasSomeCssVars({
 *   "--color-fg": "green",
 *   "--is-small": "true",
 * });
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasSomeCssVars({
 *   "--color-fg": "green",
 *   "--is-small": false,
 * });
 * // false (`--is-small` is `true`)
 * ```
 */
export function hasSomeCssVars(
  search: CssVarsSearch,
  target: Target = document.documentElement,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for some CSS variables ${formatForError(search)}`);

  return hasSomeProperties(element, search, hasSingleCssVar);
}

function hasSingleCssVar(
  element: Element,
  name: string,
  value?: CssVarValue | null,
): boolean {
  const propertyValue = window.getComputedStyle(element).getPropertyValue(name);

  if (isNil(value)) {
    return propertyValue !== "";
  }

  // If the user specified an empty string in the search object, we want to
  // ensure it doesn't accidentally get marked as existent on the specified
  // element. The return value of `getPropertyValue` is an empty string if the
  // property doesn't exist:
  if (propertyValue === "") {
    return false;
  } else {
    return propertyValue === stringifyDOMValue(value);
  }
}
