import { capitalize, kebabCase } from "@laserware/arcade";

/**
 * Ensures the specified key or name is `kebab-case` with a `data-` prefix and
 * returns the result.
 * @param keyOrAttributeName Key for the dataset entry that is either camelCase
 *                           or already in the `data-` name form.
 */
export function ensureDatasetAttributeName(keyOrAttributeName: string): string {
  if (keyOrAttributeName.startsWith("data-")) {
    return keyOrAttributeName;
  } else {
    return `data-${kebabCase(keyOrAttributeName)}`;
  }
}

/**
 * Ensures the specified key or name is camelCase without a `data-` prefix and
 * returns the result.
 * @param keyOrAttributeName Key for the dataset entry that is either camelCase
 *                           or already in the `data-` name form.
 */
export function ensureDatasetKeyName(keyOrAttributeName: string): string {
  if (keyOrAttributeName.startsWith("data-")) {
    // Split the words on the `-`. Exclude the first word (`data`), because
    // that's the attribute prefix. The word immediately after `data` should
    // be lowercase (since this is a camelCase word):
    const [, startWord, ...words] = keyOrAttributeName.split("-");

    // Capitalize all but the first word:
    const capitalizedWords = words.map((word) => capitalize(word));

    // Combine all the words and return:
    return [startWord, ...capitalizedWords].join("");
  } else {
    return keyOrAttributeName;
  }
}
