import { isNotNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import { validDataKey } from "../internal/validDataKey.ts";
import type {
  AttrName,
  AttrValue,
  DatasetKey,
  DatasetValue,
  ElemOrCssSelector,
  NullOr,
} from "../types.ts";

/**
 * Returns true if the specified `target` has a dataset entry with the specified
 * `keyOrAttrName` and optionally, the matching `value`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param keyOrAttrName Key (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 * @param [value] Optional dataset value to check for.
 */
export function hasData<KN extends DatasetKey | AttrName>(
  target: NullOr<ElemOrCssSelector>,
  keyOrAttrName: KN,
  value?: KN extends DatasetKey ? DatasetValue : AttrValue,
): boolean {
  try {
    const elem = toElem(target);
    if (elem === null) {
      return false;
    }

    const validKey = validDataKey(keyOrAttrName);

    const datasetValue = elem.dataset?.[validKey];

    if (value === undefined) {
      return isNotNil(datasetValue);
    } else {
      return datasetValue === value;
    }
  } catch {
    return false;
  }
}
