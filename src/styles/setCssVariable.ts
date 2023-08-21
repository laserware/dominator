import { isNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.js";
import { InvalidElementError } from "../InvalidElementError.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Sets the specified CSS variable name to the specified value in the optionally
 * specified element. If no element is specified, updates the variable value
 * in `:root`.
 * @param name Name of the variable to update
 * @param value Value of the variable
 * @param [element] Optional Element, Event, or selector for element in which to set CSS variable
 */
export function setCssVariable(
  name: string,
  value: boolean | number | string,
  element?: ElementOrSelectorInput,
): void {
  const validElement = isNil(element)
    ? document.documentElement
    : getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError(`Unable to update CSS variable ${name}`);
  }

  validElement.style.setProperty(name, value.toString());
}
