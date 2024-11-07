import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element matches the specified type.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.).
 */
export function isOfType(
  input: NullOr<ElemOrCssSelector>,
  tagName: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
): boolean {
  try {
    const elem = toElem(input);

    return elem?.tagName?.toLowerCase() === tagName.toLowerCase();
  } catch {
    return false;
  }
}
