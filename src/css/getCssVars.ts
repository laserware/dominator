import { cast, type KeysOf, type WithUndefinedValues } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";
import { isCssVarName } from "./isCssVarName.ts";
import type { CssVarName, CssVars, CssVarValue } from "./types.ts";

/**
 * Attempts to get the value associated with the CSS variable `name` from the `target`.
 *
 * If no `target` is specified, the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`) will be used.
 *
 * If found, the value is coerced to a numeric value if number-like, or a boolean
 * if `"true"` or `"false"`. All CSS variables are technically strings, but it's
 * nice to get/set the actual type without worrying about string conversion first.
 *
 * @remarks
 * The function throws if the `target` doesn't exist, rather than just falling
 * back to the `:root` element. If you specify a `target`, you probably want to
 * get the CSS variable on that `target`.
 *
 * @template V Type of value to return.
 *
 * @param name Name of the variable to get value for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Value associated with the `name` or `undefined` if it doesn't exist.
 *
 * @throws {@linkcode InvalidCssVarError} if the specified `name` is invalid.
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue; --gap: 24;">
 *   Example
 * </button>
 * ```
 *
 * **Get from Element**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * getCssVar("--color-bg", element);
 * // "blue"
 *
 * getCssVar("--gap", element);
 * // 24
 * ```
 *
 * **Get from `:root`**
 *
 * ```ts
 * getCssVar("--color-fg");
 * // "green"
 * ```
 */
export function getCssVar<V extends CssVarValue = string>(
  name: CssVarName,
  target: Target | null = document.documentElement,
): V | undefined {
  const element = toElementOrThrow(target, `Cannot get CSS variable ${name}`);

  return getSingleCssVar<V>(element, name);
}

/**
 * Builds an object with the keys equal to the CSS variable `names` and
 * the value equal to the corresponding variable value in the `target`.
 *
 * If no `target` is specified, the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`) will be used.
 *
 * If the value is found, it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, the value
 * is excluded from the return value.
 *
 * > [!IMPORTANT]
 * > You will need to perform checks for whether a value is `undefined` in the returned
 * > object if some entries weren't present. See the code block below for
 * > additional details.
 *
 * ```ts
 * // Assuming you pass this in as the generic:
 * type ShapeIn = {
 *   "--color-bg": string;
 *   "--gap": number;
 * };
 *
 * // The return type of this function is:
 * type ShapeOut = {
 *   "--color-bg": string | undefined;
 *   "--gap": number | undefined;
 * };
 * ```
 *
 * @remarks
 * The {@linkcode arcade!WithUndefinedValues} type represents an object with values that could be `undefined`.
 *
 * @template V Shape of CSS variables object to return.
 *
 * @param names Names of the variable to get value for.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Object with `names` as keys and corresponding CSS variable values (or `undefined` if not present).
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
 *   }
 * </style>
 *
 * <button
 *   id="example"
 *   style="--color-bg: blue; --gap: 24;"
 * >
 *   Example
 * </button>
 * ```
 *
 * **Get from Element**
 *
 * ```ts
 * type Shape = {
 *   "--color-bg": string | undefined;
 *   "--gap": number | undefined;
 * };
 *
 * const element = findElement("#example")!;
 *
 * getCssVars<Shape>(["--color-bg", "--gap"], element);
 *  // { "--color-bg": "blue", "--gap": 24 }
 * ```
 *
 * **Get from `:root`**
 *
 * ```ts
 * type Shape = {
 *   "--color-fg": string | undefined;
 * };
 *
 * getCssVars<Shape>(["--color-fg"]);
 *  // { "--color-fg": "green" }
 * ```
 */
export function getCssVars<V extends CssVars = CssVars>(
  names: KeysOf<V>,
  target: Target | null = document.documentElement,
): WithUndefinedValues<V> {
  // biome-ignore format: Ignore
  const element = toElementOrThrow(target, `Cannot get CSS variables ${formatForError(names)}`);

  const cssVars: Record<string, CssVarValue | undefined> = {};

  for (const name of names) {
    // @ts-ignore TypeScript is complaining that the `name` isn't a valid `CssVarName`,
    //            but we check that in this function, so I don't care.
    cssVars[name] = getSingleCssVar(element, name);
  }

  return cast<WithUndefinedValues<V>>(cssVars);
}

function getSingleCssVar<T extends CssVarValue = string>(
  element: HTMLElement,
  name: string,
): T | undefined {
  if (!isCssVarName(name)) {
    // biome-ignore format: Ignore
    throw new InvalidCssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const value = window.getComputedStyle(element).getPropertyValue(name);
  if (value === "") {
    return undefined;
  } else {
    return parseDOMValue<T>(value);
  }
}
