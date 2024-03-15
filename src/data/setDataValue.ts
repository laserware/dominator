import { ensureDataKeyName } from "./dataNames";
import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 *
 * @param input Element, Event, or selector for element.
 * @param keyOrAttrName Key or attribute name for the dataset entry.
 * @param value Value to set for associated key or attribute name.
 */
export function setDataValue(
  input: ElemOrSelectInput,
  keyOrAttrName: string,
  value: boolean | number | string,
): void {
  const elem = toValidElem(input);
  if (elem === null) {
    // prettier-ignore
    throw new InvalidElementError(`Unable to set dataset key ${keyOrAttrName}`);
  }

  const key = ensureDataKeyName(keyOrAttrName);

  elem.dataset[key] = value.toString();
}
