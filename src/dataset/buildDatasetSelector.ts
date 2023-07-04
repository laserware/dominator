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
 * Returns a valid selector to find an element in the DOM based on its data
 * attribute.
 * @param datasetKey Key of the dataset entry
 * @param datasetValue Optional value of the dataset entry
 */
function validDatasetSelector(
  datasetKey: string,
  datasetValue?: string | number | boolean,
): string {
  const validKey = kebabCase(datasetKey);

  let selector = `[data-${validKey}]`;

  if (!isNil(datasetValue)) {
    let validValue = datasetValue;

    if (typeof datasetValue === "boolean") {
      validValue = datasetValue ? "true" : "false";
    } else if (typeof datasetValue === "number") {
      validValue = datasetValue.toString();
    }

    selector = `[data-${validKey}="${validValue}"]`;
  }

  return selector;
}
