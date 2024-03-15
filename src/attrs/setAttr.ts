import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string.
 *
 * @param input Element, Event, or selector for element.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 */
export function setAttr(
  input: ElemOrSelectInput | null,
  name: string,
  value: boolean | number | string,
): void {
  const elem = toValidElem(input);

  if (elem === null) {
    throw new InvalidElementError(`Unable to set attribute ${name}`);
  }

  elem.setAttribute(name, value.toString());
}
