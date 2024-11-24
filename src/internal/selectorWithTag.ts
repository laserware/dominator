import { isNil } from "@laserware/arcade";

import type { AnyElementTagName, CssSelector, NilOr } from "../types.ts";

/**
 * Returns a {@linkcode CssSelector} that includes the optional `tag`. If the
 * `tag` is `null` or `undefined`, it is omitted from the selector.
 *
 * This is used internally to ensure any functions that return CSS selectors
 * and accept an optional `tag` return a valid selector.
 *
 * @param selector CSS selector to prefix with specified `tag`.
 * @param [tag] Optional tag to prepend to the specified `selector`.
 */
export function selectorWithTag(
  selector: CssSelector,
  tag?: NilOr<AnyElementTagName>,
): CssSelector {
  if (isNil(tag)) {
    return selector;
  } else {
    return `${tag}${selector}`;
  }
}
