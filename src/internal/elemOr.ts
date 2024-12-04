import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import { InvalidElemError } from "../elems/InvalidElemError.ts";
import { toElem } from "../elems/toElem.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";

/**
 * Returns an element of type `TN` that corresponds to the specified `target`.
 * Throws if the `target` isn't a valid element.
 *
 * @internal
 *
 * @template TN Tag name specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param error Error message to include with the error.
 *
 * @returns Element representation of the specified `target`.
 */
export function elemOrThrow<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  error: string,
): ElementOf<TN> {
  const elem = toElem(target);

  if (elem === null) {
    throw new InvalidElemError(error);
  }

  return cast<ElementOf<TN>>(elem);
}
