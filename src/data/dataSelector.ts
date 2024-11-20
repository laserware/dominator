import { isNil, isPlainObject } from "@laserware/arcade";

import { attrSelector } from "../attrs/attrSelector.ts";
import { toAttrValue } from "../internal/toAttrValue.ts";
import { validDataAttrName } from "../internal/validDataAttrName.ts";
import type {
  AnyElementTagName,
  CssSelector,
  Dataset,
  DatasetValue,
  Maybe,
} from "../types.ts";

/**
 * Returns a CSS selector string for the specified dataset object. Note that the
 * values of the dataset object are coerced to a string and null excludes a value
 * but only includes a key.
 *
 * @param dataset Object with key of dataset key and value of dataset value.
 * @param [tag] Optional tag name for the element.
 *
 * @example Dataset Object With `null` Value
 * const selector = dataSelector({ someThing: null });
 * // `[data-some-thing]`
 *
 * @example Dataset Object With Value
 * const selector = dataSelector({ someThing: "stuff" });
 * // `[data-some-thing="stuff"]`
 *
 * @example Dataset Object With Value and Tag
 * const selector = dataSelector({ someThing: "stuff", otherThing: "doodles" }, "a");
 * // `a[data-some-thing="stuff"][data-other-thing="doodles"]`
 */
export function dataSelector(
  dataset: Dataset,
  tag?: AnyElementTagName | "",
): string;

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
  value: Maybe<DatasetValue>,
  tag?: AnyElementTagName | "",
): CssSelector;

export function dataSelector(
  dataOrKey: Dataset | string,
  valueOrTag: Maybe<DatasetValue> | AnyElementTagName | "" = undefined,
  tag: AnyElementTagName | "" = "",
): CssSelector {
  if (isPlainObject(dataOrKey)) {
    let selector = "";

    for (const key of Object.keys(dataOrKey)) {
      selector += singleDataSelector(key, dataOrKey[key]);
    }

    return `${valueOrTag ?? ""}${selector}`;
  } else {
    return `${tag}${singleDataSelector(dataOrKey, valueOrTag)}`;
  }
}

function singleDataSelector(
  key: string,
  value: Maybe<DatasetValue>,
): CssSelector {
  const attrName = validDataAttrName(key);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attrName}]`;
  } else {
    const validValue = toAttrValue(value);

    return attrSelector({ [attrName]: validValue });
  }
}
