import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Iterates up through the DOM tree from the child element and returns true
 * if the parent of the element matches the parent specified.
 * @param child Element, Event, or selector for element to check
 * @param parent Element, Event, or selector for parent element
 * @param [options] Options for checking for parent
 * @prop [options.maxDepth=10] Maximum depth to perform search
 */
export function hasParentElement(
  child: ElementOrSelectorInput | null,
  parent: ElementOrSelectorInput | null,
  options: { maxDepth: number } = { maxDepth: 10 },
): boolean {
  const parentElement = getValidElement(parent);
  const childElement = getValidElement(child, parentElement);

  if (childElement === null || parentElement === null) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  if (parentElement?.contains(childElement)) {
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

    if (!element.parentElement) {
      return false;
    }

    if (element.parentElement === parentElement) {
      return true;
    }

    return recurseSearch(element.parentElement);
  }
}
