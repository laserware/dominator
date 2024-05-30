import { kebabCase } from "@laserware/arcade";

/**
 * Creates a CSS selector string from the attributes object. Note that the values
 * of the attributes object are coerced to a string.
 *
 * @param attributes Object with key of attribute name and value of attribute value.
 */
export function buildAttributeSelector(
  attributes: Record<string | number | symbol, boolean | string | null>,
): string {
  return Object.entries(attributes).reduce((acc, [name, value]) => {
    const validName = kebabCase(name);

    if (value === null) {
      acc = `${acc}[${validName}]`;
    } else {
      acc = `${acc}[${validName}="${value.toString()}"]`;
    }

    return acc;
  }, "");
}
