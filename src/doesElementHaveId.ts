import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Returns true if the specified element has the specified ID property.
 */
export function doesElementHaveId(element: ElementInput, id: string): boolean {
  const validElement = asElement<HTMLInputElement>(element);
  if (validElement === null) {
    return false;
  }

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return validElement.id === validId;
}
