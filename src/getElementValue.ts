import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns the value of the specified element.
 * @param element Element to get the value of
 */
export function getElementValue<T>(
  element: ElementOrSelectorInput | null,
): T | null {
  const validElement = getValidElement<HTMLInputElement>(element);
  if (validElement === null) {
    return null;
  }

  const validValue = validElement?.value ?? null;
  if (validValue === null) {
    return null;
  }

  return validValue as unknown as T;
}
