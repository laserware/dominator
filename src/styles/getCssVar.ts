import { isNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Returns the value associated with the specified CSS variable name. If
 * no element is specified, gets the variable value from the `:root` element.
 *
 * @param name Name of the variable to get value for.
 * @param [defaultValue=undefined] Optional default value to fall back to if not found.
 * @param [input] Optional Element, EventTarget, or selector for element from
 *                which to get CSS variable.
 */
export function getCssVar<T>(
  name: string,
  defaultValue: T | undefined = undefined,
  input?: ElemOrCssSelector,
): T {
  const elem = isNil(input) ? document.documentElement : toElem(input);
  if (elem === null) {
    throw new CssVarError(`Unable to get CSS variable ${name}`);
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
      throw new CssVarError("Could not find CSS variable and no default value defined");
    }
  }
}
