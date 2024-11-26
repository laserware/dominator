import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { ElemOrCssSelector, PropName } from "../types.ts";

/**
 * Removes the specified property `name` from the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the property to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function removeProp<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E>,
): E {
  const elem = elemOrThrow(target, `Unable to remove property ${name}`);

  delete elem[name];

  return cast<E>(elem);
}

/**
 * Removes the properties with `names` from specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of property names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function removeProps<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  names: PropName<E>[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove properties ${formatForError(names)}`);

  for (const name of names) {
    delete elem[name];
  }

  return cast<E>(elem);
}
