import { elemOrThrow } from "../internal/elemOr.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` is currently scrollable.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the `target` is scrollable, otherwise `false`.
 */
export function isElemScrollable(target: ElemOrCssSelector): boolean {
  const elem = elemOrThrow(target, "Unable to check if target is scrollable");

  try {
    return elem.clientHeight < elem.scrollHeight;
  } catch {
    return false;
  }
}
