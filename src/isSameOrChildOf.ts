import { hasParent } from "./hasParent";
import { isSameAs } from "./isSameAs";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element is the same or a child of the specified
 * parent element.
 *
 * @param input Element, Event, or selector for element.
 * @param parent Element, Event, or selector for parent (or same) element.
 */
export function isSameOrChildOf(
  input: ElemOrSelectInput | null,
  parent: ElemOrSelectInput | null,
): boolean {
  // Return immediately if the is same check passes, so we don't have to
  // iterate through the DOM if we don't need to:
  if (isSameAs(input, parent)) {
    return true;
  } else {
    return hasParent(input, parent);
  }
}
