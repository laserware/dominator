import { capitalize } from "@laserware/arcade";

import type { DatasetAttrName, DatasetKey } from "../types.ts";

/**
 * Ensures the specified key or name is camelCase without a `data-` prefix and
 * returns the result.
 *
 * @param key Key for the dataset entry that is either camelCase or already in
 *            the `data-` name form.
 */
export function validDataKey(key: DatasetKey | DatasetAttrName): DatasetKey {
  if (key.startsWith("data-")) {
    // Split the words on the `-`. Exclude the first word (`data`), because
    // that's the attribute prefix. The word immediately after `data` should
    // be lowercase (since this is a camelCase word):
    const [, startWord, ...words] = key.split("-");

    // Capitalize all but the first word:
    const capitalizedWords = words.map((word) => capitalize(word));

    // Combine all the words and return:
    return [startWord, ...capitalizedWords].join("");
  } else {
    return key;
  }
}