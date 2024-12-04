import { toElementOrThrow } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the `target` is visible in the browser viewport.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is in the viewport.
 *
 * @throws {@linkcode InvalidElementError} if the specified `target` wasn't found.
 */
export function isElementInViewport(target: Target): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, "Cannot determine if element is in view");

  const { top, left, bottom, right } = element.getBoundingClientRect();

  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  // prettier-ignore
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  return top >= 0 && left >= 0 && bottom <= viewHeight && right <= viewWidth;
}
