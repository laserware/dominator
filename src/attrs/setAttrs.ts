import { asElem } from "../elem/asElem.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
} from "../types.ts";

/**
 * Sets the specified attribute `target` of the specified `target` to the specified
 * `value`. The `value` is coerced to a string.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setAttr<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  name: AttrName,
  value: AttrValue | null | undefined,
): E {
  const elem = elemOrThrow(target, `Unable to set attribute ${name}`);

  setSingleAttr(elem, name, value);

  return asElem<E>(elem);
}

/**
 * Sets the attributes of the specified `target` to the specified `attrs`
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param attrs Object with key of attribute name and value of attribute value.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setAttrs<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  attrs: Attrs,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set attributes ${formatForError(attrs)}`);

  for (const name of Object.keys(attrs)) {
    setSingleAttr(elem, name, attrs[name]);
  }

  return asElem<E>(elem);
}

function setSingleAttr(
  element: HTMLElement,
  name: string,
  value: AttrValue | null | undefined,
): void {
  const attrValue = stringifyDOMValue(value);

  if (attrValue === undefined) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, attrValue);
  }
}
