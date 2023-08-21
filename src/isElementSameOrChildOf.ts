import { hasParentElement } from "./hasParentElement.js";
import { isElementSameAs } from "./isElementSameAs.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element is the same or a child of the specified
 * parent element.
 * @param element Element, Event, or selector for element
 * @param parent Element, Event, or selector for parent (or same) element
 */
export function isElementSameOrChildOf(
  element: ElementOrSelectorInput | null,
  parent: ElementOrSelectorInput | null,
): boolean {
  // Return immediately if the is same check passes, so we don't have to
  // iterate through the DOM if we don't need to:
  if (isElementSameAs(element, parent)) {
    return true;
  } else {
    return hasParentElement(element, parent);
  }
}
