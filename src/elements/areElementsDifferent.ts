import type { OneOrManyOf } from "@laserware/arcade";

import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the Element(s), EventTarget(s), or CSS selector(s) specified
 * as `left` and the Element, EventTarget, or CSS selector specified as
 * `right` do **not** match.
 *
 * @remarks
 * This function doesn't throw if the specified `left` and/or `right` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 * @param left One or many Element, EventTarget, or CSS selectors to check; if
 *             an array, returns `true` only if **all** elements don't match the
 *             target element input.
 * @param right Element, EventTarget, or CSS selector to compare against.
 *
 * @returns `true` if the elements do **not** match.
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
 * const item1 = findElement("#item-1")!;
 * const item2 = findElement("#item-2")!;
 *
 * areElementsDifferent(item1, item2);
 * // true
 *
 * areElementsDifferent(item1, "#item-1");
 * // false
 *
 * areElementsDifferent(item1, null);
 * // false
 * ```
 */
export function areElementsDifferent(
  left: OneOrManyOf<Target | null>,
  right: Target | null,
): boolean {
  if (Array.isArray(left)) {
    // Ensure we bail early if we find an element that is the same:
    for (const item of left) {
      if (!isDifferentFrom(item, right)) {
        return false;
      }
    }

    return true;
  } else {
    return isDifferentFrom(left, right);
  }
}

function isDifferentFrom(left: Target | null, right: Target | null): boolean {
  const sourceElement = toElement(left);
  const targetElement = toElement(right);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement !== targetElement;
}
