import { isNil, kebabCase } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { TagName } from "../dom.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";

import { InvalidAttrError } from "./InvalidAttrError.ts";
import type { AttrName, Attrs, AttrValue } from "./types.ts";

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
 * @throws {@linkcode InvalidAttrError} if the specified `value` could not be stringified.
 *
 * @example
 * **Name Only**
 *
 * ```ts
 * selectAttr("disabled");
 * // [disabled]
 * ```
 *
 * **Name and Value**
 *
 * ```ts
 * selectAttr("disabled", true);
 * // [disabled="true"]
 * ```
 *
 * **Name, Value, and Tag**
 *
 * ```ts
 * selectAttr("disabled", true, "button");
 * // button[disabled="true"]
 * ```
 *
 * **Name and Tag (No Value)**
 *
 * ```ts
 * selectAttr("disabled", null, "button");
 * // button[disabled]
 * ```
 */
export function selectAttr<E extends Element = HTMLElement>(
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
 * @throws {@linkcode InvalidAttrError} if a value in the specified `attrs` could not be stringified.
 *
 * @example
 * **Single Entry With Value**
 *
 * ```ts
 * selectAttrs({ disabled: true });
 * // [disabled="true"]
 * ```
 *
 * **Single Entry With Value and Tag**
 *
 * ```ts
 * selectAttrs({ disabled: true }, "button");
 * // button[disabled="true"]
 * ```

 * **Single Entry Without Value**
 *
 * ```ts
 * selectAttrs({ inert: null });
 * // [inert]
 * ```
 *
 * **Multiple Entries**
 *
 * ```ts
 * selectAttrs({ disabled: true, inert: null });
 * // [disabled="true"][inert]
 * ```
 */
export function selectAttrs<E extends Element = HTMLElement>(
  attrs: Attrs<E>,
  tag?: TagName,
): CssSelector {
  let selector = "";

  for (const name of Object.keys(attrs)) {
    selector += selectSingleAttr(name, attrs[name]);
  }

  return selectorWithTag(selector, tag);
}

function selectSingleAttr<E extends Element = HTMLElement>(
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
