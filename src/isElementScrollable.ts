import { getValidElement } from "./getValidElement.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified element is currently scrollable.
 * @param element Element, EventTarget, or selector for element
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
