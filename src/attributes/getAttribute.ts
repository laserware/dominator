import { getValidElement } from "../getValidElement.ts";
import type { ElementOrSelectorInput } from "../types.ts";

/**
 * Returns the value of the specified attribute name in the specified element.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If a default value is
 * specified, returns if not found. Otherwise, it returns null if not found.
 * @param element Element, Event, or selector for element
 * @param name Name of the attribute to get
 * @param [defaultValue] Optional default value to return if the attribute is not found
 */
export function getAttribute<T extends boolean | number | string>(
  element: ElementOrSelectorInput | null,
  name: string,
  defaultValue?: T,
): T | null {
  const validElement = getValidElement(element);
  if (validElement === null) {
    return defaultValue ?? null;
  }

  const attributeValue = validElement.getAttribute(name);
  if (attributeValue === null) {
    return defaultValue ?? null;
  }

  if (attributeValue === "true" || attributeValue === "false") {
    return (attributeValue === "true") as T;
  }

  const numericValue = Number(attributeValue);
  if (Number.isNaN(numericValue)) {
    return attributeValue as T;
  } else {
    return numericValue as T;
  }
}
