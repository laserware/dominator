import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Query the DOM for a specific element and return that element as the specified
 * type or null if not found.
 * @param selector CSS selector string to find the element
 * @param [parent=document] Optional parent element to perform search
 */
export function findOneElement<T = HTMLElement>(
  selector: string,
  parent: ElementInput = document,
): T | null {
  try {
    const element = asElement(parent)?.querySelector(selector);

    return (element ?? null) as unknown as T;
  } catch {
    return null;
  }
}
