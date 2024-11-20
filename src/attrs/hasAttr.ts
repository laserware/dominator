import { toElem } from "../elem/toElem.ts";
import type { AttrName, ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Returns true if the specified `target` has the specified attribute `name`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param name Name of the attribute.
 */
export function hasAttr(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
): boolean {
  return toElem(target)?.hasAttribute(name) ?? false;
}
