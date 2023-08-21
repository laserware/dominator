import { getValidElement } from "../getValidElement.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Sets the attributes of the specified element to the specified attributes
 * object, where the key of the object is the attribute name and the value of
 * the object is the attribute value.
 * @param element Element, event, or selector to set attribute of
 * @param attributes Object with key of attribute name and value of attribute value
 */
export function setAttributes(
  element: ElementOrSelectorInput | null,
  attributes: Record<string, boolean | number | string>,
): void {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new Error("Unable to set attributes on element, element not found");
  }

  const attributeEntries = Object.entries(attributes);

  for (const [name, value] of attributeEntries) {
    validElement.setAttribute(name, value.toString());
  }
}
