import { isNil } from "@laserware/arcade";

import { selectAttribute } from "../attributes/selectAttributes.ts";
import type { CssSelector } from "../css/types.ts";
import type { TagName } from "../dom.ts";
import { asDataAttrName } from "../internal/dataKeys.ts";
import { selectorWithTag } from "../internal/selectorWithTag.ts";

import type { Data, DataKey, DataValue } from "./types.ts";

/**
 * Attempts to build a valid selector for a dataset with the specified `key` and
 * optional `value`. If `tagName` is specified, it is included in the resulting
 * selector.
 *
 * @param key Property or attribute name for the dataset entry.
 * @param [value] Optional value of the dataset entry.
 * @param [tagName] Optional tag name for the element.
 *
 * @returns CSS selector based on the specified `key` and optional `value`.
 *
 * @example
 * **Dataset Key without Value**
 *
 * ```ts
 * selectDataEntry("someThing");
 * // `[data-some-thing]`
 * ```
 *
 * **`data-` Attribute Name without Value**
 *
 * ```ts
 * selectDataEntry("data-some-thing");
 * // `[data-some-thing]`
 * ```
 *
 * **Dataset Key with Value**
 *
 * ```ts
 * selectDataEntry("someThing", "stuff");
 * // `[data-some-thing="stuff"]`
 * ```
 *
 * **`data-` Attribute Name with Value and Tag**
 *
 * ```ts
 * selectDataEntry("data-some-thing", "stuff", "a");
 * // `a[data-some-thing="stuff"]`
 * ```
 */
export function selectDataEntry(
  key: DataKey,
  value?: DataValue | null | undefined,
  tagName?: TagName,
): CssSelector {
  return selectorWithTag(selectSingleDataEntry(key, value), tagName);
}

/**
 * Attempts to build a CSS selector string for the specified `data` object. Note
 * that the values of the `data` object are coerced to a string and `null` excludes
 * a value but only includes a key. If `tagName` is specified, it is included in
 * the resulting selector.
 *
 * @param data Object with key of dataset key and value of dataset value.
 * @param [tagName] Optional tag name for the element.
 *
 * @returns CSS selector based on the specified `data`.
 *
 * @example
 * **Dataset Object With `null` Value**
 *
 * ```ts
 * selectData({ someThing: null });
 * // `[data-some-thing]`
 * ```
 *
 * **Data Object with Value**
 *
 * ```ts
 * selectData({ someThing: "stuff" });
 * // `[data-some-thing="stuff"]`
 * ```
 *
 * **Data Object with Value and Tag**
 *
 * ```ts
 * selectData({ someThing: "stuff", otherThing: "doodles" }, "a");
 * // `a[data-some-thing="stuff"][data-other-thing="doodles"]`
 * ```
 */
export function selectData(data: Data, tagName?: TagName): CssSelector {
  let selector = "";

  for (const key of Object.keys(data)) {
    selector += selectSingleDataEntry(key, data[key]);
  }

  return selectorWithTag(selector, tagName);
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
    return selectAttribute(attrName, value);
  }
}
