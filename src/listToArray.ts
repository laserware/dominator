import { isNil } from "@laserware/arcade";

/**
 * Converts the specified NodeList or HTMLCollection to an array to be able to
 * utilize array methods.
 * @param items NodeList or HTMLCollection to convert to array
 */
export function listToArray<T extends Element>(
  items: NodeListOf<T> | NodeList | HTMLCollection | null,
): T[] {
  if (isNil(items)) {
    return [];
  }

  const elements: T[] = [];
  for (let index = 0; index < items.length; index++) {
    elements.push(items.item(index) as unknown as T);
  }

  return elements;
}
