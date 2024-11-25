import type { AnyElementTagName, ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Checks if the specified `target` matches the specified `tag`.
 *
 * @remarks
 * You can't `UPPERCASE` the tag name without getting a type error. That's because
 * this function converts it to lowercase before checking.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param tag Tag name to check for (e.g. `div`, `span`, etc.).
 *
 * @returns `true` if the specified `target` is of type `tag`.
 */
export function isElemOfType(
  target: ElemOrCssSelector,
  tag: AnyElementTagName,
): boolean {
  try {
    const elem = toElem(target);

    return elem?.tagName?.toLowerCase() === tag.toLowerCase();
  } catch {
    return false;
  }
}
