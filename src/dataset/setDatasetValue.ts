import { ensureDatasetKeyName } from "./datasetNames.js";
import { getValidElement } from "../getValidElement.js";
import { InvalidElementError } from "../InvalidElementError.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 * @param element Element, Event, or selector for element
 * @param keyOrAttributeName Key or attribute name for the dataset entry
 * @param value Value to set for associated key or attribute name
 */
export function setDatasetValue(
  element: ElementOrSelectorInput,
  keyOrAttributeName: string,
  value: boolean | number | string,
): void {
  const validElement = getValidElement(element);
  if (validElement === null) {
    // prettier-ignore
    throw new InvalidElementError(`Unable to set dataset key ${keyOrAttributeName}`);
  }

  const key = ensureDatasetKeyName(keyOrAttributeName);

  validElement.dataset[key] = value.toString();
}
