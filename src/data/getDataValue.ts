import { ensureDataKeyName } from "./dataNames";
import { toValidElem } from "../internal/toValidElem";
import type { ElemOrSelectInput } from "../types";

/**
 * Returns the value associated with the specified dataset entry key. If the
 * value doesn't exist, return null.
 *
 * @param input Element, Event, or selector for element.
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 */
export function getDataValue<T = string>(
  input: ElemOrSelectInput | null,
  keyOrAttrName: string,
): T | null {
  try {
    const elem = toValidElem(input);
    if (elem === null) {
      return null;
    }

    const key = ensureDataKeyName(keyOrAttrName);

    return (elem?.dataset[key] ?? null) as T;
  } catch {
    return null;
  }
}
