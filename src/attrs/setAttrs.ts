import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

/**
 * Sets the attributes of the specified element to the specified attributes
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @param input Element, Event, or selector for element.
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function setAttrs(
  input: ElemOrSelectInput | null,
  attrs: Record<string, boolean | number | string>,
): void {
  const elem = toValidElem(input);
  if (elem === null) {
    throw new InvalidElementError("Unable to set attributes");
  }

  for (const [name, value] of Object.entries(attrs)) {
    elem.setAttribute(name, value.toString());
  }
}
