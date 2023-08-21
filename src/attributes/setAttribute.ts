import { getValidElement } from "../getValidElement.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string.
 * @param element Element, event, or selector to set attribute of
 * @param name Name of the attribute to set
 * @param value Value to set for the attribute
 */
export function setAttribute(
  element: ElementOrSelectorInput | null,
  name: string,
  value: boolean | number | string,
): boolean {
  const validElement = getValidElement(element);
  if (validElement === null) {
    return false;
  }

  validElement.setAttribute(name, value.toString());

  return true;
}
