import { asElem } from "../elem/asElem.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatList } from "../internal/formatList.ts";
import type { AttrName, ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Removes the specified attribute `name` from the specified `target`. Returns
 * the Element representation of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to remove.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function removeAttr<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
): NullOr<E> {
  const elem = elemOrThrow(target, `Unable to remove attribute ${name}`);

  elem.removeAttribute(name);

  return asElem<E>(elem);
}

/**
 * Removes the attributes with `names` from specified `target`. Returns the
 * Element representation of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of attribute names to remove.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function removeAttrs<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  names: AttrName[],
): NullOr<E> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove attributes ${formatList(names)}`);

  for (const name of names) {
    elem.removeAttribute(name);
  }

  return asElem<E>(elem);
}
