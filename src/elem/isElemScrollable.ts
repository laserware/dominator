import { elemOrThrow } from "../internal/elemOrThrow.ts";
import type { ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Returns true if the specified `target` is currently scrollable.
 *
 * @param target Element, EventTarget, or CSS selector.
 */
export function isElemScrollable(target: NullOr<ElemOrCssSelector>): boolean {
  const elem = elemOrThrow(target, "Unable to check if target is scrollable");

  try {
    return elem.clientHeight < elem.scrollHeight;
  } catch {
    return false;
  }
}
