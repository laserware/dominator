import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { Attrs, ElemOrSelectorInput } from "../types.ts";
import { safeStringify } from "../utilities.ts";

/**
 * Sets the attributes of the specified element to the specified attributes
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param attrs Object with key of attribute name and value of attribute value.
 */
export function setAttrs(
  input: ElemOrSelectorInput | null,
  attrs: Attrs,
): void {
  const validElement = getValidElement(input);
  if (validElement === null) {
    throw new InvalidElementError("Unable to set attributes");
  }

  for (const [name, value] of Object.entries(attrs)) {
    validElement.setAttribute(name, safeStringify(value));
  }
}
