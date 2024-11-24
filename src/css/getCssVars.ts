import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
import {
  CssVarName,
  type CssVars,
  type CssVarValue,
  type ElemOrCssSelector,
  type KeysOf,
} from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Attempts to get the value associated with the specified CSS variable `name`. If
 * no `target` is specified, gets the variable value from {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
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
 * @param [target] Optional Element, EventTarget, or CSS selector for element from
 *                 which to get CSS variable.
 *
 * @returns Value associated with the specified `name` or `undefined` if it doesn't exist.
 *
 * @throws {CssVarError} If the specified `name` is invalid.
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function getCssVar<T extends CssVarValue>(
  name: CssVarName,
  target?: ElemOrCssSelector,
): T | undefined {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new InvalidElemError(`Unable to get CSS variable ${name}`);
  }

  return getSingleCssVar<T>(elem, name);
}

/**
 * Builds an object with the keys equal to the specified CSS variable `names` and
 * the value equal to the corresponding variable value in the specified `target`.
 * If no `target` is specified, gets the variable value from {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is excluded from the return value.
 *
 * @template T Shape of CSS variables object to return.
 *
 * @param names Names of the variable to get value for.
 * @param [target] Optional Element, EventTarget, or CSS selector for element from
 *                 which to get CSS variable.
 *
 * @returns Object with specified names as keys and corresponding CSS variable values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
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
 */
export function getCssVars<T extends CssVars = CssVars>(
  names: KeysOf<T>,
  target?: ElemOrCssSelector,
): Partial<T> {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get CSS variables ${formatForError(names)}`);
  }

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
  if (!CssVarName.is(name)) {
    // prettier-ignore
    throw new CssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const value = window.getComputedStyle(element).getPropertyValue(name);
  if (value === "") {
    return undefined;
  } else {
    return parseDOMValue<T>(value);
  }
}
