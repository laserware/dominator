import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Determines if the `child` is a child of the `parent` in the DOM.
 *
 * Note that it returns `false` if the `parent` and `child` match.
 * If you want to check if an element is a descendent or the same as a parent,
 * use {@linkcode isElementSameOrChildOf}.
 *
 * @remarks
 * This function doesn't throw if the `child` and/or `parent` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param child Element, EventTarget, or CSS selector for child.
 * @param parent Element, EventTarget, or CSS selector for parent.
 *
 * @returns `true` if the `child` is a child of the specified `parent`.
 */
export function isElementChildOf(
  child: Target | null,
  parent: Target | null,
): boolean {
  const parentElement = toElement(parent);
  const childElement = toElement(child, parentElement);

  if (childElement === null || parentElement === null) {
    return false;
  }

  if (childElement === parentElement) {
    return false;
  }

  // Use the Node.contains() method first, as this is the most efficient.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
  return parentElement.contains(childElement);
}
