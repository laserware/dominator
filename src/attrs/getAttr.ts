import { toElem } from "../elem/toElem.ts";
import { toPrimitiveValue } from "../internal/toPrimitiveValue.ts";
import type {
  AttrName,
  AttrValue,
  ElemOrCssSelector,
  NullOr,
  Attrs, AnyElementAttrName,
} from "../types.ts";
import { InvalidElemError } from "../elem/InvalidElemError.ts";

type AttrNamesToInterface<NS extends readonly AttrName[]> = {
  [N in NS[number]]: N extends AnyElementAttrName ? A;
};

/**
 * Returns the value of the specified attribute `name` in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, returns
 * `null` or the specified `defaultValue`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param name Name of the attribute to get.
 * @param [defaultValue] Optional default value to return if the attribute is not found.
 */
export function getAttr<V extends AttrValue>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
  defaultValue?: V,
): NullOr<V> {
  const elem = toElem(target);

  if (elem === null) {
    return defaultValue ?? null;
  }

  const attrValue = elem.getAttribute(name);
  if (attrValue === null) {
    return defaultValue ?? null;
  }

  return toPrimitiveValue<V>(attrValue);
}

export function getAttr2<N extends AttrName[]>(
  target: NullOr<ElemOrCssSelector>,
  names: N,
): AttrNamesToInterface<N> {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    throw new InvalidElemError("Unable to set attributes");
  }

  const attrs: Attrs = {};

  for (const name of names) {
  }
}
