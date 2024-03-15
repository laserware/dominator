import { toValidElem } from "./internal/toValidElem";
import { listToArray } from "./listToArray";
import type { ElemOrSelectInput } from "./types";

/**
 * Query the DOM for the elements that match that selector and return as an
 * array.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent=document] Optional parent element to perform search.
 */
export function allMatching<T extends Element = HTMLElement>(
  selector: string,
  parent: ElemOrSelectInput = document,
): T[] {
  try {
    const elems = toValidElem(parent)?.querySelectorAll(selector);

    return listToArray<T>(elems as NodeListOf<T>);
  } catch {
    return [];
  }
}
