import { isNil } from "@laserware/arcade";

import { toAttrValue } from "../attrs/conversions.ts";
import type { AttrValue, Maybe } from "../types.ts";

import { validDataAttrName } from "./dataNames.ts";

/**
 * Returns a valid selector for a dataset with the specified key and optional
 * value.
 *
 * @param key Key or attribute name for the dataset entry.
 * @param [value] Optional value of the dataset entry.
 */
export function selectData(key: string, value?: Maybe<AttrValue>): string {
  const attrName = validDataAttrName(key);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attrName}]`;
  } else {
    const validValue = toAttrValue(value);
    return `[${attrName}="${validValue}"]`;
  }
}
