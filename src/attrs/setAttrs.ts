import { cast } from "../internal/cast.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  AnyElement,
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
} from "../types.ts";

/**
 * Sets the specified attribute `target` of the specified `target` to the specified
 * `value`. The `value` is coerced to a string.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div id="example" role="slider">...</div>
 * ```
 *
 * @category Attrs
 */
export function setAttr<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: AttrName<E>,
  value: AttrValue | null | undefined,
): E {
  const elem = elemOrThrow(target, `Unable to set attribute ${name}`);

  setSingleAttr(elem, name, value);

  return cast<E>(elem);
}

/**
 * Sets the attributes of the specified `target` to the specified `attrs`
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param attrs Object with key of attribute name and value of attribute value.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @category Attrs
 */
export function setAttrs<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  attrs: Attrs<E>,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set attributes ${formatForError(attrs)}`);

  for (const name of Object.keys(attrs)) {
    setSingleAttr(elem, name, attrs[name]);
  }

  return cast<E>(elem);
}

function setSingleAttr<E extends AnyElement = HTMLElement>(
  element: E,
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