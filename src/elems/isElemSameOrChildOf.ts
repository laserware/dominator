import type { ElemOrCssSelector } from "../types.ts";

import { areElemsSame } from "./areElemsSame.ts";
import { isElemChildOf } from "./isElemChildOf.ts";

/**
 * Checks if the specified `target` is the same or a child of the specified
 * `parent`.
 *
 * @remarks
 * This function doesn't throw if the specified `child` and/or `parent` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param child Element, EventTarget, or CSS selector.
 * @param parent Element, EventTarget, or CSS selector for parent (or same) element.
 *
 * @returns `true` if the specified `child` is a child of or the same as the specified `parent`.
 *
 * @category Elems
 */
export function isElemSameOrChildOf(
  child: ElemOrCssSelector,
  parent: ElemOrCssSelector,
): boolean {
  // Return immediately if the is same check passes, so we don't have to
  // iterate through the DOM if we don't need to:
  if (areElemsSame(child, parent)) {
    return true;
  } else {
    return isElemChildOf(child, parent);
  }
}