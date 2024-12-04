import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";

/**
 * Converts the `items` of type [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 * or [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
 * to an array.
 *
 * @template TN Tag name of elements in the returned array.
 *
 * @param items NodeList or HTMLCollection to convert to array.
 *
 * @returns Array of elements of type `TN`.
 */
export function listToArray<TN extends TagName = "*">(
  items: NodeListOf<ElementOf<TN>> | NodeList | HTMLCollection | null,
): ElementOf<TN>[] {
  if (isNil(items)) {
    return [];
  }

  const elements: ElementOf<TN>[] = [];
  for (let index = 0; index < items.length; index++) {
    elements.push(cast<ElementOf<TN>>(items.item(index)));
  }

  return elements;
}
