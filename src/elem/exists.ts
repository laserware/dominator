import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element input exists in the DOM.
 *
 * @param input Element, EventTarget, or selector for element.
 */
export function exists(input: NullOr<ElemOrCssSelector>): boolean {
  return toElem(input) !== null;
}
