import { isNil, kebabCase } from "@laserware/arcade";

import type { Attrs } from "../types.ts";

/**
 * Creates a CSS selector string from the attributes object. Note that the values
 * of the attributes object are coerced to a string and null excludes a value
 * but only includes a key.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function selectAttr(attrs: Attrs): string {
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

  return selector;
}
