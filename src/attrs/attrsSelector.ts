import { isNil, kebabCase } from "@laserware/arcade";

import { selectorWithTag } from "../internal/selectorWithTag.ts";
import { stringifyDOMValue } from "../internal/stringifyDOMValue.ts";
import type {
  AnyElementTagName,
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
} from "../types.ts";

import { InvalidAttrError } from "./InvalidAttrError.ts";

/**
 * Attempts to build a CSS selector string from the specified `name` and `value`. Note
 * that the `value` is coerced to a string and `null` excludes a value but only
 * includes a name. If `tag` is specified, it is included in the resulting selector.
 *
 * @param name Attribute name to include in the selector.
 * @param [value=undefined] Optional attribute value.
 * @param [tag] Optional tag name to include in the selector.
 *
 * @returns CSS selector based on the specified attribute `name` and optional `value`.
 *
 * @throws {InvalidAttrError} If the specified `value` could not be stringified.
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
  value?: AttrValue | null | undefined,
  tag?: AnyElementTagName,
): CssSelector {
  return selectorWithTag(singleAttrSelector(name, value), tag);
}

/**
 * Attempts to build a CSS selector string from the `attrs` object. Note that the
 * values of the `attrs` object are coerced to a string and `null` excludes a value
 * but only includes a name. If `tag` is specified, it is included in the
 * resulting selector.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 * @param [tag] Optional tag name to include in the selector.
 *
 * @returns CSS selector based on the specified `attrs`.
 *
 * @throws {InvalidAttrError} If a value in the specified `attrs` could not be stringified.
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
export function attrsSelector(
  attrs: Attrs,
  tag?: AnyElementTagName,
): CssSelector {
  let selector = "";

  for (const name of Object.keys(attrs)) {
    selector += singleAttrSelector(name, attrs[name]);
  }

  return selectorWithTag(selector, tag);
}

function singleAttrSelector(
  name: AttrName,
  value: AttrValue | null | undefined,
): CssSelector {
  const validName = kebabCase(name);

  if (isNil(value)) {
    return `[${validName}]`;
  }

  try {
    const stringValue = stringifyDOMValue(value) ?? "";

    return `[${validName}="${stringValue}"]`;
  } catch (err: any) {
    // prettier-ignore
    throw new InvalidAttrError(`Could not get selector for ${name}: ${err.message}`);
  }
}