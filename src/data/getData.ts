import { toPrimitiveValue } from "../attrs/conversions.ts";
import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector, NullOr, Primitive } from "../types.ts";

import { validDataKey } from "./dataNames.ts";

/**
 * Returns the value associated with the specified dataset entry key. If the
 * value doesn't exist, return null.
 *
 * @template V Type of value to return for the corresponding key.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param key Key or attribute name for the dataset entry.
 */
export function getData<V extends Primitive = string>(
  input: NullOr<ElemOrCssSelector>,
  key: string,
): NullOr<V> {
  try {
    const elem = toElem(input);
    if (elem === null) {
      return null;
    }

    const validKey = validDataKey(key);

    const matchingValue = elem?.dataset[validKey] ?? null;

    return toPrimitiveValue<V>(matchingValue);
  } catch {
    return null;
  }
}
