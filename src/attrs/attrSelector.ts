import { isNil, isPlainObject, kebabCase } from "@laserware/arcade";

import type {
  AnyElementTagName,
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  Maybe,
} from "../types.ts";

/**
 * Returns a CSS selector string from the `attrs` object. Note that the values
 * of the `attrs` object are coerced to a string and `null` excludes a value
 * but only includes a name.
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
): CssSelector;

/**
 * Returns a CSS selector string from the specified `name` and `value`. Note
 * that the `value` is coerced to a string and `null` excludes a value but only
 * includes a name. Specifying a `tag` will further limit the search.
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
  name: AttrName,
  value: Maybe<AttrValue>,
  tag: AnyElementTagName | "",
): CssSelector;

export function attrSelector(
  attrsOrName: Attrs | AttrName,
  valueOrTag: Maybe<AttrValue> | AnyElementTagName | "" = undefined,
  tag: AnyElementTagName | "" = "",
): CssSelector {
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

function singleAttrSelector(
  name: AttrName,
  value: Maybe<AttrValue>,
): CssSelector {
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
