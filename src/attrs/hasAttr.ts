import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Returns true if the specified element has the specified attribute.
 *
 * @param target Element, EventTarget, or selector for element.
 * @param name Name of the attribute to check for.
 */
export function hasAttr(
  target: NullOr<ElemOrCssSelector>,
  name: string,
): boolean {
  return toElem(target)?.hasAttribute(name) ?? false;
}
