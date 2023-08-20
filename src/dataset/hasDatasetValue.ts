import { isNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Returns true if the specified element has the dataset key with the specified
 * dataset value.
 * @param element Selector, element, or event to check
 * @param datasetKey Dataset key to check for
 * @param datasetValue Optional dataset value to check for
 */
export function hasDatasetValue(
  element: ElementOrSelectorInput | null,
  datasetKey: string,
  datasetValue: string | number | boolean,
): boolean {
  try {
    const validElement = getValidElement(element);

    let datasetEntry;

    if (datasetKey.startsWith("data-")) {
      datasetEntry = validElement?.getAttribute(datasetKey);
    } else {
      datasetEntry = validElement?.dataset[datasetKey];
    }

    if (isNil(datasetEntry)) {
      return false;
    }

    return datasetEntry.toString() === datasetValue.toString();
  } catch {
    return false;
  }
}
