import { getValidElement } from "../getValidElement.ts";
import type { ElemOrSelectorInput } from "../types.ts";

import { ensureDatasetKeyName } from "./datasetNames.ts";

/**
 * Returns the value associated with the specified dataset entry key. If the
 * value doesn't exist, return null.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param keyOrAttributeName Key or attribute name for the dataset entry.
 */
export function getDatasetValue<T = string>(
  element: ElemOrSelectorInput | null,
  keyOrAttributeName: string,
): T | null {
  try {
    const validElement = getValidElement(element);
    if (validElement === null) {
      return null;
    }

    const key = ensureDatasetKeyName(keyOrAttributeName);

    return (validElement?.dataset[key] ?? null) as T;
  } catch {
    return null;
  }
}
