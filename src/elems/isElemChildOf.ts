import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Determines if the specified `child` is a child of the specified `parent`
 * in the DOM.
 *
 * Note that it returns `false` if the `parent` and `child` match.
 * If you want to check if an element is a descendent or the same as a parent,
 * use {@linkcode isElemSameOrChildOf}.
 *
 * @remarks
 * This function doesn't throw if the specified `child` and/or `parent` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param child Element, EventTarget, or CSS selector for child.
 * @param parent Element, EventTarget, or CSS selector for parent.
 *
 * @returns `true` if the specified `child` is a child of the specified `parent`.
 *
 * @category Elems
 */
export function isElemChildOf(
  child: ElemOrCssSelector,
  parent: ElemOrCssSelector,
): boolean {
  const parentElem = toElem(parent);
  const childElem = toElem(child, parentElem);

  if (childElem === null || parentElem === null) {
    return false;
  }

  if (childElem === parentElem) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  return parentElem.contains(childElem);
}