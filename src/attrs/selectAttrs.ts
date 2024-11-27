import { isNil, kebabCase } from "@laserware/arcade";

import { InvalidAttrError } from "../errors.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  TagName,
} from "../types.ts";

/**
 * Attempts to build a CSS selector string from the specified `name` and `value`. Note
 * that the `value` is coerced to a string and `null` excludes a value but only
 * includes a name. If `tag` is specified, it is included in the resulting selector.
 *
 * @template E Element type to select attribute from.
 *
 * @param name Attribute name to include in the selector.
 * @param [value=undefined] Optional attribute value to include in the selector.
 * @param [tag] Optional tag name to include in the selector.
 *
 * @returns CSS selector based on the specified attribute `name` and optional `value` and `tag`.
 *
 * @throws {@link InvalidAttrError} If the specified `value` could not be stringified.
 *
 * @example Name Only
 * const selector = selectAttr("disabled");
 * // `[disabled]`

 * @example Name and Value
 * const selector = selectAttr("disabled", true);
 * // `[disabled="true"]`
 *
 * @example Name, Value, and Tag
 * const selector = selectAttr("disabled", true, "button");
 * // `button[disabled="true"]`
 *
 * @example Name and Tag (No Value)
 * const selector = selectAttr("disabled", null, "button");
 * // `button[disabled]`
 *
 * @group Attributes
 */
export function selectAttr<E extends HTMLElement = HTMLElement>(
  name: AttrName<E>,
  value: AttrValue | null | undefined = undefined,
  tag?: TagName,
): CssSelector {
  const selector = selectSingleAttr(name, value);

  return selectorWithTag(selector, tag);
}

/**
 * Attempts to build a CSS selector string from the specified `attrs` object. Note
 * that the values of the `attrs` object are coerced to a string and `null` excludes
 * a value but only includes a name. If `tag` is specified, it is included in the
 * resulting selector.
 *
 * @template E Element type to select attributes from.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 * @param [tag] Optional tag name to include in the selector.
 *
 * @returns CSS selector based on the specified `attrs`.
 *
 * @throws {@link InvalidAttrError} If a value in the specified `attrs` could not be stringified.
 *
 * @example Single Entry With Value
 * const selector = selectAttrs({ disabled: true });
 * // `[disabled="true"]`
 *
 * @example Single Entry With Value and Tag
 * const selector = selectAttrs({ disabled: true }, "button");
 * // `button[disabled="true"]`

 * @example Single Entry Without Value
 * const selector = selectAttrs({ inert: null });
 * // `[inert]`
 *
 * @example Multiple Entries
 * const selector = selectAttrs({ disabled: true, inert: null });
 * // `[disabled="true"][inert]`
 *
 * @group Attributes
 */
export function selectAttrs<E extends HTMLElement = HTMLElement>(
  attrs: Attrs<E>,
  tag?: TagName,
): CssSelector {
  let selector = "";

  for (const name of Object.keys(attrs)) {
    selector += selectSingleAttr(name, attrs[name]);
  }

  return selectorWithTag(selector, tag);
}

function selectSingleAttr<E extends HTMLElement = HTMLElement>(
  name: AttrName<E>,
  value: AttrValue | null | undefined,
): CssSelector {
  const validName = kebabCase(name);

  if (isNil(value)) {
    return `[${validName}]`;
  }

  try {
    // Note that we don't need to coerce the value to a string because we already
    // caught the `null` and `undefined` above:
    const stringValue = stringifyDOMValue(value);

    // We JSON.stringify the value  to ensure any JSON strings are
    // escaped and non-string values are surrounded with quotes:
    return `[${validName}=${JSON.stringify(stringValue)}]`;
  } catch (err: any) {
    // prettier-ignore
    throw new InvalidAttrError(`Could not get selector for ${name}: ${err.message}`);
  }
}
