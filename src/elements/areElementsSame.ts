import type { OneOrManyOf } from "@laserware/arcade";

import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Returns true if the Element(s), EventTarget(s), or CSS selector(s) specified
 * as `left` and the Element, EventTarget, or CSS selector specified as
 * `right` **do** match.
 *
 * @remarks
 * This function doesn't throw if the specified `left` and/or `right` elements
 * don't exist. Rather, it just returns `false`. This was a deliberate choice.
 *
 *
 * @param left One or many Element, EventTarget, or CSS selectors to check; if
 *             an array, returns true if **one** of the elements matches the
 *             target element input.
 * @param right Element, EventTarget, or CSS selector to compare against.
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
 * areElementsSame(item1, item2);
 * // false
 *
 * areElementsSame(item1, "#item-1");
 * // true
 *
 * areElementsSame(item1, null);
 * // false
 * ```
 */
export function areElementsSame(
  left: OneOrManyOf<Target | null>,
  right: Target | null,
): boolean {
  if (Array.isArray(left)) {
    for (const item of left) {
      if (isSameAs(item, right)) {
        return true;
      }
    }

    return false;
  } else {
    return isSameAs(left, right);
  }
}

function isSameAs(left: Target | null, right: Target | null): boolean {
  const sourceElement = toElement(left);
  const targetElement = toElement(right);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement === targetElement;
}
