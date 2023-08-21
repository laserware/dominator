import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element is currently scrollable.
 * @param element Element, Event, or selector for element
 */
export function isElementScrollable(
  element: ElementOrSelectorInput | null,
): boolean {
  const validElement = getValidElement<HTMLElement>(element);
  if (validElement === null) {
    return false;
  }

  try {
    return validElement.clientHeight < validElement.scrollHeight;
  } catch {
    return false;
  }
}
