import { isNil } from "@laserware/arcade";

import type { AnyElement } from "../dom.ts";

import { asElem } from "./asElem.ts";

/**
 * Converts the specified [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 * or [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
 * to an array.
 *
 * @typeParam E Type of Elements in the returned array.
 *
 * @param items NodeList or HTMLCollection to convert to array.
 *
 * @returns Array of Elements of type `E`.
 *
 * @category Elems
 */
export function listToArray<E extends AnyElement = HTMLElement>(
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
