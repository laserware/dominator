import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Ensures the given `target` is within the visible scroll area of the specified
 * `parent`. If the `target` is not visible, scroll the `parent`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param parent `Element`, `EventTarget`, or selector for scroll parent.
 */
export function keepElemVisibleIn(
  target: ElemOrCssSelector,
  parent: ElemOrCssSelector,
): void {
  const scrollElem = toElem(parent);
  if (scrollElem === null) {
    return;
  }

  const activeElem = toElem(target);
  if (activeElem === null) {
    return;
  }

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
