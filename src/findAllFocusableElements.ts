import { findAllElements } from "./findAllElements.ts";
import type { ElemOrSelectorInput } from "./types.ts";

const focusableElementsSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "details",
  `[tabindex]:not([tabindex="-1"])`,
  `[disabled]:not([disabled="true"])`,
].join(",");

/**
 * Returns an array of all {@link https://zellwk.com/blog/keyboard-focusable-elements/|focusable}
 * elements in the specified parent.
 *
 * @param parent Optional Element, EventTarget, or selector for parent element.
 */
export function findAllFocusableElements(
  parent?: ElemOrSelectorInput,
): HTMLElement[] {
  return findAllElements<HTMLElement>(focusableElementsSelector, parent);
}
