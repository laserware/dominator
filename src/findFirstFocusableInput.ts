import { findAllElements } from "./findAllElements.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns the first focusable input element in the specified parent element.
 *
 * @param [parent=document] Optional Element, EventTarget, or selector for parent element.
 */
export function findFirstFocusableInput<T extends Element = HTMLElement>(
  parent: ElementOrSelectorInput = document,
): T | null {
  const focusableElements = findAllElements(`input, textarea, select`, parent);

  return (focusableElements.at(0) ?? null) as unknown as T;
}
