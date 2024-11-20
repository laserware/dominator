import type { ElemOrCssSelector } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Ensures a given child element is within the parent's visible scroll area. If
 * the child is not visible, scroll the parent.
 *
 * @param target Element, EventTarget, or selector for active element.
 * @param scrollParent Element, EventTarget, or selector for scroll parent element.
 */
export function keepVisibleInParent(
  target: ElemOrCssSelector,
  scrollParent: ElemOrCssSelector,
): void {
  const scrollElem = toElem(scrollParent);
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
