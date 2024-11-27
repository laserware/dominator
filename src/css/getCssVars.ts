import { InvalidCssVarError } from "../errors.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { isCssVarName } from "../typeGuards.ts";
import type {
  CssVarName,
  CssVars,
  CssVarValue,
  ElemOrCssSelector,
  KeysOf,
} from "../types.ts";

/**
 * Attempts to get the value associated with the specified CSS variable `name`
 * from the specified `target`.
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
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
 * @template T Type of value to return.
 *
 * @param name Name of the variable to get value for.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Value associated with the specified `name` or `undefined` if it doesn't exist.
 *
 * @throws {@link InvalidCssVarError} If the specified `name` is invalid.
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @group CSS
 */
export function getCssVar<T extends CssVarValue>(
  name: CssVarName,
  target: ElemOrCssSelector = document.documentElement,
): T | undefined {
  const elem = elemOrThrow(target, `Unable to get CSS variable ${name}`);

  return getSingleCssVar<T>(elem, name);
}

/**
 * Builds an object with the keys equal to the specified CSS variable `names` and
 * the value equal to the corresponding variable value in the specified `target`.
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is excluded from the return value.
 *
 * @template T Shape of CSS variables object to return.
 *
 * @param names Names of the variable to get value for.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Object with specified names as keys and corresponding CSS variable values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * type CssVarsShape = {
 *   "--color-bg": string;
 *   "--gap": number;
 * }
 *
 * const element = setCssVars({ "--color-bg": "blue", "--gap": 24 });
 *
 * const result = getCssVars<CssVarsShape>(["--color-bg", "--gap"], undefined, element);
 * // { "--color-bg": "blue", "--gap": 24 }
 *
 * @group CSS
 */
export function getCssVars<T extends CssVars = CssVars>(
  names: KeysOf<T>,
  target: ElemOrCssSelector = document.documentElement,
): Partial<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get CSS variables ${formatForError(names)}`);

  const cssVars: Partial<T> = {};

  for (const name of names) {
    // @ts-ignore TypeScript is complaining that the `name` isn't a valid `CssVarName`,
    //            but we check that in this function, so I don't care.
    cssVars[name] = getSingleCssVar(elem, name);
  }

  return cssVars;
}

function getSingleCssVar<T extends CssVarValue = string>(
  element: HTMLElement,
  name: string,
): T | undefined {
  if (!isCssVarName(name)) {
    // prettier-ignore
    throw new InvalidCssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const value = window.getComputedStyle(element).getPropertyValue(name);
  if (value === "") {
    return undefined;
  } else {
    return parseDOMValue<T>(value);
  }
}
