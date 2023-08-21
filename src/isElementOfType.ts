import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element matches the specified type.
 * @param element Element, Event, or selector for element
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.)
 */
export function isElementOfType(
  element: ElementOrSelectorInput | null,
  tagName: string,
): boolean {
  try {
    const validElement = getValidElement(element);

    return validElement?.tagName?.toLowerCase() === tagName;
  } catch {
    return false;
  }
}
