import { cast, isNotNil } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";
import { isCssVarName } from "./isCssVarName.ts";
import type { CssVarName, CssVarValue, CssVars } from "./types.ts";

/**
 * Sets the CSS variable `name` to `value` in the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template E Element representation of `target`.
 *
 * @param name Name of the CSS variable to set or update.
 * @param value Value of the CSS variable.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if the `name` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * setCssVar("--color-bg", "red", element);
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
export function setCssVar<E extends Element = HTMLElement>(
  name: CssVarName,
  value: CssVarValue,
  target: Target | null = document.documentElement,
): E {
  const element = toElementOrThrow(target, `Cannot set CSS variable ${name}`);

  setSingleCssVar(element, name, value);

  return cast<E>(element);
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
 * @template E Element representation of `target`.
 *
 * @param vars Object with key of CSS variable name and value of value to set for name.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if a name in `vars` is not a valid {@linkcode CssVarName}.
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * setCssVars({ "--color-bg", "red" }, element);
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
export function setCssVars<E extends Element = HTMLElement>(
  vars: CssVars,
  target: Target | null = document.documentElement,
): E {
  // biome-ignore format:
  const element = toElementOrThrow(target, `Cannot set CSS variables ${formatForError(vars)}`);

  for (const key of Object.keys(vars)) {
    const varName = cast<keyof typeof vars>(key);

    setSingleCssVar(element, varName, vars[varName]);
  }

  return cast<E>(element);
}

function setSingleCssVar(
  element: Element,
  name: string,
  value: CssVarValue,
): void {
  if (!isCssVarName(name)) {
    // biome-ignore format:
    throw new InvalidCssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const attributeValue = stringifyDOMValue(value);
  if (isNotNil(attributeValue)) {
    cast<HTMLElement>(element).style.setProperty(name, attributeValue);
  }
}
