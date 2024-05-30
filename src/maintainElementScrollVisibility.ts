import { getValidElement } from "./getValidElement.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Ensures a given child element is within the parent's visible scroll area. If
 * the child is not visible, scroll the parent.
 *
 * @param activeElement Element, EventTarget, or selector for active element.
 * @param scrollParent Element, EventTarget, or selector for scroll parent element.
 */
export function maintainElementScrollVisibility(
  activeElement: ElementOrSelectorInput,
  scrollParent: ElementOrSelectorInput,
): void {
  const validScrollElement = getValidElement(scrollParent);
  if (validScrollElement === null) {
    return;
  }

  const validActiveElement = getValidElement(activeElement);
  if (validActiveElement === null) {
    return;
  }

  const { offsetHeight, offsetTop } = validActiveElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = validScrollElement;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  let yScroll: number = 0;

  if (isAbove) {
    yScroll = offsetTop;
  } else if (isBelow) {
    yScroll = offsetTop - parentOffsetHeight + offsetHeight;
  } else {
    return;
  }

  validScrollElement.scrollTo(0, yScroll);
}
