import { cast, type WithUndefinedValues } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";

import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import { asDatasetPropertyName } from "./datasetKeys.ts";

import type { Dataset, DatasetKey, DatasetValue } from "./types.ts";

/**
 * Attempts to get the value associated with the dataset attribute/property name
 * `key` on the `target`. Returns `undefined` if no entry was found for the
 * specified `key`.
 *
 * @template V Type of value to return for the corresponding key.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Value of the dataset property associated with `key`, otherwise `undefined`.
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
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * getDatasetValue(element, "data-label");
 * // "Example"
 *
 * getDatasetValue(element, "data-count");
 * // 30
 *
 * getDatasetValue(element, "data-is-active");
 * // false
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * getDatasetValue(element, "label");
 * // "Example"
 *
 * getDatasetValue(element, "count");
 * // 30
 *
 * getDatasetValue(element, "isActive");
 * // false
 * ```
 */
export function getDatasetValue<V extends DatasetValue = DatasetValue>(
  target: Target,
  key: DatasetKey,
): V | undefined {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to get dataset value for ${key}`);

  return getSingleDatasetValue(element, key);
}

/**
 * Builds an object with the values associated with the dataset `keys` on the
 * `target`. If any of the specified `keys` don't exist, they are set to `undefined`
 * in the return value.
 *
 * > [!IMPORTANT]
 * > You will need to perform checks for whether a value is `undefined` in the returned
 * > object if some of the entries weren't present. See the code block below for
 * > additional details.
 *
 * ```ts
 * // Assuming you pass this in as the generic:
 * type ShapeIn = {
 *   "data-label": string;
 *   "data-count": number;
 * };
 *
 * // The return type of this function is:
 * type ShapeOut = {
 *   "data-label": string | undefined;
 *   "data-count": number | undefined;
 * };
 * ```
 *
 * @remarks
 * The {@linkcode arcade!WithUndefinedValues} type represents an object with values that could be `undefined`.
 *
 * @template D Shape of value to return for the corresponding keys.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Properties (e.g. `someProperty`) or attribute names (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Object with key of `keys` and corresponding dataset property values (or `undefined` if not present).
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
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * type AttributesShape = {
 *   "data-label": string | undefined;
 *   "data-count": number | undefined;
 * };
 *
 * getDatasetEntries<AttributesShape>(element, [
 *   "data-label",
 *   "data-count",
 * ]);
 * // { "data-label": "Example", "data-count": 30 }
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * type PropertiesShape = {
 *   label: string | undefined;
 *   count: number | undefined;
 * };
 *
 * getDatasetEntries<PropertiesShape>(element, ["label", "count"]);
 * // { label: "Example", count: 30 }
 * ```
 */
export function getDatasetEntries<D extends Dataset = Dataset>(
  target: Target,
  keys: DatasetKey[],
): WithUndefinedValues<D> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to get dataset entries for ${formatForError(keys)}`);

  const result: Record<DatasetKey, DatasetValue | undefined> = {};

  for (const key of keys) {
    result[key] = getSingleDatasetValue(element, key);
  }

  return cast<WithUndefinedValues<D>>(result);
}

function getSingleDatasetValue<V extends DatasetValue>(
  element: HTMLElement,
  key: DatasetKey,
): V | undefined {
  const validKey = asDatasetPropertyName(key);

  const matchingValue = element?.dataset[validKey];

  return parseDOMValue<V>(matchingValue);
}
