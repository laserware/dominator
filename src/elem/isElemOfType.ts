import type { AnyElementTagName, ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified `target` matches the specified `tag`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param tag Tag name to check for (e.g. `div`, `span`, etc.).
 */
export function isElemOfType(
  target: NullOr<ElemOrCssSelector>,
  tag: AnyElementTagName,
): boolean {
  try {
    const elem = toElem(target);

    return elem?.tagName?.toLowerCase() === tag.toLowerCase();
  } catch {
    return false;
  }
}
