import { asElem } from "../elem/asElem.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { AttrName, ElemOrCssSelector } from "../types.ts";

/**
 * Removes the specified attribute `name` from the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to remove.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeAttr<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  name: AttrName,
): E {
  const elem = elemOrThrow(target, `Unable to remove attribute ${name}`);

  elem.removeAttribute(name);

  return asElem<E>(elem);
}

/**
 * Removes the attributes with `names` from specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of attribute names to remove.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeAttrs<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  names: AttrName[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove attributes ${formatForError(names)}`);

  for (const name of names) {
    elem.removeAttribute(name);
  }

  return asElem<E>(elem);
}
