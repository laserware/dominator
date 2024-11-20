import { toElem } from "../elem/toElem.ts";
import { toPrimitiveValue } from "../internal/toPrimitiveValue.ts";
import { validDataKey } from "../internal/validDataKey.ts";
import type {
  AttrName,
  DatasetKey,
  DatasetValue,
  ElemOrCssSelector,
  NullOr,
} from "../types.ts";

/**
 * Returns the value associated with the specified dataset `keyOrAttrName`.
 * If the value doesn't exist, return `null`.
 *
 * @template V Type of value to return for the corresponding key.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param keyOrAttrName Key (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 */
export function getData<V extends DatasetValue = string>(
  target: NullOr<ElemOrCssSelector>,
  keyOrAttrName: DatasetKey | AttrName,
): NullOr<V> {
  try {
    const elem = toElem(target);
    if (elem === null) {
      return null;
    }

    const validKey = validDataKey(keyOrAttrName);

    const matchingValue = elem?.dataset[validKey] ?? null;

    return toPrimitiveValue<V>(matchingValue);
  } catch {
    return null;
  }
}
