import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector, Maybe, NullOr, Primitive } from "../types.ts";

import { toAttrValue } from "./conversions.ts";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 */
export function setAttr<E extends Element = HTMLElement>(
  input: NullOr<ElemOrCssSelector>,
  name: string,
  value: Maybe<Primitive>,
): NullOr<E> {
  const elem = toElem<E>(input);
  if (elem === null) {
    return null;
  }

  elem.setAttribute(name, toAttrValue(value) ?? "");

  return elem;
}
