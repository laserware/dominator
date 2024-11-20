import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { areElemsSame } from "./areElemsSame.ts";
import { isElemChildOf } from "./isElemChildOf.ts";

/**
 * Returns true if the specified target is the same or a child of the specified
 * parent element.
 *
 * @param child `Element`, `EventTarget`, or CSS selector.
 * @param parent `Element`, `EventTarget`, or CSS selector for parent (or same) element.
 * @param [options] Options for checking for parent.
 * @prop [options.maxDepth=10] Maximum depth to perform search.
 */
export function isElemSameOrChildOf(
  child: NullOr<ElemOrCssSelector>,
  parent: NullOr<ElemOrCssSelector>,
  options?: { maxDepth: number },
): boolean {
  // Return immediately if the is same check passes, so we don't have to
  // iterate through the DOM if we don't need to:
  if (areElemsSame(child, parent)) {
    return true;
  } else {
    return isElemChildOf(child, parent, options);
  }
}
