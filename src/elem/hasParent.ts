import { isNil } from "@laserware/arcade";

import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Iterates up through the DOM tree from the child element and returns true
 * if the parent of the element matches the parent specified.
 *
 * @param child Element, Event, or selector for element to check.
 * @param parent Element, Event, or selector for parent element.
 * @param [options] Options for checking for parent.
 * @prop [options.maxDepth=10] Maximum depth to perform search.
 */
export function hasParent(
  child: NullOr<ElemOrCssSelector>,
  parent: NullOr<ElemOrCssSelector>,
  options: { maxDepth: number } = { maxDepth: 10 },
): boolean {
  const parentElem = toElem(parent);
  const childElement = toElem(child, parentElem);

  if (childElement === null || parentElem === null) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  if (parentElem?.contains(childElement)) {
    return true;
  }

  let currentDepth = 0;

  return recurseSearch(childElement);

  /**
   * Iterate down the DOM (starting with the parent element) to try locating
   * the element.
   * @param element Parent element in which to perform search
   */
  function recurseSearch(element: HTMLElement): boolean {
    currentDepth += 1;

    if (currentDepth === options.maxDepth) {
      return false;
    }

    if (isNil(element.parentElement)) {
      return false;
    }

    if (element.parentElement === parentElem) {
      return true;
    }

    return recurseSearch(element.parentElement);
  }
}
