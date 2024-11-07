import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type { Attrs, ElemOrCssSelector, NullOr } from "../types.ts";

import { setAttr } from "./setAttr.ts";

/**
 * Sets the attributes of the specified element to the specified attributes
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function setAttrs(input: NullOr<ElemOrCssSelector>, attrs: Attrs): void {
  const elem = toElem(input);

  if (elem === null) {
    throw new InvalidElemError("Unable to set attributes");
  }

  for (const name of Object.keys(attrs)) {
    setAttr(elem, name, attrs[name]);
  }
}
