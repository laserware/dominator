import { cast, isNil, isNotNil } from "@laserware/arcade";

import type { TagName } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type { PropertySearch } from "../types.ts";

import type { DataKey, DataValue } from "./types.ts";

/**
 * Search criteria for checking if dataset entries are present in an element.
 * You can use an array of dataset property/attribute names to check only if the
 * dataset entries are present, or an object to search for specific values.
 * Use `null` for the value if you only care about the presence of a dataset entry.
 */
export type DataSearch = PropertySearch<DataKey, DataValue | null>;

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
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
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
 * const elem = findElem("#example")!;
 *
 * hasDataEntry(elem, "data-is-active");
 * // true
 *
 * hadDataEntry(elem, "isActive", "false");
 * // false ("false" cannot be a string, must be the boolean value `false`)
 *
 * hadDataEntry(elem, "data-count", 30);
 * // true
 * ```
 */
export function hasDataEntry<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  key: DataKey,
  value?: DataValue,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for data ${key}`);

  return hasSingleDataEntry(elem, key, value);
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
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
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
 * const elem = findElem("#example")!;
 *
 * hasAllData(elem, ["data-is-active", "data-count"]);
 * // true
 *
 * hasAllData(elem, ["isActive", "data-missing"]);
 * // false
 *
 * hasAllData(elem, { "data-count", 30, "label": null });
 * // true
 * ```
 */
export function hasAllData<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  search: DataSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for data ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleDataEntry);
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
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
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
 * const elem = findElem("#example")!;
 *
 * hasSomeData(elem, ["data-is-active", "data-missing"]);
 * // true
 *
 * hasSomeData(elem, ["data-missing"]);
 * // false
 *
 * hasSomeData(elem, {
 *   "data-is-active": false,
 *   count, 30,
 *   missing: null,
 * });
 * // true
 * ```
 */
export function hasSomeData<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  search: DataSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for data ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleDataEntry);
}

function hasSingleDataEntry(
  element: Element,
  key: DataKey,
  value?: DataValue,
): boolean {
  const propertyName = asDataPropertyName(key);

  const datasetValue = cast<HTMLElement>(element).dataset?.[propertyName];

  if (isNil(value)) {
    return isNotNil(datasetValue);
  } else {
    return datasetValue === stringifyDOMValue(value);
  }
}
