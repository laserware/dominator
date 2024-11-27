import type {
  ElementWithTagName,
  ElemOrCssSelector,
  TagName,
} from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Checks if the specified `target` matches the specified `tag`. If the specified
 * `target` doesn't exist or is invalid, returns `false`.
 *
 * @remarks
 * You can't `UPPERCASE` the tag name without getting a type error. That's because
 * this function converts it to lowercase before checking.
 *
 * @template TN Tag name of Element to check for.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param tag Tag name to check for (e.g. `div`, `span`, etc.).
 *
 * @returns `true` if the specified `target` is of type `tag`.
 *
 * @group Elements
 */
export function isElemOfType<TN extends TagName>(
  target: ElemOrCssSelector,
  tag: TN,
): target is ElementWithTagName<TN> {
  const elem = toElem(target);

  return elem?.tagName?.toLowerCase() === tag.toLowerCase();
}
