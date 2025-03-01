import { isNil, kebabCase } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { TagName } from "../dom.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";

import { InvalidAttributeError } from "./InvalidAttributeError.ts";
import type { AttributeName, AttributeValue, Attributes } from "./types.ts";

/**
 * Attempts to build a CSS selector string from the attribute `name` and `value`.
 * Note that the `value` is coerced to a string and `null` excludes a value but
 * only includes a name. If `tagName` is specified, it is included in the
 * resulting selector.
 *
 * > [!NOTE]
 * > If you specify the optional `E` generic, you'll get autocomplete
 * > on the attributes for the element associated with that type.
 *
 * @template E Type of element to select attribute from.
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
 * selectAttribute("disabled");
 * // [disabled]
 * ```
 *
 * **Name and Value**
 *
 * ```ts
 * selectAttribute("disabled", true);
 * // [disabled="true"]
 * ```
 *
 * **Name, Value, and Tag**
 *
 * ```ts
 * selectAttribute("disabled", true, "button");
 * // button[disabled="true"]
 * ```
 *
 * **Name and Tag (No Value)**
 *
 * ```ts
 * selectAttribute("disabled", null, "button");
 * // button[disabled]
 * ```
 */
export function selectAttribute<E extends Element = HTMLElement>(
  name: AttributeName<E>,
  value: AttributeValue | null | undefined = undefined,
  tagName?: TagName | string,
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
 * > [!NOTE]
 * > If you specify the optional `E` generic, you'll get autocomplete
 * > on the attributes for the element associated with that type.
 *
 * @template E Type of element to select attributes from.
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
 * selectAttributes({ disabled: true });
 * // [disabled="true"]
 * ```
 *
 * **Single Entry With Value and Tag**
 *
 * ```ts
 * selectAttributes({ disabled: true }, "button");
 * // button[disabled="true"]
 * ```

 * **Single Entry Without Value**
 *
 * ```ts
 * selectAttributes({ inert: null });
 * // [inert]
 * ```
 *
 * **Multiple Entries**
 *
 * ```ts
 * selectAttributes({ disabled: true, inert: null });
 * // [disabled="true"][inert]
 * ```
 */
export function selectAttributes<E extends Element = HTMLElement>(
  attributes: Attributes<E>,
  tagName?: TagName | string,
): CssSelector {
  let selector = "";

  for (const name of Object.keys(attributes)) {
    selector += selectSingleAttribute(name, attributes[name]);
  }

  return selectorWithTag(selector, tagName);
}

function selectSingleAttribute<E extends Element = HTMLElement>(
  name: AttributeName<E>,
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
    // biome-ignore format:
    throw new InvalidAttributeError(`Could not get selector for ${name}: ${err.message}`);
  }
}
