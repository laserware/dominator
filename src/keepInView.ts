import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Ensures a given child element is within the parent's visible scroll area. If
 * the child is not visible, scroll the parent.
 *
 * @param input Element, Event, or selector for active element.
 * @param scrollParent Element, Event, or selector for scroll parent element.
 */
export function keepInView(
  input: ElemOrSelectInput,
  scrollParent: ElemOrSelectInput,
): void {
  const scrollElem = toValidElem(scrollParent, "target");
  if (scrollElem === null) {
    return;
  }

  const activeElem = toValidElem(input, "target");
  if (activeElem === null) {
    return;
  }

  const { offsetHeight, offsetTop } = activeElem;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollElem;

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

  scrollElem.scrollTo(0, yScroll);
}
