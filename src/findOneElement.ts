import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Query the DOM for a specific element and return that element as the specified
 * type or null if not found.
 * @param selector CSS selector string to find the element
 * @param [parent=document] Optional Element, Event, or selector for parent element
 */
export function findOneElement<T extends Element = HTMLElement>(
  selector: string,
  parent: ElementOrSelectorInput = document,
): T | null {
  try {
    const element = getValidElement(parent)?.querySelector(selector);

    return (element ?? null) as unknown as T;
  } catch {
    return null;
  }
}
