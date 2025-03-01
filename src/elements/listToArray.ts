import { cast, isNil } from "@laserware/arcade";

/**
 * Converts the `items` of type [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 * or [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
 * to an array.
 *
 * @template E Type of elements in the returned array.
 *
 * @param items NodeList or HTMLCollection to convert to array.
 *
 * @returns Array of elements of type `E`.
 */
export function listToArray<E extends Element = HTMLElement>(
  items: NodeListOf<E> | NodeList | HTMLCollection | null,
): E[] {
  if (isNil(items)) {
    return [];
  }

  const elements: E[] = [];
  for (let index = 0; index < items.length; index++) {
    elements.push(cast<E>(items.item(index)));
  }

  return elements;
}
