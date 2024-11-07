import { listToArray } from "../listToArray.ts";
import type { CssSelector, ElemOrCssSelector, Maybe } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM for the elements that match that selector and return as an
 * array.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent=document] Optional parent element to perform search.
 */
export function findAll<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent: Maybe<ElemOrCssSelector> = document,
): E[] {
  try {
    const elements = toElem(parent)?.querySelectorAll(selector);

    return listToArray<E>(elements as NodeListOf<E>);
  } catch {
    return [];
  }
}
