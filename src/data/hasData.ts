import { isNotNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import type { AttrValue, ElemOrCssSelector, NullOr } from "../types.ts";

import { validDataKey } from "./dataNames.ts";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key or attribute name and optionally, the matching attribute value.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param key Key or attribute name for the dataset entry.
 * @param [value] Optional dataset value to check for.
 */
export function hasData(
  input: NullOr<ElemOrCssSelector>,
  key: string,
  value?: AttrValue,
): boolean {
  try {
    const elem = toElem(input);
    if (elem === null) {
      return false;
    }

    const validKey = validDataKey(key);

    const datasetEntry = elem.dataset?.[validKey];

    if (value === undefined) {
      return isNotNil(datasetEntry);
    } else {
      return datasetEntry === value;
    }
  } catch {
    return false;
  }
}
