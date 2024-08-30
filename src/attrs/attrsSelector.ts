import { kebabCase } from "@laserware/arcade";

import type { Attrs } from "../types.ts";

/**
 * Creates a CSS selector string from the attributes object. Note that the values
 * of the attributes object are coerced to a string.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function attrsSelector(attrs: Attrs): string {
  return Object.entries(attrs).reduce((acc, [name, value]) => {
    const validName = kebabCase(name);

    if (value === null) {
      acc = `${acc}[${validName}]`;
    } else {
      acc = `${acc}[${validName}="${value.toString()}"]`;
    }

    return acc;
  }, "");
}
