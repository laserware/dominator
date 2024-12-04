import { cast, isNotNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";
import { isCssVarName } from "./isCssVarName.ts";
import type { CssVarName, CssVars, CssVarValue } from "./types.ts";

/**
 * Sets the CSS variable `name` to `value` in the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param name Name of the CSS variable to set or update.
 * @param value Value of the CSS variable.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if the `name` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue;">
 *   Example
 * </button>
 * ```
 *
 * **Set in Element**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setCssVar("--color-bg", "red", elem);
 * ```
 *
 * **Set in `:root`**
 *
 * ```ts
 * setCssVar("--color-fg", "blue");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: blue;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: red;">
 *   Example
 * </button>
 * ```
 */
export function setCssVar<TN extends TagName = "*">(
  name: CssVarName,
  value: CssVarValue,
  target: ElemOrCssSelector<TN> = document.documentElement,
): ElementOf<TN> {
  const elem = elemOrThrow(target, `Unable to set CSS variable ${name}`);

  setSingleCssVar(elem, name, value);

  return cast<ElementOf<TN>>(elem);
}

/**
 * Sets the CSS `vars` on the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @remarks
 * The keys in the `vars` argument are not limited to type {@linkcode CssVarName}
 * because the key (i.e. CSS variable name) is checked prior to setting it on the
 * property.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param vars Object with key of CSS variable name and value of value to set for name.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if a name in `vars` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue;">
 *   Example
 * </button>
 * ```
 *
 * **Set in Element**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setCssVars({ "--color-bg", "red" }, elem);
 * ```
 *
 * **Set in `:root`**
 *
 * ```ts
 * setCssVars({ "--color-fg", "blue" });
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: blue;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: red;">
 *   Example
 * </button>
 * ```
 */
export function setCssVars<TN extends TagName = "*">(
  vars: CssVars,
  target: ElemOrCssSelector<TN> = document.documentElement,
): ElementOf<TN> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set CSS variables ${formatForError(vars)}`);

  for (const key of Object.keys(vars)) {
    const varName = cast<keyof typeof vars>(key);

    setSingleCssVar(elem, varName, vars[varName]);
  }

  return cast<ElementOf<TN>>(elem);
}

function setSingleCssVar(
  element: Element,
  name: string,
  value: CssVarValue,
): void {
  if (!isCssVarName(name)) {
    // prettier-ignore
    throw new InvalidCssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const attrValue = stringifyDOMValue(value);
  if (isNotNil(attrValue)) {
    cast<HTMLElement>(element).style.setProperty(name, attrValue);
  }
}
