import { isNil } from "@laserware/arcade";

import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Iterates up through the DOM tree from the specified `child` target and returns
 * true if the parent of the `child` matches the `parent` specified.
 *
 * @param child `Element`, `EventTarget`, or CSS selector for child.
 * @param parent `Element`, `EventTarget`, or CSS selector for parent.
 * @param [options] Options for checking for parent.
 * @prop [options.maxDepth=10] Maximum depth to perform search.
 */
export function isElemChildOf(
  child: NullOr<ElemOrCssSelector>,
  parent: NullOr<ElemOrCssSelector>,
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
 */
// eslint-disable-next-line max-params
function searchParentRecursively(
  elem: HTMLElement,
  parent: HTMLElement,
  currentDepth: number,
  maxDepth: number,
): boolean {
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
