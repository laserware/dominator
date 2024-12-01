import { camelCase, kebabCase, toEntries } from "@laserware/arcade";

import type { DataAttrName, DataKey, DataPropertyName } from "../data/types.ts";

/**
 * Ensures the specified key or name is `kebab-case` with a `data-` prefix and
 * returns the result. Useful for accessing the element attribute associated
 * with a dataset entry.
 *
 * See [name conversion](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion)
 * for why this is needed.
 *
 * @internal
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

/**
 * Ensures the specified `key` is camelCase without a `data-` prefix and returns
 * the result. Useful for ensuring the specified `key` can be used to access
 * an entry in the `HTMLElement.dataset` property.
 *
 * See [name conversion](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion)
 * for why this is needed.
 *
 * @internal
 *
 * @param key Key for the dataset entry that is either camelCase or already in
 *            the `data-` name form.
 */
export function asDataPropertyName(key: DataKey): DataPropertyName {
  if (key.startsWith("data-")) {
    return camelCase(key.replace("data-", ""));
  } else {
    return key;
  }
}

/**
 * Iterates through the specified object or array of keys and adds the `data-`
 * prefix (and kebab-cases the value).
 *
 * @internal
 *
 * @param values Object or array of values to add `data-` prefix to.
 */
export function withDataPrefix<T extends Record<string, any> | any[]>(
  values: T,
): T {
  if (Array.isArray(values)) {
    return values.map((value) => asDataAttrName(value)) as T;
  } else {
    const withData: Record<string, any> = {};

    for (const [key, value] of toEntries(values)) {
      withData[asDataAttrName(key)] = value;
    }

    return withData as T;
  }
}
