import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the source element(s) and target elements do not match.
 *
 * @param left Single element input or array of element inputs to check; if
 *             an array, returns true only if _all_ elements don't match the
 *             target element input.
 * @param right Element input to compare against.
 */
export function areDifferent(
  left: NullOr<ElemOrCssSelector | ElemOrCssSelector[]>,
  right: NullOr<ElemOrCssSelector>,
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
  left: NullOr<ElemOrCssSelector>,
  right: NullOr<ElemOrCssSelector>,
): boolean {
  const sourceElem = toElem(left);
  const targetElem = toElem(right);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem !== targetElem;
}
