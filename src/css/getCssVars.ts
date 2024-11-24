import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type { CssVarName, CssVarValue, ElemOrCssSelector } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Attempts to get the value associated with the specified CSS variable `name`. If
 * no `target` is specified, gets the variable value from {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`). Returns the `fallback` if the property doesn't exist.
 *
 * Attempts to coerce the value to a numeric value if number-like, or a boolean
 * if `"true"` or `"false"`. All CSS variables are technically strings, but it's
 * nice to get/set the actual type without worrying about string conversion first.
 *
 * @remarks
 * The function throws if the `target` doesn't exist, rather than just falling
 * back to the `:root` element. If you specify a `target`, you want to explicitly
 * set the CSS variable on that `target`.
 *
 * @template T Type of value to return.
 *
 * @param name Name of the variable to get value for.
 * @param [fallback=undefined] Optional fallback value to return if not found.
 * @param [target] Optional Element, EventTarget, or CSS selector for element from
 *                 which to get CSS variable.
 *
 * @returns Value associated with the specified `name` or `fallback` if specified.
 *
 * @throws {CssVarError} If the property doesn't exist and no `fallback` specified.
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function getCssVar<T extends CssVarValue>(
  name: CssVarName,
  fallback: T | undefined = undefined,
  target?: ElemOrCssSelector,
): T {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new InvalidElemError(`Unable to get CSS variable ${name}`);
  }

  try {
    const value = window.getComputedStyle(elem).getPropertyValue(name);

    const parsedValue = Number.parseFloat(value);
    if (Number.isNaN(parsedValue)) {
      return value as unknown as T;
    }

    return parsedValue as unknown as T;
  } catch {
    if (fallback !== undefined) {
      return fallback;
    } else {
      // prettier-ignore
      throw new CssVarError(`Unable to get CSS variable ${name} and no fallback defined`);
    }
  }
}
