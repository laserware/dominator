import { findAllElements } from "./findAllElements.js";
import type { ElementInput } from "./types.js";

/**
 * Returns the first focusable input element in the specified parent element.
 */
export function findFirstFocusableInput<T extends HTMLElement>(
  parent: ElementInput = document,
): T | null {
  const focusableElements = findAllElements(`input, textarea, select`, parent);

  return focusableElements[0] as unknown as T;
}
