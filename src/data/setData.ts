import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { DataValue, ElemOrSelectorInput } from "../types.ts";

import { safeStringify } from "../utilities.ts";

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param data Key or attribute name for the dataset entry.
 */
export function setData(
  input: ElemOrSelectorInput,
  data: Record<string, DataValue>,
): void {
  const validElement = getValidElement(input);
  if (validElement === null) {
    // prettier-ignore
    throw new InvalidElementError(`Unable to set dataset`);
  }

  for (const [name, value] of Object.entries(data)) {
    validElement.dataset[name] = safeStringify(value);
  }
}
