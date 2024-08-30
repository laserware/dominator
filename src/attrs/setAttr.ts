import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { AttrValue, ElemOrSelectorInput } from "../types.ts";
import { safeStringify } from "../utilities.ts";

/**
 * Sets the specified attribute name of the specified element to the specified
 * value. The value is coerced to a string.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 */
export function setAttr(
  input: ElemOrSelectorInput | null,
  name: string,
  value: AttrValue,
): void {
  const validElement = getValidElement(input);
  if (validElement === null) {
    throw new InvalidElementError(`Unable to set attribute ${name}`);
  }

  validElement.setAttribute(name, safeStringify(value));
}
