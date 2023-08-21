import { getValidElement } from "../getValidElement.js";
import { InvalidElementError } from "../InvalidElementError.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Assigns the specified dataset values to the specified element. Returns the
 * element with the updated dataset values if successful.
 * @param element Element, Event, or selector for element
 * @param datasetValues Object with key of dataset key and value of dataset value
 */
export function setDatasetValues<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput,
  datasetValues: Record<string, boolean | number | string>,
): T {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError("Unable to set dataset values");
  }

  for (const [key, value] of Object.entries(datasetValues)) {
    validElement.dataset[key] = value.toString();
  }

  return validElement as unknown as T;
}
