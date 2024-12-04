/* istanbul ignore file -- @preserve: It's impossible to test this because of JSDOM. */

import { toElementOrThrow } from "../internal/elemOr.ts";

import type { Target } from "./types.ts";

/**
 * Checks if the `target` is currently scrollable.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is scrollable.
 *
 * @throws {@linkcode InvalidElemError} if the specified `target` wasn't found.
 */
export function isElemScrollable(target: Target): boolean {
  const elem = toElementOrThrow(
    target,
    "Unable to check if target is scrollable",
  );

  // prettier-ignore
  return elem.clientHeight < elem.scrollHeight || elem.clientWidth < elem.scrollWidth;
}
