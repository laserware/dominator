import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the source element(s) and target elements match.
 *
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true if _one_ of the elements matches the
 *               target element input.
 * @param target Element input to compare against.
 */
export function areSame(
  source: NullOr<ElemOrCssSelector | ElemOrCssSelector[]>,
  target: NullOr<ElemOrCssSelector>,
): boolean {
  if (Array.isArray(source)) {
    for (const item of source) {
      if (isSameAs(item, target)) {
        return true;
      }
    }

    return false;
  } else {
    return isSameAs(source, target);
  }
}

function isSameAs(
  source: NullOr<ElemOrCssSelector>,
  target: NullOr<ElemOrCssSelector>,
): boolean {
  const sourceElem = toElem(source);
  const targetElem = toElem(target);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem === targetElem;
}
