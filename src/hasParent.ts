import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Iterates up through the DOM tree from the child element and returns true
 * if the parent of the element matches the parent specified.
 *
 * @param child Element, Event, or selector for element to check.
 * @param parent Element, Event, or selector for parent element.
 * @param [maxDepth=10] Maximum depth to perform search.
 */
export function hasParent(
  child: ElemOrSelectInput | null,
  parent: ElemOrSelectInput | null,
  { maxDepth }: { maxDepth: number } = { maxDepth: 10 },
): boolean {
  const parentElem = toValidElem(parent);
  const childElem = toValidElem(child, parentElem);

  if (childElem === null || parentElem === null) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  if (parentElem?.contains(childElem)) {
    return true;
  }

  let currentDepth = 0;

  return recurseSearch(childElem);

  // Iterate down the DOM (starting with the parent element) to try locating
  // the element.
  function recurseSearch(elem: HTMLElement): boolean {
    currentDepth += 1;

    if (currentDepth === maxDepth) {
      return false;
    }

    if (!elem.parentElement) {
      return false;
    }

    if (elem.parentElement === parentElem) {
      return true;
    }

    return recurseSearch(elem.parentElement);
  }
}
