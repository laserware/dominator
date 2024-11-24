import { asDataPropertyName } from "../internal/asDataPropertyName.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { parseDOMValue } from "../internal/parseDOMValue.ts";
import type {
  Data,
  DataKey,
  DataValue,
  ElemOrCssSelector,
  NullOr,
  OneOrManyOf,
} from "../types.ts";

/**
 * Returns the value associated with the specified dataset `key` on the
 * specified `target`. Returns `null` if the `target` doesn't exist or no
 * entry was found for the specified `key`.
 *
 * @template T Type of value to return for the corresponding key.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function getData<T extends DataValue = string>(
  target: NullOr<ElemOrCssSelector>,
  key: DataKey,
): NullOr<T>;

/**
 * Returns an object with the values associated with the specified dataset `keys`
 * on the specified `target`. If any of the specified keys don't exist, they
 * are omitted from the returned value.
 *
 * @template T Shape of value to return for the corresponding keys.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Properties (e.g. `someProperty`) or attribute names (e.g. `data-some-property`) for the dataset entry.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function getData<T extends Data = any>(
  target: NullOr<ElemOrCssSelector>,
  keys: DataKey[],
): Partial<T>;

export function getData<T extends Data | DataValue>(
  target: NullOr<ElemOrCssSelector>,
  keyOrKeys: OneOrManyOf<DataKey>,
): T extends Data ? Partial<T> : NullOr<T> {
  const elem = elemOrThrow(target, "Unable to get data");

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
): NullOr<T> {
  const validKey = asDataPropertyName(key);

  const matchingValue = elem?.dataset[validKey] ?? null;

  return parseDOMValue<T>(matchingValue);
}
