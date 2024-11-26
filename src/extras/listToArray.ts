import { isNil } from "@laserware/arcade";

import { asElem } from "../elems/asElem.ts";

/**
 * Converts the specified {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeList|NodeList}
 * or {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection|HTMLCollection}
 * to an array.
 *
 * @template E Type of Elements in the returned array.
 *
 * @param items NodeList or HTMLCollection to convert to array.
 *
 * @returns Array of Elements of type `E`.
 */
export function listToArray<E extends HTMLElement = HTMLElement>(
  items: NodeListOf<E> | NodeList | HTMLCollection | null,
): E[] {
  if (isNil(items)) {
    return [];
  }

  const elems: E[] = [];
  for (let index = 0; index < items.length; index++) {
    elems.push(asElem<E>(items.item(index)));
  }

  return elems;
}
