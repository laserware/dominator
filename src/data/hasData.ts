import { isNotNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import { validDataKey } from "../internal/validDataKey.ts";
import type {
  DatasetAttrName,
  DatasetKey,
  DatasetValue,
  ElemOrCssSelector,
  NullOr,
} from "../types.ts";

/**
 * Returns true if the specified `target` has a dataset entry with the specified
 * `key` and optionally, the matching `value`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 * @param [value] Optional dataset value to check for.
 */
export function hasData(
  target: NullOr<ElemOrCssSelector>,
  key: DatasetKey | DatasetAttrName,
  value?: DatasetValue,
): boolean {
  try {
    const elem = toElem(target);
    if (elem === null) {
      return false;
    }

    const validKey = validDataKey(key);

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
