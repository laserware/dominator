import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element matches the specified type.
 * @param element Selector, element, or event to check
 * @param tagName Tag name to check for
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
