import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element has the specified ID property.
 *
 * @param input Element, Event, or selector for element.
 * @param id ID to check for element.
 */
export function hasId(input: ElemOrSelectInput, id: string): boolean {
  const elem = toValidElem<HTMLInputElement>(input);
  if (elem === null) {
    return false;
  }

  // Clear the `#` in case the ID CSS selector is part of the string:
  return elem.id === id.replace("#", "");
}
