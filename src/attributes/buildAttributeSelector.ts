import { kebabCase } from "@laserware/arcade";

/**
 * Creates a CSS selector string from the attributes object.
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
