import { isNil } from "@laserware/arcade";

import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the specified `target` exists in the DOM.
 *
 * @remarks
 * We allow `null` or `undefined` as well because a `null` or `undefined`
 * element technically doesn't exist.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` exists.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <ul>
 *   <li id="item-1">Item 1</li>
 *   <li id="item-2">Item 2</li>
 * </ul>
 * ```
 *
 * **Code**
 *
 * ```ts
 * elementExists("#item-1");
 * // true
 *
 * elementExists(findElement("#item-1"));
 * // true
 *
 * elementExists("#item-3");
 * // false
 * ```
 */
export function elementExists(target: Target | null | undefined): boolean {
  if (isNil(target)) {
    return false;
  }

  const element = toElement(target);
  if (element === null) {
    return false;
  }

  return document.contains(element);
}
