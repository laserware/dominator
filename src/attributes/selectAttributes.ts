import { isNil, kebabCase } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { TagName } from "../dom.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";

import { InvalidAttributeError } from "./InvalidAttributeError.ts";
import type { AttributeName, Attributes, AttributeValue } from "./types.ts";

/**
 * Attempts to build a CSS selector string from the attribute `name` and `value`.
 * Note that the `value` is coerced to a string and `null` excludes a value but
 * only includes a name. If `tagName` is specified, it is included in the
 * resulting selector.
 *
 * @template TN Tag name of Element to select attribute from.
 *
 * @param name Attribute name to include in the selector.
 * @param [value=undefined] Optional attribute value to include in the selector.
 * @param [tagName] Optional tagName name to include in the selector.
 *
 * @returns CSS selector based on the attribute `name` and optional `value` and `tagName`.
 *
 * @throws {@linkcode InvalidAttributeError} if the specified `value` could not be stringified.
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
export function selectAttribute<TN extends TagName = "*">(
  name: AttributeName<TN>,
  value: AttributeValue | null | undefined = undefined,
  tagName?: TagName,
): CssSelector {
  const selector = selectSingleAttribute(name, value);

  return selectorWithTag(selector, tagName);
}

/**
 * Attempts to build a CSS selector string from the `attributes` object. Note
 * that the values of the `attributes` object are coerced to a string and `null` excludes
 * a value but only includes a name. If `tagName` is specified, it is included in the
 * resulting selector.
 *
 * @template TN Tag name of Element to select attributes from.
 *
 * @param attributes Object with key of attribute name and value of attribute value.
 * @param [tagName] Optional tagName name to include in the selector.
 *
 * @returns CSS selector based on the `attributes`.
 *
 * @throws {@linkcode InvalidAttributeError} if a value in `attributes` could not be stringified.
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
export function selectAttributes<TN extends TagName = "*">(
  attributes: Attributes<TN>,
  tagName?: TagName,
): CssSelector {
  let selector = "";

  for (const name of Object.keys(attributes)) {
    selector += selectSingleAttribute(name, attributes[name]);
  }

  return selectorWithTag(selector, tagName);
}

function selectSingleAttribute<TN extends TagName = "*">(
  name: AttributeName<TN>,
  value: AttributeValue | null | undefined,
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
    throw new InvalidAttributeError(`Could not get selector for ${name}: ${err.message}`);
  }
}
