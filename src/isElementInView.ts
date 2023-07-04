import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Returns true if the specified element is visible in browser viewport.
 */
export function isElementInView(element: ElementInput): boolean {
  const validElement = asElement(element);
  if (validElement === null) {
    throw new Error("Invalid element");
  }

  const { top, left, bottom, right } = validElement.getBoundingClientRect();

  const { documentElement } = document;

  const viewportHeight = window.innerHeight || documentElement.clientHeight;
  const viewportWidth = window.innerWidth || documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= viewportHeight && right <= viewportWidth
  );
}
