import { isNil, kebabCase } from "@laserware/arcade";

import type { AnyElementTagName, Attrs } from "../types.ts";

/**
 * Creates a CSS selector string from the attributes object. Note that the values
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
  tag: AnyElementTagName | "" = "",
): string {
  let selector = "";

  for (const [name, value] of Object.entries(attrs)) {
    const validName = kebabCase(name);

    if (isNil(value)) {
      selector = `${selector}[${validName}]`;
      continue;
    }

    let stringValue: string;
    try {
      stringValue = value.toString();
    } catch {
      stringValue = "";
    }

    selector = `${selector}[${validName}="${stringValue}"]`;
  }

  return `${tag}${selector}`;
}
