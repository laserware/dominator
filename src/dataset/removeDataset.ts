import { cast } from "@laserware/arcade";

import { removeAttribute } from "../attributes/removeAttributes.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { formatForError } from "../internal/formatForError.ts";

import { asDatasetAttributeName } from "./datasetKeys.ts";
import type { DatasetKey, DatasetPropertyName } from "./types.ts";

/**
 * Removes the dataset entry with attribute/property name `key` from the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Dataset property or attribute name for the dataset entry to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 *   data-label="Example"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Using Attribute Name (`data-*`)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * removeDatasetEntry(element, "data-label");
 * ```
 *
 * **Using Property Name (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * removeDatasetEntry(element, "label");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 * >
 *   ...
 * </div>
 * ```
 */
export function removeDatasetEntry<TN extends TagName = "*">(
  target: Target<TN> | null,
  key: DatasetPropertyName,
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot remove dataset entry for ${key}`);

  removeSingleDatasetEntry(element, key);

  return cast<ElementOf<TN>>(element);
}

/**
 * Removes the dataset entries with the attribute/property names `keys` from the
 * `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of dataset properties or attribute names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 *   data-label="Example"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * removeDatasetEntries(element, ["data-label", "data-count"]);
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * removeDatasetEntries(element, ["label", "count"]);
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 * >
 *   ...
 * </div>
 * ```
 */
export function removeDatasetEntries<TN extends TagName = "*">(
  target: Target<TN> | null,
  keys: DatasetKey[],
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot remove dataset entries ${formatForError(keys)}`);

  for (const key of keys) {
    removeSingleDatasetEntry(element, key);
  }

  return cast<ElementOf<TN>>(element);
}

function removeSingleDatasetEntry(element: Element, key: string): void {
  const validAttrName = asDatasetAttributeName(key);

  // We remove the _attribute_ rather than deleting the entry from the elements
  // dataset because deleting a dataset entry using `delete` won't work in
  // older versions of Safari:
  removeAttribute(element, validAttrName);
}
