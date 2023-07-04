import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Returns the value of the specified element.
 * @param element Element to get the value of
 */
export function getElementValue<T>(element: ElementInput | null): T | null {
  const validElement = asElement<HTMLInputElement>(element);
  if (validElement === null) {
    return null;
  }

  const validValue = validElement?.value ?? null;
  if (validValue === null) {
    return null;
  }

  return validValue as unknown as T;
}
