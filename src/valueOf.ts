import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns the value of the specified element.
 * @param input Element, Event, or selector for element
 */
export function valueOf<T>(input: ElemOrSelectInput | null): T | null {
  const elem = toValidElem<HTMLInputElement>(input);
  if (elem === null) {
    return null;
  }

  const elemValue = elem?.value ?? null;
  if (elemValue === null) {
    return null;
  }

  return elemValue as unknown as T;
}
