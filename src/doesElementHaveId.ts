import { getValidElement } from "./getValidElement.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified element has the specified ID property.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param id ID to check for element.
 */
export function doesElementHaveId(
  element: ElementOrSelectorInput,
  id: string,
): boolean {
  const validElement = getValidElement<HTMLInputElement>(element);
  if (validElement === null) {
    return false;
  }

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return validElement.id === validId;
}
