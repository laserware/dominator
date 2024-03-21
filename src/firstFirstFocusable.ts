import { findAllFocusable, type FocusableOptions } from "./findAllFocusable";

/**
 * Returns the first focusable element in the specified parent element.
 *
 * @param [parent=document] Optional Element, Event, or selector for parent element.
 * @param [inputsOnly=false] Limit focusable elements to inputs.
 */
export function firstFirstFocusable<T extends Element = HTMLElement>(
  { parent, inputsOnly }: FocusableOptions = {
    parent: document,
    inputsOnly: false,
  },
): T | null {
  const focusable = findAllFocusable({ parent, inputsOnly });

  return (focusable.at(0) ?? null) as unknown as T;
}
