import { isNil } from "@laserware/arcade";

import { toElem } from "./toElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

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
 * elemExists("#item-1");
 * // true
 *
 * elemExists(findElem("#item-1"));
 * // true
 *
 * elemExists("#item-3");
 * // false
 * ```
 */
export function elemExists(
  target: ElemOrCssSelector | null | undefined,
): boolean {
  if (isNil(target)) {
    return false;
  }

  const elem = toElem(target);
  if (elem === null) {
    return false;
  }

  return document.contains(elem);
}
