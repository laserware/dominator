import { getValidElement } from "./getValidElement.ts";
import type { ElemOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified element matches the specified type.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.).
 */
export function isElementOfType(
  element: ElemOrSelectorInput | null,
  tagName: string,
): boolean {
  try {
    const validElement = getValidElement(element);

    return validElement?.tagName?.toLowerCase() === tagName;
  } catch {
    return false;
  }
}
