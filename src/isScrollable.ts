import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element is currently scrollable.
 *
 * @param input Element, Event, or selector for element.
 */
export function isScrollable(input: ElemOrSelectInput | null): boolean {
  const elem = toValidElem<HTMLElement>(input);
  if (elem === null) {
    return false;
  }

  try {
    return elem.clientHeight < elem.scrollHeight;
  } catch {
    return false;
  }
}
