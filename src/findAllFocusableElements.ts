import { findAllElements } from "./findAllElements.js";
import type { ElementOrSelectorInput } from "./types.js";

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
 * Returns an array of all focusable elements in the specified parent.
 * @see https://zellwk.com/blog/keyboard-focusable-elements/
 */
export function findAllFocusableElements(
  parent?: ElementOrSelectorInput,
): HTMLElement[] {
  return findAllElements<HTMLElement>(focusableElementsSelector, parent);
}
