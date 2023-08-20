import { isNil, kebabCase } from "@laserware/arcade";

/**
 * Returns a valid selector for a dataset with the specified key and optional
 * value.
 * @param datasetKey Key of the dataset entry
 * @param datasetValue Optional value of the dataset entry
 */
export function buildDatasetSelector(
  datasetKey: string,
  datasetValue?: number | boolean | string | undefined,
): string {
  if (typeof datasetValue === "undefined") {
    return validDatasetSelector(datasetKey);
  }

  if (datasetValue === null) {
    return validDatasetSelector(datasetKey, "");
  }

  return validDatasetSelector(datasetKey, datasetValue);
}

/**
 * Returns a valid selector to find an element in the DOM based on its `data`
 * attribute.
 * @param datasetKey Key of the dataset entry
 * @param datasetValue Optional value of the dataset entry
 */
function validDatasetSelector(
  datasetKey: string,
  datasetValue?: string | number | boolean,
): string {
  // If the datasetKey already starts with `data-`, we don't need to change it,
  // we can use it as is:
  let name = datasetKey;

  // Otherwise, we need to convert it to a valid dataset selector, so assuming
  // the specified key was `someKey`, we need to convert it to `data-some-key`
  // in order to use it as a selector:
  if (!datasetKey.startsWith("data-")) {
    name = `data-${kebabCase(datasetKey)}`;
  }

  // If a value was specified, that's what we want to search by. So for key
  // of `someKey` and value of `someValue`, we would return `[data-some-key="someValue"]`,
  // otherwise we would just return `[data-some-key]`:
  if (isNil(datasetValue)) {
    return `[${name}]`;
  } else {
    const value = validDatasetValue(datasetValue);
    return `[${name}="${value}"]`;
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
