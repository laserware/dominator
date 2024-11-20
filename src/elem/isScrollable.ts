import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element is currently scrollable.
 *
 * @param target Element, EventTarget, or selector for element.
 */
export function isScrollable(target: NullOr<ElemOrCssSelector>): boolean {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    return false;
  }

  try {
    return elem.clientHeight < elem.scrollHeight;
  } catch {
    return false;
  }
}
