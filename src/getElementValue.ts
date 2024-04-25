import { getValidElement } from "./getValidElement.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns the value of the specified element.
 * @param element Element, Event, or selector for element
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
