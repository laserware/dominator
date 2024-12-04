import { cast, isNil, isNotNil } from "@laserware/arcade";

import type { TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";

import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type { PropertySearch } from "../types.ts";

import { asDatasetPropertyName } from "./datasetKeys.ts";

import type { DatasetKey, DatasetValue } from "./types.ts";

/**
 * Search criteria for checking if dataset entries are present in an element.
 * You can use an array of dataset property/attribute names to check only if the
 * dataset entries are present, or an object to search for specific values.
 * Use `null` for the value if you only care about the presence of a dataset entry.
 */
export type DatasetSearch = PropertySearch<DatasetKey, DatasetValue | null>;

/**
 * Returns true if the `target` has a dataset entry with `key` and optionally,
 * the matching `value`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 * @param [value] Optional dataset value to check for.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
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
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasDatasetEntry(element, "data-is-active");
 * // true
 *
 * hasDatasetEntry(element, "isActive", "false");
 * // false ("false" cannot be a string, must be the boolean value `false`)
 *
 * hasDatasetEntry(element, "data-count", 30);
 * // true
 * ```
 */
export function hasDatasetEntry<TN extends TagName = "*">(
  target: Target<TN>,
  key: DatasetKey,
  value?: DatasetValue,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to check for dataset entry ${key}`);

  return hasSingleDatasetEntry(element, key, value);
}

/**
 * Checks if the `target` has **all** of the dataset entries that match the
 * `search` criteria.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of dataset keys or dataset filter object to check for.
 *
 * @returns `true` if the `target` matches all search criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
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
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasAllDatasetEntries(element, ["data-is-active", "data-count"]);
 * // true
 *
 * hasAllDatasetEntries(element, ["isActive", "data-missing"]);
 * // false
 *
 * hasAllDatasetEntries(element, { "data-count", 30, "label": null });
 * // true
 * ```
 */
export function hasAllDatasetEntries<TN extends TagName = "*">(
  target: Target<TN>,
  search: DatasetSearch,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to check for all dataset entries ${formatForError(search)}`);

  return hasAllProperties(element, search, hasSingleDatasetEntry);
}

/**
 * Checks if the `target` has **some** of the dataset entries that match the
 * `search` criteria.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of dataset keys or dataset filter object to check for.
 *
 * @returns `true` if the `target` matches some search criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
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
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasSomeDatasetEntries(element, ["data-is-active", "data-missing"]);
 * // true
 *
 * hasSomeDatasetEntries(element, ["data-missing"]);
 * // false
 *
 * hasSomeDatasetEntries(element, {
 *   "data-is-active": false,
 *   count, 30,
 *   missing: null,
 * });
 * // true
 * ```
 */
export function hasSomeDatasetEntries<TN extends TagName = "*">(
  target: Target<TN>,
  search: DatasetSearch,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to check for some dataset entries ${formatForError(search)}`);

  return hasSomeProperties(element, search, hasSingleDatasetEntry);
}

function hasSingleDatasetEntry(
  element: Element,
  key: DatasetKey,
  value?: DatasetValue,
): boolean {
  const propertyName = asDatasetPropertyName(key);

  const datasetValue = cast<HTMLElement>(element).dataset?.[propertyName];

  if (isNil(value)) {
    return isNotNil(datasetValue);
  } else {
    return datasetValue === stringifyDOMValue(value);
  }
}
