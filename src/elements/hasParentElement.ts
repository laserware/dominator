import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the specified `child` has the specified `parent`. If either element
 * doesn't exist in the DOM, it returns `false`.
 *
 * @param child Element, EventTarget, or CSS selector.
 * @param parent Element, EventTarget, or CSS selector of parent.
 *
 * @returns `true` if the specified `child` is in the specified `parent`.
 */
export function hasParentElement(
  child: Target | null,
  parent: Target | null,
): boolean {
  const parentElement = toElement(parent);
  if (parentElement === null) {
    return false;
  }

  const childElement = toElement(child, parentElement);

  if (childElement === null) {
    return false;
  }

  return parentElement.contains(childElement);
}
