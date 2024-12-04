import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import { asDatasetPropertyName } from "./datasetKeys.ts";
import type { Dataset, DatasetKey, DatasetValue } from "./types.ts";

/**
 * Assigns the `value` to the dataset attribute/property name `key` in the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key or property name for the dataset entry.
 * @param value Value to set for associated property or attribute name.
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
 * setDatasetEntry(element, "data-is-active", true);
 * setDatasetEntry(element, "data-count", 50);
 * setDatasetEntry(element, "data-label", "Update");
 * ```
 *
 * **Using Property Name (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * setDatasetEntry(element, "isActive", true);
 * setDatasetEntry(element, "count", 50);
 * setDatasetEntry(element, "label", "Update");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="true"
 *   data-count="50"
 *   data-label="Update"
 * >
 *   ...
 * </div>
 * ```
 */
export function setDatasetEntry<TN extends TagName = "*">(
  target: Target<TN>,
  key: DatasetKey,
  value: DatasetValue | null,
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to set dataset entry for ${key}`);

  setSingleDatasetEntry(element, key, value);

  return cast<ElementOf<TN>>(element);
}

/**
 * Assigns the `dataset` key/value pairs to the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param dataset Object with keys of dataset attribute/property names and values
 *             of corresponding values.
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
 * setDatasetEntries(element, {
 *   "data-is-active", true,
 *   "data-count": 50,
 *   "data-label": "Update",
 * });
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * setDatasetEntries(element, {
 *   isActive, true,
 *   count: 50,
 *   label: "Update",
 * });
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="true"
 *   data-count="50"
 *   data-label="Update"
 * >
 *   ...
 * </div>
 * ```
 */
export function setDatasetEntries<TN extends TagName = "*">(
  target: Target<TN>,
  dataset: Dataset,
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to set dataset entries for ${formatForError(dataset)}`);

  for (const key of Object.keys(dataset)) {
    setSingleDatasetEntry(element, key, dataset[key]);
  }

  return cast<ElementOf<TN>>(element);
}

function setSingleDatasetEntry(
  element: Element,
  key: DatasetKey,
  value?: DatasetValue | null | undefined,
): void {
  const validKey = asDatasetPropertyName(key);

  if (isNil(value)) {
    cast<HTMLElement>(element).dataset[validKey] = "";
  } else {
    cast<HTMLElement>(element).dataset[validKey] = stringifyDOMValue(value);
  }
}
