import type { ElementOrSelectorInput } from "../types.ts";

import { getDatasetValue } from "./getDatasetValue.ts";

/**
 * Returns true if the specified element has the dataset key with the specified
 * dataset value.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param keyOrAttributeName Key or attribute name for the dataset entry.
 * @param value Optional dataset value to check for.
 */
export function hasDatasetValue(
  element: ElementOrSelectorInput | null,
  keyOrAttributeName: string,
  value: string | number | boolean,
): boolean {
  const elementValue = getDatasetValue(element, keyOrAttributeName);

  if (elementValue === null) {
    return false;
  } else {
    return elementValue.toString() === value.toString();
  }
}
