import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

/**
 * Assigns the specified dataset values to the specified element. Returns the
 * element with the updated dataset values if successful.
 *
 * @param input Element, Event, or selector for element.
 * @param dataValues Object with key of dataset key and value of dataset value.
 */
export function setDataValues<T extends Element = HTMLElement>(
  input: ElemOrSelectInput,
  dataValues: Record<string, boolean | number | string>,
): T {
  const elem = toValidElem(input);
  if (elem === null) {
    throw new InvalidElementError("Unable to set dataset values");
  }

  for (const [key, value] of Object.entries(dataValues)) {
    elem.dataset[key] = value.toString();
  }

  return elem as unknown as T;
}
