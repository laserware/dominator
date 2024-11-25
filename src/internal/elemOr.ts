import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Returns an Element of type `E` that corresponds to the specified `target`.
 * Throws if the `target` isn't a valid element.
 *
 * @internal
 *
 * @template T Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param error Error message to include with the error.
 *
 * @returns The Element representation of the specified `target`.
 */
export function elemOrThrow(
  target: ElemOrCssSelector,
  error: string,
): HTMLElement {
  const elem = toElem(target);

  if (elem === null) {
    throw new InvalidElemError(error);
  }

  return elem;
}
