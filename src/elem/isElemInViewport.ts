import type { ElemOrCssSelector } from "../types.ts";

import { InvalidElemError } from "./InvalidElemError.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns true if the specified `target` is visible in browser viewport.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 *
 * @throws {InvalidElemError} If the `target` wasn't found.
 */
export function isElemInViewport(target: ElemOrCssSelector): boolean {
  const elem = toElem(target);
  if (elem === null) {
    throw new InvalidElemError("Unable to determine if element is in view");
  }

  const { top, left, bottom, right } = elem.getBoundingClientRect();

  const { documentElement } = document;

  const viewportHeight = window.innerHeight || documentElement.clientHeight;
  const viewportWidth = window.innerWidth || documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= viewportHeight && right <= viewportWidth
  );
}