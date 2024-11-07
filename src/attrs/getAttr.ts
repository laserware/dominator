import { toElem } from "../elem/toElem.ts";
import type { AttrValue, ElemOrCssSelector, NullOr } from "../types.ts";

import { toPrimitiveValue } from "./conversions.ts";

/**
 * Returns the value of the specified attribute name in the specified element.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If a default value is
 * specified, returns if not found. Otherwise, it returns null if not found.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param name Name of the attribute to get.
 * @param [defaultValue] Optional default value to return if the attribute is not found.
 */
export function getAttr<V extends AttrValue>(
  input: NullOr<ElemOrCssSelector>,
  name: string,
  defaultValue?: V,
): NullOr<V> {
  const elem = toElem(input);

  if (elem === null) {
    return defaultValue ?? null;
  }

  const attrValue = getAttr(elem, name);
  if (attrValue === null) {
    return defaultValue ?? null;
  }

  return toPrimitiveValue<V>(attrValue);
}
