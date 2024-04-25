import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { ElementOrSelectorInput } from "../types.ts";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string.
 * @param element Element, Event, or selector for element
 * @param name Name of the attribute to set
 * @param value Value to set for the attribute
 */
export function setAttribute(
  element: ElementOrSelectorInput | null,
  name: string,
  value: boolean | number | string,
): void {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError(`Unable to set attribute ${name}`);
  }

  validElement.setAttribute(name, value.toString());
}
