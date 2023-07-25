import { isNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.js";
import type { ElementInput } from "../types.js";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key.
 * @param element Selector, element, or event to check
 * @param datasetKey Dataset key to check for
 */
export function hasDatasetKey(
  element: ElementInput | null,
  datasetKey: string,
): boolean {
  try {
    const validElement = getValidElement(element);

    return !isNil(validElement?.dataset[datasetKey]);
  } catch {
    return false;
  }
}
