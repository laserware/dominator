import { isNil } from "@laserware/arcade";

import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type {
  AnyElement,
  CssVarName,
  CssVarValue,
  DOMPropertySearch,
  ElemOrCssSelector,
} from "../types.ts";

/**
 * Search criteria for checking if CSS variables are present in an element.
 * You can use an array of CSS variable names to check only if the CSS variables are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of a CSS variable.
 *
 * @category CSS
 */
export type CssVarsSearch = DOMPropertySearch<CssVarName, CssVarValue | null>;

/**
 * Checks if the specified `target` has the specified CSS variable with `name`.
 * If a `value` is specified, checks that the values match.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param name Name of the CSS variable to check for.
 * @param [value=undefined] Optional value of the CSS variable to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified CSS variable is present.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <style>:root { --color-fg: green; }</style>
 *
 * <button id="example" style="--color-bg: blue; --is-big: true;">Example</button>
 * ```
 *
 * **Check Element**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * hasCssVar("--color-bg", undefined, elem);
 * // true
 *
 * hasCssVar("--is-big", "true", elem);
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasCssVar("--color-bg", "blue", elem);
 * // true
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasCssVar("--color-bg");
 * // true
 *
 * hasCssVar("--is-big", "true");
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasCssVar("--color-bg", "blue");
 * // true
 * ```
 *
 * @category CSS
 */
export function hasCssVar(
  name: CssVarName,
  value: CssVarValue | undefined = undefined,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for CSS variable ${name}`);

  return hasSingleCssVar(elem, name, value);
}

/**
 * Checks if *all* of the CSS variables match the specified `search` criteria
 * in the `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param search Array of CSS variable names or CSS variables filter to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` matches all search criteria.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
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
 * const elem = findElem("#example")!;
 *
 * hasAllCssVars(["--color-bg", "--is-big"] , elem);
 * // true
 *
 * hasAllCssVars({ "--color-bg": "blue", "--is-big": true }, elem);
 * // true
 *
 * hasAllCssVars({ "--color-bg": "blue", "--missing": true }, elem);
 * // false
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasAllCssVars(["--color-fg", "--padding-small"]);
 * // true
 *
 * hasAllCssVars({ "--color-fg": "green", "--is-small": "true" });
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasAllCssVars({ "--color-fg": "green", "--is-small": false });
 * // false (`--is-small` is `true`)
 * ```
 *
 * @category CSS
 */
export function hasAllCssVars(
  search: CssVarsSearch,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for all CSS variables ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleCssVar);
}

/**
 * Checks if *some* of the CSS variables match the specified `search` criteria
 * in the `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @param search Array of CSS variable names or CSS variables filter to check for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` has *some* of the specified CSS variables.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
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
 * const elem = findElem("#example")!;
 *
 * hasSomeCssVars(["--color-bg"] , elem);
 * // true
 *
 * hasSomeCssVars({ "--color-bg": "blue", "--missing": null }, elem);
 * // true
 *
 * hasSomeCssVars({ "--color-bg": "blue", "--missing": true }, elem);
 * // false
 * ```
 *
 * **Check `:root`**
 *
 * ```ts
 * hasSomeCssVars(["--color-fg", "--padding-small"]);
 * // true
 *
 * hasSomeCssVars({ "--color-fg": "green", "--is-small": "true" });
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasSomeCssVars({ "--color-fg": "green", "--is-small": false });
 * // false (`--is-small` is `true`)
 * ```
 *
 * @category CSS
 */
export function hasSomeCssVars(
  search: CssVarsSearch,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for some CSS variables ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleCssVar);
}

function hasSingleCssVar(
  element: AnyElement,
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
