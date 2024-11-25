import { elemOrThrow } from "../internal/elemOr.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` is visible in the browser viewport.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` is in the viewport.
 *
 * @throws {InvalidElemError} If the `target` wasn't found.
 */
export function isElemInViewport(target: ElemOrCssSelector): boolean {
  const elem = elemOrThrow(target, "Unable to determine if element is in view");

  const { top, left, bottom, right } = elem.getBoundingClientRect();

  const { documentElement } = document;

  const viewportHeight = window.innerHeight || documentElement.clientHeight;
  const viewportWidth = window.innerWidth || documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= viewportHeight && right <= viewportWidth
  );
}
