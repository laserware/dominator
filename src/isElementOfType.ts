import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Returns true if the specified element matches the specified type.
 * @param element Selector, element, or event to check
 * @param tagName Tag name to check for
 */
export function isElementOfType(
  element: ElementInput | null,
  tagName: string,
): boolean {
  try {
    const validElement = asElement(element);

    return validElement?.tagName?.toLowerCase() === tagName;
  } catch {
    return false;
  }
}
