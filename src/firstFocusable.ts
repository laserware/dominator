import { allFocusable } from "./allFocusable";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns the first focusable input element in the specified parent element.
 *
 * @param [input=document] Optional Element, Event, or selector for parent element.
 */
export function firstFocusable<T extends Element = HTMLElement>(
  input: ElemOrSelectInput = document,
): T | null {
  const focusable = allFocusable(input);

  return (focusable.at(0) ?? null) as unknown as T;
}
