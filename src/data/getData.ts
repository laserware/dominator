import { asDataPropertyName } from "../internal/dataKeys.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  Data,
  DataKey,
  DataValue,
  ElemOrCssSelector,
  OneOrManyOf,
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
export function getData<T extends DataValue = string>(
  target: ElemOrCssSelector,
  key: DataKey,
): T | undefined;

/**
 * Builds an object with the values associated with the specified dataset `keys`
 * on the specified `target`. If any of the specified `keys` don't exist, they
 * are omitted from the returned value.
 *
 * @template T Shape of value to return for the corresponding keys.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Properties (e.g. `someProperty`) or attribute names (e.g. `data-some-property`) for the dataset entry.
 *
 * @returns Object with specified keys and corresponding dataset property values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function getData<T extends Data = any>(
  target: ElemOrCssSelector,
  keys: DataKey[],
): Partial<T>;

export function getData<T extends Data | DataValue>(
  target: ElemOrCssSelector,
  keyOrKeys: OneOrManyOf<DataKey>,
): T extends Data ? Partial<T> : T | undefined {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get data for ${formatForError(keyOrKeys)}`);

  if (Array.isArray(keyOrKeys)) {
    const result: Record<string, any> = {};

    for (const key of keyOrKeys) {
      result[key] = getSingleData(elem, key);
    }

    // @ts-ignore
    return result;
  } else {
    // @ts-ignore
    return getSingleData(elem, keyOrKeys);
  }
}

function getSingleData<T extends DataValue>(
  elem: HTMLElement,
  key: DataKey,
): T | undefined {
  const validKey = asDataPropertyName(key);

  const matchingValue = elem?.dataset[validKey];

  return parseDOMValue<T>(matchingValue);
}
