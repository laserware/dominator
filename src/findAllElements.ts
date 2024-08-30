import { getValidElement } from "./getValidElement.ts";
import { listToArray } from "./listToArray.ts";
import type { ElemOrSelectorInput } from "./types.ts";

/**
 * Query the DOM for the elements that match that selector and return as an
 * array.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent=document] Optional parent element to perform search.
 */
export function findAllElements<T extends Element = HTMLElement>(
  selector: string,
  parent: ElemOrSelectorInput = document,
): T[] {
  try {
    const elements = getValidElement(parent)?.querySelectorAll(selector);

    return listToArray<T>(elements as NodeListOf<T>);
  } catch {
    return [];
  }
}
