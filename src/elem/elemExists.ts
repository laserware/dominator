import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified `target` exists in the DOM.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 */
export function elemExists(target: NullOr<ElemOrCssSelector>): boolean {
  return toElem(target) !== null;
}
