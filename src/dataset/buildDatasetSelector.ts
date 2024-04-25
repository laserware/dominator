import { isNil } from "@laserware/arcade";

import { ensureDatasetAttributeName } from "./datasetNames.ts";

/**
 * Returns a valid selector for a dataset with the specified key and optional
 * value.
 * @param keyOrAttributeName Key or attribute name for the dataset entry
 * @param value Optional value of the dataset entry
 */
export function buildDatasetSelector(
  keyOrAttributeName: string,
  value?: number | boolean | string | undefined,
): string {
  if (typeof value === "undefined") {
    return validDatasetSelector(keyOrAttributeName);
  }

  if (value === null) {
    return validDatasetSelector(keyOrAttributeName, "");
  }

  return validDatasetSelector(keyOrAttributeName, value);
}

/**
 * Returns a valid selector to find an element in the DOM based on its `data`
 * attribute.
 * @param keyOrAttributeName Key or attribute name for the dataset entry
 * @param value Optional value of the dataset entry
 */
function validDatasetSelector(
  keyOrAttributeName: string,
  value?: string | number | boolean,
): string {
  const attributeName = ensureDatasetAttributeName(keyOrAttributeName);

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(value)) {
    return `[${attributeName}]`;
  } else {
    const validValue = validDatasetValue(value);
    return `[${attributeName}="${validValue}"]`;
  }
}

function validDatasetValue(value: string | number | boolean): string {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  } else if (typeof value === "number") {
    return value.toString();
  } else {
    return value;
  }
}
