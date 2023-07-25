import { isNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.js";
import type { ElementInput } from "../types.js";

/**
 * Returns the value associated with the specified dataset entry key. If the
 * value doesn't exist, return null.
 * @param element Selector, element, or event to search dataset
 * @param datasetKey Key of the dataset entry for which to get value
 */
export function getDatasetValue<T = string>(
  element: ElementInput | null,
  datasetKey: string,
): T | null {
  try {
    const validElement = getValidElement(element);

    const value = validElement?.dataset[datasetKey];

    return isNil(value) ? null : (value as unknown as T);
  } catch {
    return null;
  }
}
