import { isNotNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.ts";
import type { ElementOrSelectorInput } from "../types.ts";

import { ensureDatasetKeyName } from "./datasetNames.ts";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key or attribute name.
 * @param element Element, Event, or selector for element
 * @param keyOrAttributeName Key or attribute name for the dataset entry
 */
export function hasDatasetKey(
  element: ElementOrSelectorInput | null,
  keyOrAttributeName: string,
): boolean {
  try {
    const validElement = getValidElement(element);
    if (validElement === null) {
      return false;
    }

    const key = ensureDatasetKeyName(keyOrAttributeName);

    return isNotNil(validElement.dataset?.[key]);
  } catch {
    return false;
  }
}
