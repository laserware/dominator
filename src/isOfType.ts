import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element matches the specified type.
 *
 * @param input Element, Event, or selector for element.
 * @param tagName Tag name to check for (e.g. `div`, `span`, etc.).
 */
export function isOfType(
  input: ElemOrSelectInput | null,
  tagName: string,
): boolean {
  try {
    const elem = toValidElem(input);

    return elem?.tagName?.toLowerCase() === tagName;
  } catch {
    return false;
  }
}
