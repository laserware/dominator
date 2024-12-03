import { cast, type WithUndefinedValues } from "@laserware/arcade";

import type { ElemOrCssSelector } from "../elems/types.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { Data, DataKey, DataValue } from "./types.ts";

/**
 * Attempts to get the value associated with the specified dataset `key` on the
 * specified `target`. Returns `undefined` if no entry was found for the specified
 * `key`.
 *
 * @template T Type of value to return for the corresponding key.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Value of the dataset property associated with `key`, otherwise `undefined`.
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
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getDataValue(elem, "data-label");
 * // "Example"
 *
 * getDataValue(elem, "data-count");
 * // 30
 *
 * getDataValue(elem, "data-is-active");
 * // false
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getDataValue(elem, "label");
 * // "Example"
 *
 * getDataValue(elem, "count");
 * // 30
 *
 * getDataValue(elem, "isActive");
 * // false
 * ```
 */
export function getDataValue<T extends DataValue = DataValue>(
  target: ElemOrCssSelector,
  key: DataKey,
): T | undefined {
  const elem = elemOrThrow(target, `Unable to get data value for ${key}`);

  return getSingleDataValue(elem, key);
}

/**
 * Builds an object with the values associated with the specified dataset `keys`
 * on the specified `target`. If any of the specified `keys` don't exist, they
 * are set to `undefined` in the return value.
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
 * @template T Shape of value to return for the corresponding keys.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Properties (e.g. `someProperty`) or attribute names (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Object with specified keys and corresponding dataset property values (or `undefined` if not present).
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
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * type AttrsShape = {
 *   "data-label": string | undefined;
 *   "data-count": number | undefined;
 * };
 *
 * getData<AttrsShape>(elem, ["data-label", "data-count"]);
 * // { "data-label": "Example", "data-count": 30 }
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * type PropsShape = {
 *   label: string | undefined;
 *   count: number | undefined;
 * };
 *
 * getData<PropsShape>(elem, ["label", "count"]);
 * // { label: "Example", count: 30 }
 * ```
 */
export function getData<T extends Data = Data>(
  target: ElemOrCssSelector,
  keys: DataKey[],
): WithUndefinedValues<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get data for ${formatForError(keys)}`);

  const result: Record<DataKey, DataValue | undefined> = {};

  for (const key of keys) {
    result[key] = getSingleDataValue(elem, key);
  }

  return cast<WithUndefinedValues<T>>(result);
}

function getSingleDataValue<T extends DataValue>(
  elem: HTMLElement,
  key: DataKey,
): T | undefined {
  const validKey = asDataPropertyName(key);

  const matchingValue = elem?.dataset[validKey];

  return parseDOMValue<T>(matchingValue);
}
