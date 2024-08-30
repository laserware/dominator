import { getValidElement } from "../getValidElement.ts";
import type { ElemOrSelectorInput } from "../types.ts";

/**
 * Returns the value associated with the specified dataset entry key. If the
 * value doesn't exist, return null.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param key Key for the dataset entry.
 */
export function getData<T = string>(
  input: ElemOrSelectorInput | null,
  key: string,
): T | null {
  try {
    const validElement = getValidElement(input);
    if (validElement === null) {
      return null;
    }

    return (validElement?.dataset[key] ?? null) as T;
  } catch {
    return null;
  }
}
