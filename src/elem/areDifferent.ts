import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the source element(s) and target elements do not match.
 *
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true only if _all_ elements don't match the
 *               target element input.
 * @param target Element input to compare against.
 */
export function areDifferent(
  source: NullOr<ElemOrCssSelector | ElemOrCssSelector[]>,
  target: NullOr<ElemOrCssSelector>,
): boolean {
  if (Array.isArray(source)) {
    // Ensure we bail early if we find an element that is the same:
    for (const item of source) {
      if (!isDifferentFrom(item, target)) {
        return false;
      }
    }

    return true;
  } else {
    return isDifferentFrom(source, target);
  }
}

function isDifferentFrom(
  source: NullOr<ElemOrCssSelector>,
  target: NullOr<ElemOrCssSelector>,
): boolean {
  const sourceElem = toElem(source);
  const targetElem = toElem(target);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem !== targetElem;
}
