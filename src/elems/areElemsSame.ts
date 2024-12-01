import type { ElemOrCssSelector, OneOrManyOf } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the Element, EventTarget, or CSS selector instance(s) specified
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
 */
export function areElemsSame(
  left: OneOrManyOf<ElemOrCssSelector>,
  right: ElemOrCssSelector,
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

function isSameAs(left: ElemOrCssSelector, right: ElemOrCssSelector): boolean {
  const sourceElem = toElem(left);
  const targetElem = toElem(right);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem === targetElem;
}
