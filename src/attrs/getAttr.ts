import { getValidElement } from "../getValidElement.ts";
import type { ElemOrSelectorInput } from "../types.ts";

/**
 * Returns the value of the specified attribute name in the specified element.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If a default value is
 * specified, returns if not found. Otherwise, it returns null if not found.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param name Name of the attribute to get.
 * @param [defaultValue] Optional default value to return if the attribute is not found.
 */
export function getAttr<T extends boolean | number | string>(
  input: ElemOrSelectorInput | null,
  name: string,
  defaultValue?: T,
): T | null {
  const validElement = getValidElement(input);
  if (validElement === null) {
    return defaultValue ?? null;
  }

  const attrValue = validElement.getAttribute(name);
  if (attrValue === null) {
    return defaultValue ?? null;
  }

  if (attrValue === "true" || attrValue === "false") {
    return (attrValue === "true") as T;
  }

  const numericValue = Number(attrValue);
  if (Number.isNaN(numericValue)) {
    return attrValue as T;
  } else {
    return numericValue as T;
  }
}
