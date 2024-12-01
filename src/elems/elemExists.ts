import { isNil } from "@laserware/arcade";

import { toElem } from "./toElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

/**
 * Checks if the specified `target` exists in the DOM.
 *
 * @remarks
 * We allow `null` or `undefined` as well because a `null` or `undefined`
 * Element technically doesn't exist.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` exists.
 */
export function elemExists(
  target: ElemOrCssSelector | null | undefined,
): boolean {
  if (isNil(target)) {
    return false;
  }

  const elem = toElem(target);
  if (elem === null) {
    return false;
  }

  return document.contains(elem);
}
