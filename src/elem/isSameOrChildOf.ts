import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { areSame } from "./areSame.ts";
import { hasParent } from "./hasParent.ts";

/**
 * Returns true if the specified element is the same or a child of the specified
 * parent element.
 *
 * @param child Element, EventTarget, or selector for element.
 * @param parent Element, EventTarget, or selector for parent (or same) element.
 */
export function isSameOrChildOf(
  child: NullOr<ElemOrCssSelector>,
  parent: NullOr<ElemOrCssSelector>,
): boolean {
  // Return immediately if the is same check passes, so we don't have to
  // iterate through the DOM if we don't need to:
  if (areSame(child, parent)) {
    return true;
  } else {
    return hasParent(child, parent);
  }
}
