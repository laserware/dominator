import type { ElementOf, TagName } from "../dom.ts";

import { toElem } from "./toElem.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the `target` matches the specified `tagName`. If the `target`
 * doesn't exist or is invalid, returns `false`.
 *
 * @remarks
 * You can't `UPPERCASE` the `tagName` without getting a type error. That's because
 * this function converts it to lowercase before checking.
 *
 * @template TN Tag name of element representation of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.).
 *
 * @returns `true` if the `target` is of type `tagName`.
 */
export function isElemOfType<TN extends TagName>(
  target: Target,
  tagName: TN,
): target is ElementOf<TN> {
  const elem = toElem(target);

  return elem?.tagName?.toLowerCase() === tagName.toLowerCase();
}
