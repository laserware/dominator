import { getValidElement } from "../getValidElement.ts";
import type { ElemOrSelectorInput } from "../types.ts";

/**
 * Returns true if the specified element has the specified attribute.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param name Name of the attribute to check for.
 */
export function hasAttr(
  input: ElemOrSelectorInput | null,
  name: string,
): boolean {
  return getValidElement(input)?.hasAttribute(name) ?? false;
}
