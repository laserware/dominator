import { isNotNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key.
 * @param element Selector, element, or event to check
 * @param datasetKey Dataset key to check for
 */
export function hasDatasetKey(
  element: ElementOrSelectorInput | null,
  datasetKey: string,
): boolean {
  try {
    const validElement = getValidElement(element);

    if (datasetKey.startsWith("data-")) {
      return validElement?.hasAttribute(datasetKey) ?? false;
    } else {
      return isNotNil(validElement?.dataset[datasetKey]);
    }
  } catch {
    return false;
  }
}
