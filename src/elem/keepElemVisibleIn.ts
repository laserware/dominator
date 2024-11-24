import { elemOrThrow } from "../internal/elemOrThrow.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Ensures the given `target` is within the visible scroll area of the specified
 * `parent`. If the `target` is not visible, scroll the `parent`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param parent Element, Element, or selector for scroll parent.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function keepElemVisibleIn(
  target: ElemOrCssSelector,
  parent: ElemOrCssSelector,
): void {
  // prettier-ignore
  const scrollElem = elemOrThrow(parent, "Unable to keep element visible in parent");
  const activeElem = elemOrThrow(target, "Unable to keep target visible");

  const isAbove = activeElem.offsetTop < scrollElem.scrollTop;
  const isBelow =
    activeElem.offsetTop + scrollElem.offsetHeight >
    scrollElem.scrollTop + scrollElem.offsetHeight;

  let yScroll = 0;

  if (isAbove) {
    yScroll = activeElem.offsetTop;
  } else if (isBelow) {
    yScroll =
      activeElem.offsetTop - scrollElem.offsetHeight + activeElem.offsetHeight;
  } else {
    return;
  }

  scrollElem.scrollTo(0, yScroll);
}
