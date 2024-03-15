import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Query the DOM for a specific element and return that element as the specified
 * type or null if not found.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent=document] Optional Element, Event, or selector for parent element.
 */
export function oneMatching<T extends Element = HTMLElement>(
  selector: string,
  parent: ElemOrSelectInput = document,
): T | null {
  try {
    const element = toValidElem(parent)?.querySelector(selector);

    return (element ?? null) as unknown as T;
  } catch {
    return null;
  }
}
