/**
 * Returns true if the specified element is currently scrollable.
 */
export function isElementScrollable<T extends HTMLElement>(
  element: T,
): boolean {
  return element.clientHeight < element.scrollHeight;
}
