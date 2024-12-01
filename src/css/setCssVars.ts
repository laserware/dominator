import { isNotNil } from "@laserware/arcade";

import { cast } from "../internal/cast.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { isCssVarName } from "../typeGuards.ts";
import type {
  AnyElement,
  CssVarName,
  CssVars,
  CssVarValue,
  ElemOrCssSelector,
} from "../types.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";

/**
 * Sets the specified CSS variable `name` to the specified `value` in the
 * optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template E Element type of specified `target`.
 *
 * @param name Name of the CSS variable to set or update.
 * @param value Value of the CSS variable.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} If the specified `name` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>:root { --color-fg: green; }</style>
 *
 * <button id="example" style="--color-bg: blue;">Example</button>
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
 * <style>:root { --color-fg: blue; }</style>
 *
 * <button id="example" style="--color-bg: red;">Example</button>
 * ```
 */
export function setCssVar<E extends AnyElement = HTMLElement>(
  name: CssVarName,
  value: CssVarValue,
  target: ElemOrCssSelector<E> = document.documentElement,
): E {
  const elem = elemOrThrow(target, `Unable to set CSS variable ${name}`);

  setSingleCssVar(elem, name, value);

  return cast<E>(elem);
}

/**
 * Sets the specified CSS `vars` on the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @remarks
 * The keys in the `vars` argument are not limited to type {@linkcode CssVarName}
 * because the key (i.e. CSS variable name) is checked prior to setting it on the
 * property.
 *
 * @template E Element type of specified `target`.
 *
 * @param vars Object with key of CSS variable name and value of value to set for name.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} If a specified name in `vars` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>:root { --color-fg: green; }</style>
 *
 * <button id="example" style="--color-bg: blue;">Example</button>
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
 * <style>:root { --color-fg: blue; }</style>
 *
 * <button id="example" style="--color-bg: red;">Example</button>
 * ```
 */
export function setCssVars<E extends AnyElement = HTMLElement>(
  vars: CssVars,
  target: ElemOrCssSelector<E> = document.documentElement,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set CSS variables ${formatForError(vars)}`);

  for (const key of Object.keys(vars)) {
    const varName = cast<keyof typeof vars>(key);

    setSingleCssVar(elem, varName, vars[varName]);
  }

  return cast<E>(elem);
}

function setSingleCssVar(
  element: AnyElement,
  name: string,
  value: CssVarValue,
): void {
  if (!isCssVarName(name)) {
    // prettier-ignore
    throw new InvalidCssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const attrValue = stringifyDOMValue(value);
  if (isNotNil(attrValue)) {
    element.style.setProperty(name, attrValue);
  }
}
