import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified element has the specified ID property.
 * Note that you can pass an ID string or CSS selector (e.g. `#some-id`).
 * If your ID starts with `#` and is _not_ a CSS selector, ensure there are
 * two `#` prefixes instead of one.
 *
 * @param target Element, EventTarget, or selector for element.
 * @param id ID to check for element.
 */
export function hasId(target: ElemOrCssSelector, id: string): boolean {
  const element = toElem<HTMLInputElement>(target);
  if (element === null) {
    return false;
  }

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return element.id === validId;
}
