import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { ElementOrSelectorInput } from "../types.ts";

/**
 * Sets the attributes of the specified element to the specified attributes
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param attributes Object with key of attribute name and value of attribute value.
 */
export function setAttributes(
  element: ElementOrSelectorInput | null,
  attributes: Record<string, boolean | number | string>,
): void {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError("Unable to set attributes");
  }

  const attributeEntries = Object.entries(attributes);

  for (const [name, value] of attributeEntries) {
    validElement.setAttribute(name, value.toString());
  }
}
