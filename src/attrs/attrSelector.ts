import { isNil, isPlainObject, kebabCase } from "@laserware/arcade";

import type { AnyElementTagName, Attrs, AttrValue, Maybe } from "../types.ts";

/**
 * Returns a CSS selector string from the attributes object. Note that the values
 * of the attributes object are coerced to a string and null excludes a value
 * but only includes a key.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 * @param [tag] Optional tag name for the element.
 *
 * @example Single Entry With Value
 * const selector = attrSelector({ disabled: true });
 * // `[disabled="true"]`

 * @example Single Entry Without Value
 * const selector = attrSelector({ inert: null });
 * // `[inert]`
 *
 * @example Multiple Entries
 * const selector = attrSelector({ disabled: true, inert: null });
 * // `[disabled="true"][inert]`
 */
export function attrSelector(
  attrs: Attrs,
  tag?: AnyElementTagName | "",
): string;

/**
 * Returns a CSS selector string from the specified name and value. Note that the
 * value is coerced to a string and null excludes a value but only includes a name.
 *
 * @param name Attribute name to include in the selector.
 * @param [value=undefined] Optional attribute value.
 * @param [tag] Optional tag name for the element.
 *
 * @example Name Only
 * const selector = attrSelector("disabled");
 * // `[disabled]`

 * @example Name and Value
 * const selector = attrSelector("disabled", true);
 * // `[disabled="true"]`
 *
 * @example Name, Value, and Tag
 * const selector = attrSelector("disabled", true, "button");
 * // `button[disabled="true"]`
 *
 * @example Name and Tag (No Value)
 * const selector = attrSelector("disabled", undefined, "button");
 * // `button[disabled]`
 */
export function attrSelector(
  name: string,
  value: Maybe<AttrValue>,
  tag: AnyElementTagName | "",
): string;

export function attrSelector(
  attrsOrName: Attrs | string,
  valueOrTag: Maybe<AttrValue> | AnyElementTagName | "" = undefined,
  tag: AnyElementTagName | "" = "",
): string {
  if (isPlainObject(attrsOrName)) {
    let selector = "";

    for (const name of Object.keys(attrsOrName)) {
      selector += singleAttrSelector(name, attrsOrName[name]);
    }

    return `${valueOrTag ?? ""}${selector}`;
  } else {
    return `${tag}${singleAttrSelector(attrsOrName, valueOrTag)}`;
  }
}

function singleAttrSelector(name: string, value: Maybe<AttrValue>): string {
  const validName = kebabCase(name);

  if (isNil(value)) {
    return `[${validName}]`;
  }

  let stringValue: string;
  try {
    stringValue = value.toString();
  } catch {
    stringValue = "";
  }

  return `[${validName}="${stringValue}"]`;
}
