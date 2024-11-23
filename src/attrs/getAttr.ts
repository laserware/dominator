import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { toAttrValue } from "../internal/toAttrValue.ts";
import type {
  AttrName,
  AttrValue,
  ElemOrCssSelector,
  NullOr,
} from "../types.ts";

type AttrsFor<NS extends readonly AttrName[]> = {
  [N in NS[number]]: NullOr<AttrValue>;
};

/**
 * Returns the value of the specified attribute `name` in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, returns
 * `null` or the specified `defaultValue`.
 *
 * @template V Type of value to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 * @param [defaultValue] Optional default value to return if the attribute is not found.
 */
export function getAttr<V extends AttrValue = string>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
  defaultValue?: V,
): NullOr<V> {
  const elem = toElem(target);

  if (elem === null) {
    return defaultValue ?? null;
  }

  return getSingleAttr<V>(elem, name, defaultValue);
}

/**
 * Returns an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is set to `null`.
 *
 * @template NS Names of the attributes for which to find values.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 */
export function getAttrs<NS extends AttrName[]>(
  target: NullOr<ElemOrCssSelector>,
  names: NS,
): AttrsFor<NS> {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    throw new InvalidElemError("Unable to get attributes");
  }

  const attrs: AttrsFor<NS> = {} as AttrsFor<NS>;

  for (const name of names) {
    // @ts-ignore
    attrs[name] = getSingleAttr(elem, name);
  }

  return attrs;
}

function getSingleAttr<V extends AttrValue = string>(
  elem: HTMLElement,
  name: AttrName,
  defaultValue?: V,
): NullOr<V> {
  const attrValue = elem.getAttribute(name);

  if (attrValue === null) {
    return defaultValue ?? null;
  } else {
    return toAttrValue<V>(attrValue);
  }
}
