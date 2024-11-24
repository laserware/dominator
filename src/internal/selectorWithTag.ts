import { isNil } from "@laserware/arcade";

import type { AnyElementTagName, CssSelector } from "../types.ts";

/**
 * Builds a {@linkcode CssSelector} from the specified `selector` that includes
 * the optional `tag`. If the `tag` is `null` or `undefined`, it is omitted from
 * the selector.
 *
 * @privateRemarks
 * This is used internally to ensure any functions that return CSS selectors
 * and accept an optional `tag` return a valid selector.
 *
 * @internal
 *
 * @param selector CSS selector to prefix with specified `tag`.
 * @param [tag] Optional tag to prepend to the specified `selector`.
 *
 * @returns CSS selector string that includes the specified `tag` if defined.
 */
export function selectorWithTag(
  selector: CssSelector,
  tag?: AnyElementTagName,
): CssSelector {
  if (isNil(tag)) {
    return selector;
  } else {
    return `${tag}${selector}`;
  }
}
