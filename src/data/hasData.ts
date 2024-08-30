import { isNotNil } from "@laserware/arcade";

import { getValidElement } from "../getValidElement.ts";
import type { DataValue, ElemOrSelectorInput } from "../types.ts";

import { getData } from "./getData.ts";

/**
 * Returns true if the specified element has a dataset entry with the specified
 * key and optional value.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param key Key for the dataset entry.
 * @param value Optional dataset value to check for.
 */
export function hasData(
  input: ElemOrSelectorInput | null,
  key: string,
  value?: DataValue,
): boolean {
  try {
    const validElement = getValidElement(input);
    if (validElement === null) {
      return false;
    }

    const data = getData(input, key);

    if (isNotNil(value)) {
      return data === value;
    } else {
      return data !== null;
    }
  } catch {
    return false;
  }
}
