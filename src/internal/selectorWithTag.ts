import { isNil } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { TagName } from "../dom.ts";

/**
 * Builds a {@linkcode CssSelector} from the specified `selector` that includes
 * the optional `tagName`. If the `tagName` is `null` or `undefined`, it is
 * omitted from the selector.
 *
 * @privateRemarks
 * This is used internally to ensure any functions that return CSS selectors
 * and accept an optional `tagName` return a valid selector.
 *
 * @internal
 *
 * @param selector CSS selector to prefix with specified `tagName`.
 * @param [tagName] Optional tagName to prepend to the specified `selector`.
 *
 * @returns CSS selector string that includes the specified `tagName` if defined.
 */
export function selectorWithTag(
  selector: CssSelector,
  tagName?: TagName,
): CssSelector {
  if (isNil(tagName)) {
    return selector;
  } else {
    return `${tagName}${selector}`;
  }
}
