import { isNil } from "@laserware/arcade";

/**
 * Converts the specified {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeList|NodeList}
 * or {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection|HTMLCollection}
 * to an array.
 *
 * @template E Element types with the returned array.
 *
 * @param items `NodeList` or `HTMLCollection` to convert to array.
 */
export function listToArray<E extends Element = HTMLElement>(
  items: NodeListOf<E> | NodeList | HTMLCollection | null,
): E[] {
  if (isNil(items)) {
    return [];
  }

  const elements: E[] = [];
  for (let index = 0; index < items.length; index++) {
    elements.push(items.item(index) as unknown as E);
  }

  return elements;
}
