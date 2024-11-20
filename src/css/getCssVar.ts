import { isNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Returns the value associated with the specified CSS variable `name`. If
 * no `target` is specified, gets the variable value from the `:root` element.
 * Returns the `defaultValue` if the property doesn't exist..
 *
 * @param name Name of the variable to get value for.
 * @param [defaultValue=undefined] Optional default value to fall back to if not found.
 * @param [target] Optional `Element`, `EventTarget`, or CSS selector for element from
 *                 which to get CSS variable.
 *
 * @throws {CssVarError} If the property doesn't exist and no `defaultValue` specified.
 */
export function getCssVar<T>(
  name: string,
  defaultValue: T | undefined = undefined,
  target?: NullOr<ElemOrCssSelector>,
): T {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new CssVarError(`Unable to get CSS variable: ${name}`);
  }

  try {
    const value = window.getComputedStyle(elem).getPropertyValue(name);

    const parsedValue = Number.parseFloat(value);
    if (Number.isNaN(parsedValue)) {
      return value as unknown as T;
    }

    return parsedValue as unknown as T;
  } catch {
    if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      // prettier-ignore
      throw new CssVarError(`Unable to get CSS variable ${name} and no default value defined`);
    }
  }
}
