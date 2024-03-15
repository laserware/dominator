import { isNotNil } from "@laserware/arcade";

import { ensureDataKeyName } from "./dataNames";
import { toValidElem } from "../internal/toValidElem";
import type { ElemOrSelectInput } from "../types";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key or attribute name.
 *
 * @param input Element, Event, or selector for element.
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 */
export function hasDataKey(
  input: ElemOrSelectInput | null,
  keyOrAttrName: string,
): boolean {
  try {
    const elem = toValidElem(input);
    if (elem === null) {
      return false;
    }

    const key = ensureDataKeyName(keyOrAttrName);

    return isNotNil(elem.dataset?.[key]);
  } catch {
    return false;
  }
}
