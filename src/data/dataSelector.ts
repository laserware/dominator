import { isNil } from "@laserware/arcade";

import { attrSelector } from "../attrs/attrSelector.ts";
import { toAttrValue } from "../attrs/internal.ts";
import type { AnyElementTagName, AttrValue, Maybe } from "../types.ts";

import { validDataAttrName } from "./internal.ts";

/**
 * Returns a valid selector for a dataset with the specified key and optional
 * value.
 *
 * @param key Key or attribute name for the dataset entry.
 * @param [value] Optional value of the dataset entry.
 * @param [tag] Optional tag name for the element.
 *
 * @example Dataset Key Without Value
 * const selector = dataSelector("someThing");
 * // `[data-some-thing]`
 *
 * @example `data-` Attribute Name Without Value
 * const selector = dataSelector("data-some-thing");
 * // `[data-some-thing]`
 *
 * @example Dataset Key With Value
 * const selector = dataSelector("someThing", "stuff");
 * // `[data-some-thing="stuff"]`
 *
 * @example `data-` Attribute Name With Value and Tag
 * const selector = dataSelector("data-some-thing", "stuff", "a");
 * // `a[data-some-thing="stuff"]`
 */
export function dataSelector(
  key: string,
  value: Maybe<AttrValue> = undefined,
  tag: AnyElementTagName | "" = "",
): string {
  const attrName = validDataAttrName(key);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `${tag}[${attrName}]`;
  } else {
    const validValue = toAttrValue(value);

    return attrSelector({ [attrName]: validValue }, tag);
  }
}
