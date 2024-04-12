import { getValidElement } from "../getValidElement.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Returns true if the specified element has the specified attribute.
 * @param element Element, Event, or selector for element
 * @param name Name of the attribute to check for
 */
export function hasAttribute(
  element: ElementOrSelectorInput | null,
  name: string,
): boolean {
  return getValidElement(element)?.hasAttribute(name) ?? false;
}
