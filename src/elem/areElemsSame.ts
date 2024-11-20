import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the `Element`, `EventTarget`, or CSS selector instance(s) specified
 * as `left` and the `Element`, `EventTarget`, or CSS selector specified as
 * `right` do *not* match.
 *
 * @param left One or many `Element`, `EventTarget`, or CSS selectors to check; if
 *             an array, returns true if *one* of the elements matches the
 *             target element input.
 * @param right `Element`, `EventTarget`, or CSS selector to compare against.
 */
export function areElemsSame(
  left: NullOr<ElemOrCssSelector | ElemOrCssSelector[]>,
  right: NullOr<ElemOrCssSelector>,
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

function isSameAs(
  left: NullOr<ElemOrCssSelector>,
  right: NullOr<ElemOrCssSelector>,
): boolean {
  const sourceElem = toElem(left);
  const targetElem = toElem(right);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem === targetElem;
}
