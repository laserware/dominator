import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Ensures a given child element is within the parent's visible scroll area. If
 * the child is not visible, scroll the parent.
 */
export function maintainElementScrollVisibility(
  activeElement: ElementInput,
  scrollParent: ElementInput,
): void {
  const validScrollElement = asElement(scrollParent, {
    useCurrentTarget: false,
  });
  if (validScrollElement === null) {
    return;
  }

  const validActiveElement = asElement(activeElement, {
    useCurrentTarget: false,
  });
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
