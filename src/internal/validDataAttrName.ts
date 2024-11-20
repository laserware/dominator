import { kebabCase } from "@laserware/arcade";

/**
 * Ensures the specified key or name is `kebab-case` with a `data-` prefix and
 * returns the result.
 *
 * @param key Key for the dataset entry that is either camelCase or already in
 *            the `data-` name form.
 */
export function validDataAttrName(key: string): string {
  if (key.startsWith("data-")) {
    return key;
  } else {
    return `data-${kebabCase(key)}`;
  }
}
