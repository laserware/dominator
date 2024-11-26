import { isNil } from "@laserware/arcade";

import { selectAttr } from "../attr/selectAttrs.ts";
import { asDataAttrName } from "../internal/dataKeys.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";
import type {
  CssSelector,
  Data,
  DataKey,
  DataValue,
  TagName,
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
 * const selector = selectDataEntry("someThing");
 * // `[data-some-thing]`
 *
 * @example `data-` Attribute Name Without Value
 * const selector = selectDataEntry("data-some-thing");
 * // `[data-some-thing]`
 *
 * @example Dataset Key With Value
 * const selector = selectDataEntry("someThing", "stuff");
 * // `[data-some-thing="stuff"]`
 *
 * @example `data-` Attribute Name With Value and Tag
 * const selector = selectDataEntry("data-some-thing", "stuff", "a");
 * // `a[data-some-thing="stuff"]`
 */
export function selectDataEntry(
  key: DataKey,
  value?: DataValue | null | undefined,
  tag?: TagName,
): CssSelector {
  return selectorWithTag(selectSingleDataEntry(key, value), tag);
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
 * const selector = selectData({ someThing: null });
 * // `[data-some-thing]`
 *
 * @example Data Object With Value
 * const selector = selectData({ someThing: "stuff" });
 * // `[data-some-thing="stuff"]`
 *
 * @example Data Object With Value and Tag
 * const selector = selectData({ someThing: "stuff", otherThing: "doodles" }, "a");
 * // `a[data-some-thing="stuff"][data-other-thing="doodles"]`
 */
export function selectData(data: Data, tag?: TagName): CssSelector {
  let selector = "";

  for (const key of Object.keys(data)) {
    selector += selectSingleDataEntry(key, data[key]);
  }

  return selectorWithTag(selector, tag);
}

function selectSingleDataEntry(
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
    return selectAttr(attrName, value);
  }
}
