import { isNil } from "@laserware/arcade";

import { ensureDataAttrName } from "./dataNames";

/**
 * Returns a valid selector for a dataset with the specified key and optional
 * value.
 *
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 * @param value Optional value of the dataset entry.
 */
export function dataSelector(
  keyOrAttrName: string,
  value?: number | boolean | string | undefined,
): string {
  if (typeof value === "undefined") {
    return validDataSelector(keyOrAttrName);
  }

  if (value === null) {
    return validDataSelector(keyOrAttrName, "");
  }

  return validDataSelector(keyOrAttrName, value);
}

/**
 * Returns a valid selector to find an element in the DOM based on its `data`
 * attribute.
 *
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 * @param value Optional value of the dataset entry.
 */
function validDataSelector(
  keyOrAttrName: string,
  value?: string | number | boolean,
): string {
  const attributeName = ensureDataAttrName(keyOrAttrName);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attributeName}]`;
  } else {
    const validValue = validDataValue(value);
    return `[${attributeName}="${validValue}"]`;
  }
}

function validDataValue(value: string | number | boolean): string {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  } else if (typeof value === "number") {
    return value.toString();
  } else {
    return value;
  }
}
