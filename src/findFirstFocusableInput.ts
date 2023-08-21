import { findAllElements } from "./findAllElements.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns the first focusable input element in the specified parent element.
 * @param [parent=document] Optional Element, Event, or selector for parent element
 */
export function findFirstFocusableInput<T extends Element = HTMLElement>(
  parent: ElementOrSelectorInput = document,
): T | null {
  const focusableElements = findAllElements(`input, textarea, select`, parent);

  return (focusableElements.at(0) ?? null) as unknown as T;
}
