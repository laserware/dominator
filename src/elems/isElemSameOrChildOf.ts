import { areElemsSame } from "./areElemsSame.ts";
import { isElemChildOf } from "./isElemChildOf.ts";
import type { ElemOrCssSelector } from "./types.ts";

/**
 * Checks if the `target` is the same or a child element of the `parent`.
 *
 * @remarks
 * This function doesn't throw if the specified `child` and/or `parent` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param child Element, EventTarget, or CSS selector.
 * @param parent Element, EventTarget, or CSS selector for parent (or same) element.
 *
 * @returns `true` if the `child` is a child of or the same as the specified `parent`.
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
