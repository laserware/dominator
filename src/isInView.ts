import { toValidElem } from "./internal/toValidElem";
import { InvalidElementError } from "./InvalidElementError";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element is visible in browser viewport.
 *
 * @param input Element, Event, or selector for element.
 */
export function isInView(input: ElemOrSelectInput): boolean {
  const elem = toValidElem(input);
  if (elem === null) {
    throw new InvalidElementError("Unable to determine if element is in view");
  }

  const { top, left, bottom, right } = elem.getBoundingClientRect();

  const { documentElement } = document;

  const viewportHeight = window.innerHeight || documentElement.clientHeight;
  const viewportWidth = window.innerWidth || documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= viewportHeight && right <= viewportWidth
  );
}
