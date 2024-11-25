import { cast } from "../internal/cast.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  Data,
  DataKey,
  DataValue,
  ElemOrCssSelector,
  WithUndefinedValues,
} from "../types.ts";

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
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function getDataValue<T extends DataValue = string>(
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
 * @template T Shape of value to return for the corresponding keys.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Properties (e.g. `someProperty`) or attribute names (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Object with specified keys and corresponding dataset property values.
 *          Note that you will need to perform checks for whether a value is
 *          `undefined` in the returned object if some of the entries weren't present.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
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
