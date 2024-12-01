import type { OneOrManyOf } from "../types.ts";

import { toElem } from "./toElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

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
 */
export function areElemsDifferent(
  left: OneOrManyOf<ElemOrCssSelector>,
  right: ElemOrCssSelector,
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

function isDifferentFrom(
  left: ElemOrCssSelector,
  right: ElemOrCssSelector,
): boolean {
  const sourceElem = toElem(left);
  const targetElem = toElem(right);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem !== targetElem;
}
