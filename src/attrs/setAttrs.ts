import { asElem } from "../elem/asElem.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatList } from "../internal/formatList.ts";
import { stringifyDOMValue } from "../internal/stringifyDOMValue.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
  NilOr,
  NullOr,
} from "../types.ts";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string. Returns the Element representation
 * of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function setAttr<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
  value: NilOr<AttrValue>,
): E {
  const elem = elemOrThrow(target, `Unable to set attribute ${name}`);

  setSingleAttr(elem, name, value);

  return asElem<E>(elem);
}

/**
 * Sets the attributes of the specified `target` to the specified `attrs`
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value. Returns the Element representation of the
 * specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param attrs Object with key of attribute name and value of attribute value.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function setAttrs<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  attrs: Attrs,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set attributes ${formatList(attrs)}`);

  for (const name of Object.keys(attrs)) {
    setSingleAttr(elem, name, attrs[name]);
  }

  return asElem<E>(elem);
}

function setSingleAttr(
  elem: HTMLElement,
  name: string,
  value: NilOr<AttrValue>,
): void {
  const attrValue = stringifyDOMValue(value);

  if (attrValue === undefined) {
    elem.removeAttribute(name);
  } else {
    elem.setAttribute(name, attrValue);
  }
}
