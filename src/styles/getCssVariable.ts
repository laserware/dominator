import { isNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { ElemOrSelectorInput } from "../types.ts";

/**
 * Returns the value associated with the specified CSS variable name. If
 * no element is specified, gets the variable value from the `:root` element.
 *
 * @param name Name of the variable to get value for.
 * @param [defaultValue=undefined] Optional default value to fall back to if not found.
 * @param [element] Optional Element, EventTarget, or selector for element from which to get CSS variable.
 */
export function getCssVariable<T>(
  name: string,
  defaultValue: T | undefined = undefined,
  element?: ElemOrSelectorInput,
): T {
  const validElement = isNil(element)
    ? document.documentElement
    : getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError(`Unable to get CSS variable ${name}`);
  }

  try {
    const value = window.getComputedStyle(validElement).getPropertyValue(name);

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
      throw new Error("Could not find CSS variable and no default value defined");
    }
  }
}
