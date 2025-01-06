/* istanbul ignore file -- @preserve: It's impossible to test this because of JSDOM. */

import { toElementOrThrow } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Ensures the given `target` is within the visible scroll area of the specified
 * `parent`. If the `target` is not visible, scroll the `parent`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param parent Element, EventTarget, or selector for scroll parent.
 *
 * @throws {@linkcode InvalidElementError} if the `target` or `parent` specified do not exist.
 */
export function keepElementVisibleIn(
  target: Target | null,
  parent: Target | null,
): void {
  // prettier-ignore
  const activeElement = toElementOrThrow(target, "Cannot keep target visible");

  // prettier-ignore
  const scrollElement = toElementOrThrow(parent, "Cannot keep element visible in parent");

  const isAbove = activeElement.offsetTop < scrollElement.scrollTop;
  const isBelow =
    activeElement.offsetTop + scrollElement.offsetHeight >
    scrollElement.scrollTop + scrollElement.offsetHeight;

  let yScroll = 0;

  if (isAbove) {
    yScroll = activeElement.offsetTop;
  } else if (isBelow) {
    yScroll =
      activeElement.offsetTop -
      scrollElement.offsetHeight +
      activeElement.offsetHeight;
  } else {
    return;
  }

  scrollElement.scrollTo(0, yScroll);
}
