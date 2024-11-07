import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element is currently scrollable.
 *
 * @param element Element, EventTarget, or selector for element.
 */
export function isScrollable(element: NullOr<ElemOrCssSelector>): boolean {
  const elem = toElem<HTMLElement>(element);
  if (elem === null) {
    return false;
  }

  try {
    return elem.clientHeight < elem.scrollHeight;
  } catch {
    return false;
  }
}
