/* istanbul ignore file -- @preserve: It's impossible to test this because of JSDOM. */

import { elemOrThrow } from "../internal/elemOr.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` is currently scrollable.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is scrollable.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @category Elems
 */
export function isElemScrollable(target: ElemOrCssSelector): boolean {
  const elem = elemOrThrow(target, "Unable to check if target is scrollable");

  // prettier-ignore
  return elem.clientHeight < elem.scrollHeight || elem.clientWidth < elem.scrollWidth;
}