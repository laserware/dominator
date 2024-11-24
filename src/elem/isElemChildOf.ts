import { isNil } from "@laserware/arcade";

import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Iterates up through the DOM tree from the specified `child` target and returns
 * true if the parent of the `child` matches the `parent` specified.
 *
 * Setting a `maxDepth` will limit how much DOM traversal happens. A higher number
 * will require more time to search.
 *
 * @remarks
 * This function doesn't throw if the specified `child` and/or `parent` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param child Element, EventTarget, or CSS selector for child.
 * @param parent Element, EventTarget, or CSS selector for parent.
 * @param [options] Options for checking for parent.
 * @property [options.maxDepth=10] Maximum depth to perform search.
 *
 * @returns `true` if the specified `child` is a child of the specified `parent`, otherwise `false`.
 */
export function isElemChildOf(
  child: ElemOrCssSelector,
  parent: ElemOrCssSelector,
  options: { maxDepth: number } = { maxDepth: 10 },
): boolean {
  const parentElem = toElem(parent);
  const childElem = toElem(child, parentElem);

  if (childElem === null || parentElem === null) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  if (parentElem?.contains(childElem)) {
    return true;
  }

  return searchParentRecursively(childElem, parentElem, 0, options.maxDepth);
}

/**
 * Iterate down the DOM (starting with the parent element) to try locating
 * the element.
 *
 * @internal
 */
// eslint-disable-next-line max-params
function searchParentRecursively(
  elem: HTMLElement,
  parent: HTMLElement,
  currentDepth: number,
  maxDepth: number,
): boolean {
  // TODO: Convert this to use a https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker?
  const nextDepth = currentDepth + 1;

  if (nextDepth === maxDepth) {
    return false;
  }

  if (isNil(elem.parentElement)) {
    return false;
  }

  if (elem.parentElement === parent) {
    return true;
  }

  return searchParentRecursively(
    elem.parentElement,
    parent,
    nextDepth,
    maxDepth,
  );
}
