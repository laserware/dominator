import { isNil } from "@laserware/arcade";

import { attrSelector } from "../attr/attrsSelector.ts";
import { asDataAttrName } from "../internal/dataKeys.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";
import type {
  AnyElementTagName,
  CssSelector,
  Data,
  DataKey,
  DataValue,
} from "../types.ts";

/**
 * Attempts to build a valid selector for a dataset with the specified `key` and
 * optional `value`. If `tag` is specified, it is included in the resulting selector.
 *
 * @param key Property or attribute name for the dataset entry.
 * @param [value] Optional value of the dataset entry.
 * @param [tag] Optional tag name for the element.
 *
 * @returns CSS selector based on the specified `key` and optional `value`.
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
export function dataEntrySelector(
  key: DataKey,
  value?: DataValue | null | undefined,
  tag?: AnyElementTagName,
): CssSelector {
  return selectorWithTag(singleDataSelector(key, value), tag);
}

/**
 * Attempts to build a CSS selector string for the specified `data` object. Note
 * that the values of the `data` object are coerced to a string and `null` excludes
 * a value but only includes a key. If `tag` is specified, it is included in the
 * resulting selector.
 *
 * @param data Object with key of dataset key and value of dataset value.
 * @param [tag] Optional tag name for the element.
 *
 * @returns CSS selector based on the specified `data`.
 *
 * @example Dataset Object With `null` Value
 * const selector = dataSelector({ someThing: null });
 * // `[data-some-thing]`
 *
 * @example Data Object With Value
 * const selector = dataSelector({ someThing: "stuff" });
 * // `[data-some-thing="stuff"]`
 *
 * @example Data Object With Value and Tag
 * const selector = dataSelector({ someThing: "stuff", otherThing: "doodles" }, "a");
 * // `a[data-some-thing="stuff"][data-other-thing="doodles"]`
 */
export function dataSelector(data: Data, tag?: AnyElementTagName): CssSelector {
  let selector = "";

  for (const key of Object.keys(data)) {
    selector += singleDataSelector(key, data[key]);
  }

  return selectorWithTag(selector, tag);
}

function singleDataSelector(
  key: string,
  value: DataValue | null | undefined,
): CssSelector {
  const attrName = asDataAttrName(key);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attrName}]`;
  } else {
    return attrSelector(attrName, value);
  }
}
