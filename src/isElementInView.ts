import { getValidElement } from "./getValidElement.ts";
import { InvalidElementError } from "./InvalidElementError.ts";
import type { ElemOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified element is visible in browser viewport.
 *
 * @param element Element, EventTarget, or selector for element.
 */
export function isElementInView(element: ElemOrSelectorInput): boolean {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError("Unable to determine if element is in view");
  }

  const { top, left, bottom, right } = validElement.getBoundingClientRect();

  const { documentElement } = document;

  const viewportHeight = window.innerHeight || documentElement.clientHeight;
  const viewportWidth = window.innerWidth || documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= viewportHeight && right <= viewportWidth
  );
}
