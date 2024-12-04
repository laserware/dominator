import { toElementOrThrow } from "../internal/elemOr.ts";

import type { Target } from "./types.ts";

/**
 * Checks if the `target` is visible in the browser viewport.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is in the viewport.
 *
 * @throws {@linkcode InvalidElemError} if the specified `target` wasn't found.
 */
export function isElemInViewport(target: Target): boolean {
  const elem = toElementOrThrow(
    target,
    "Unable to determine if element is in view",
  );

  const { top, left, bottom, right } = elem.getBoundingClientRect();

  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  // prettier-ignore
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  return top >= 0 && left >= 0 && bottom <= viewHeight && right <= viewWidth;
}
