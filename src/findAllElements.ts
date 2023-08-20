import { getValidElement } from "./getValidElement.js";
import { listToArray } from "./listToArray.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Query the DOM for the elements that match that selector and return as an
 * array.
 * @param selector CSS selector string to find the element
 * @param [parent=document] Optional parent element to perform search
 */
export function findAllElements<T extends Element = HTMLElement>(
  selector: string,
  parent: ElementOrSelectorInput = document,
): T[] {
  try {
    const elements = getValidElement(parent)?.querySelectorAll(selector);

    return listToArray<T>(elements as NodeListOf<T>);
  } catch {
    return [];
  }
}
