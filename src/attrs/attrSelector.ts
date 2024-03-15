import { kebabCase } from "@laserware/arcade";

/**
 * Creates a CSS selector string from the attributes object. Note that the
 * values of the attributes object are coerced to a string.
 *
 * @param attrs Object with key of attribute name and value of attribute value.
 *
 * @example
 * const selector = attrSelector({ disabled: false, ariaLabel: "Test", autofocus: null });
 * // => '[disabled="false"][aria-label="Test"][autofocus]'
 */
export function attrSelector(
  attrs: Record<string | number | symbol, boolean | string | null>,
): string {
  let selectString = "";

  for (const [name, value] of Object.entries(attrs)) {
    const validName = kebabCase(name);

    if (value === null) {
      selectString = `${selectString}[${validName}]`;
    } else {
      selectString = `${selectString}[${validName}="${value.toString()}"]`;
    }
  }

  return selectString;
}
