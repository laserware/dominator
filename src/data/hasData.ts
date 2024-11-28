import { isNil, isNotNil } from "@laserware/arcade";

import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type {
  AnyElement,
  DataKey,
  DataValue,
  DOMPropertySearch,
  ElemOrCssSelector,
} from "../types.ts";

/**
 * Search criteria for checking if dataset entries are present in an element.
 * You can use an array of dataset property/attribute names to check only if the
 * dataset entries are present, or an object to search for specific values.
 * Use `null` for the value if you only care about the presence of a dataset entry.
 *
 * @group Dataset
 */
export type DataSearch = DOMPropertySearch<DataKey, DataValue | null>;

/**
 * Returns true if the specified `target` has a dataset entry with the specified
 * `key` and optionally, the matching `value`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 * @param [value] Optional dataset value to check for.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Dataset
 */
export function hasDataEntry<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  key: DataKey,
  value?: DataValue,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for data ${key}`);

  return hasSingleDataEntry(elem, key, value);
}

/**
 * Checks if the specified `target` has *all* of the dataset entries that match
 * the specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of dataset keys or dataset filter object to check for.
 *
 * @returns `true` if the specified `target` matches all search criteria.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Dataset
 */
export function hasAllData<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: DataSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for data ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleDataEntry);
}

/**
 * Checks if the specified `target` has *some* of the dataset entries that match
 * the specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of dataset keys or dataset filter object to check for.
 *
 * @returns `true` if the specified `target` matches some search criteria.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Dataset
 */
export function hasSomeData<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: DataSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for data ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleDataEntry);
}

function hasSingleDataEntry(
  element: AnyElement,
  key: DataKey,
  value?: DataValue,
): boolean {
  const propertyName = asDataPropertyName(key);

  const datasetValue = element.dataset?.[propertyName];

  if (isNil(value)) {
    return isNotNil(datasetValue);
  } else {
    return datasetValue === stringifyDOMValue(value);
  }
}
