import { getValidElement } from "./getValidElement.js";
import { InvalidElementError } from "./InvalidElementError.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element is visible in browser viewport.
 * @param element Element, Event, or selector for element
 */
export function isElementInView(element: ElementOrSelectorInput): boolean {
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
