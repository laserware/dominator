import { getDataValue } from "./getDataValue";
import type { ElemOrSelectInput } from "../types";

/**
 * Returns true if the specified element has the dataset key with the specified
 * dataset value.
 *
 * @param input Element, Event, or selector for element.
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 * @param value Optional dataset value to check for.
 */
export function hasDataValue(
  input: ElemOrSelectInput | null,
  keyOrAttrName: string,
  value: string | number | boolean,
): boolean {
  const elemValue = getDataValue(input, keyOrAttrName);

  if (elemValue === null) {
    return false;
  } else {
    return elemValue.toString() === value.toString();
  }
}
