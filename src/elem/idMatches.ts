import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified `target` has the specified `id` *property*.
 * Note that you can pass an ID string or CSS selector (e.g. `#some-id`).
 * If your ID starts with `#` and is *not* a CSS selector, ensure there are
 * two `#` prefixes instead of one.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param id ID to check for element.
 */
export function idMatches(target: ElemOrCssSelector, id: string): boolean {
  const elem = toElem<HTMLInputElement>(target);
  if (elem === null) {
    return false;
  }

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return elem.id === validId;
}
