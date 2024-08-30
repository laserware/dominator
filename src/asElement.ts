import { canBeElement } from "./typeGuards.ts";
import type { ElemInput } from "./types.ts";

/**
 * Returns an element of type T for the specified Element or Event. This function
 * is useful to prevent TypeScript from complaining about an invalid or unknown
 * element.
 *
 * @param element Element or EventTarget to assert as an Element.
 */
export function asElement<T extends Element = HTMLElement>(
  element: ElemInput | null,
): T | null {
  if (element === null) {
    return null;
  }

  // The element is a valid HTML element or document, so we return it.
  if (canBeElement(element)) {
    return element as unknown as T;
  }

  return null;
}
