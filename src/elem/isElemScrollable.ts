import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified `target` is currently scrollable.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 */
export function isElemScrollable(target: NullOr<ElemOrCssSelector>): boolean {
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
