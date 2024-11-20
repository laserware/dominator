import { toElem } from "../elem/toElem.ts";
import { toAttrValue } from "../internal/toAttrValue.ts";
import { validDataKey } from "../internal/validDataKey.ts";
import type {
  DatasetAttrName,
  DatasetKey,
  DatasetValue,
  ElemOrCssSelector,
  NullOr,
} from "../types.ts";

/**
 * Returns the value associated with the specified dataset `key` on the
 * specified `target`. Returns `null` if the `target` doesn't exist or no
 * entry was found for the specified `key`.
 *
 * @template V Type of value to return for the corresponding key.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param key Key (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 */
export function getData<V extends DatasetValue = string>(
  target: NullOr<ElemOrCssSelector>,
  key: DatasetKey | DatasetAttrName,
): NullOr<V> {
  try {
    const elem = toElem(target);
    if (elem === null) {
      return null;
    }

    const validKey = validDataKey(key);

    const matchingValue = elem?.dataset[validKey] ?? null;

    return toAttrValue<V>(matchingValue);
  } catch {
    return null;
  }
}
