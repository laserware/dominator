import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { ElementOrSelectorInput } from "../types.ts";

import { ensureDatasetKeyName } from "./datasetNames.ts";

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param keyOrAttributeName Key or attribute name for the dataset entry.
 * @param value Value to set for associated key or attribute name.
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
