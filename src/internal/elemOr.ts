import { cast } from "@laserware/arcade";

import { InvalidElemError } from "../elems/InvalidElemError.ts";
import { toElem } from "../elems/toElem.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";

/**
 * Returns an element of type `E` that corresponds to the specified `target`.
 * Throws if the `target` isn't a valid element.
 *
 * @internal
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param error Error message to include with the error.
 *
 * @returns Element representation of the specified `target`.
 */
export function elemOrThrow<E extends Element = HTMLElement>(
  target: ElemOrCssSelector<E>,
  error: string,
): E {
  const elem = toElem(target);

  if (elem === null) {
    throw new InvalidElemError(error);
  }

  return cast<E>(elem);
}
