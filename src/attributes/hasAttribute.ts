import { getValidElement } from "../getValidElement.ts";
import type { ElementOrSelectorInput } from "../types.ts";

/**
 * Returns true if the specified element has the specified attribute.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param name Name of the attribute to check for.
 */
export function hasAttribute(
  element: ElementOrSelectorInput | null,
  name: string,
): boolean {
  return getValidElement(element)?.hasAttribute(name) ?? false;
}
