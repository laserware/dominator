import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element elemExists in the DOM.
 *
 * @param target Element, EventTarget, or selector for element.
 */
export function elemExists(target: NullOr<ElemOrCssSelector>): boolean {
  return toElem(target) !== null;
}
