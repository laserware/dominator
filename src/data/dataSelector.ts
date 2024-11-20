import { isNil, isPlainObject } from "@laserware/arcade";

import { attrSelector } from "../attrs/attrSelector.ts";
import { stringifyAttributeValue } from "../internal/stringifyAttributeValue.ts";
import { validDataAttrName } from "../internal/validDataAttrName.ts";
import type {
  AnyElementTagName,
  CssSelector,
  Dataset,
  DatasetAttrName,
  DatasetKey,
  DatasetValue,
  NilOr,
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
  key: DatasetKey | DatasetAttrName,
  value: NilOr<DatasetValue>,
  tag?: AnyElementTagName | "",
): CssSelector;

export function dataSelector(
  keyOrDataset: Dataset | DatasetKey | DatasetAttrName,
  valueOrTag: NilOr<DatasetValue> | AnyElementTagName | "" = undefined,
  tag: AnyElementTagName | "" = "",
): CssSelector {
  if (isPlainObject(keyOrDataset)) {
    let selector = "";

    for (const key of Object.keys(keyOrDataset)) {
      selector += singleDataSelector(key, keyOrDataset[key]);
    }

    return `${valueOrTag ?? ""}${selector}`;
  } else {
    return `${tag}${singleDataSelector(keyOrDataset, valueOrTag)}`;
  }
}

function singleDataSelector(
  key: string,
  value: NilOr<DatasetValue>,
): CssSelector {
  const attrName = validDataAttrName(key);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attrName}]`;
  } else {
    const validValue = stringifyAttributeValue(value);

    return attrSelector({ [attrName]: validValue });
  }
}
