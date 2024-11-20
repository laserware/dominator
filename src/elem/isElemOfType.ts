import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified target matches the specified type.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.).
 */
export function isElemOfType(
  target: NullOr<ElemOrCssSelector>,
  tagName: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
): boolean {
  try {
    const elem = toElem(target);

    return elem?.tagName?.toLowerCase() === tagName.toLowerCase();
  } catch {
    return false;
  }
}
