import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the source element(s) and target elements match.
 *
 * @param left Single element input or array of element inputs to check; if
 *             an array, returns true if _one_ of the elements matches the
 *             target element input.
 * @param right Element input to compare against.
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
