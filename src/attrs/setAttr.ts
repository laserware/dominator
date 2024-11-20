import { isPlainObject } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import { toAttrValue } from "../internal/toAttrValue.ts";
import type {
  AttrName,
  Attrs,
  ElemOrCssSelector,
  Maybe,
  NullOr,
  Primitive,
} from "../types.ts";

/**
 * Sets the attributes of the specified `target` to the specified `attrs`
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value. Returns the `Element` representation of the
 * specified `target`.
 *
 * @template E Type of `Element` to return.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function setAttr<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  attrs: Attrs,
): NullOr<E>;

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string. Returns the `Element` representation
 * of the specified `target`.
 *
 * @template E Type of `Element` to return.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 */
export function setAttr<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
  value: Maybe<Primitive>,
): NullOr<E>;

export function setAttr<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  nameOrAttrs: string | Attrs,
  value?: Maybe<Primitive>,
): NullOr<E> {
  const elem = toElem<E>(target);
  if (elem === null) {
    return null;
  }

  if (isPlainObject(nameOrAttrs)) {
    for (const name of Object.keys(nameOrAttrs)) {
      elem.setAttribute(name, toAttrValue(nameOrAttrs[name]) ?? "");
    }
  } else {
    elem.setAttribute(nameOrAttrs, toAttrValue(value) ?? "");
  }

  return elem;
}
