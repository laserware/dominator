/* istanbul ignore file -- @preserve: It's impossible to test this because of JSDOM. */

import { toElementOrThrow } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the `target` is currently scrollable.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is scrollable.
 *
 * @throws {@linkcode InvalidElementError} if the specified `target` wasn't found.
 */
export function isElementScrollable(target: Target): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, "Unable to check if target is scrollable");

  // prettier-ignore
  return element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth;
}
