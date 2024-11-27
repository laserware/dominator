import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { AttrName, ElemOrCssSelector } from "../types.ts";

/**
 * Removes the specified attribute `name` from the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Attributes
 */
export function removeAttr<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: AttrName<E>,
): E {
  const elem = elemOrThrow(target, `Unable to remove attribute ${name}`);

  elem.removeAttribute(name);

  return cast<E>(elem);
}

/**
 * Removes the attributes with `names` from specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of attribute names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Attributes
 */
export function removeAttrs<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  names: AttrName<E>[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove attributes ${formatForError(names)}`);

  for (const name of names) {
    elem.removeAttribute(name);
  }

  return cast<E>(elem);
}
