/**
 * Returns true if the specified element is currently scrollable.
 */
export function isElementScrollable<T extends Element = HTMLElement>(
  element: T,
): boolean {
  try {
    return element.clientHeight < element.scrollHeight;
  } catch {
    return false;
  }
}
