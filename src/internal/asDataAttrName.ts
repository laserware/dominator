import { kebabCase } from "@laserware/arcade";

import type { DataAttrName, DataKey } from "../types.ts";

/**
 * Ensures the specified key or name is `kebab-case` with a `data-` prefix and
 * returns the result. Useful for accessing the element attribute associated
 * with a dataset entry.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion|name conversion}
 * for why this is needed.
 *
 * @param key Key for the dataset entry that is either camelCase or already in
 *            the `data-` name form.
 */
export function asDataAttrName(key: DataKey): DataAttrName {
  if (key.startsWith("data-")) {
    return key as DataAttrName;
  } else {
    return `data-${kebabCase(key)}`;
  }
}
