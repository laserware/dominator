import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type { CssVarName, ElemOrCssSelector, NullOr } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Returns the value associated with the specified CSS variable `name`. If
 * no `target` is specified, gets the variable value from the `:root` element.
 * Returns the `fallback` if the property doesn't exist.
 *
 * @param name Name of the variable to get value for.
 * @param [fallback=undefined] Optional fallback value to return if not found.
 * @param [target] Optional Element, EventTarget, or CSS selector for element from
 *                 which to get CSS variable.
 *
 * @throws {CssVarError} If the property doesn't exist and no `fallback` specified.
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function getCssVar<T>(
  name: CssVarName,
  fallback: T | undefined = undefined,
  target?: NullOr<ElemOrCssSelector>,
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
