import type { Elem } from "../types.ts";

import { findAllElems } from "./findAllElems.ts";

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
 * Searches for all focusable Elements in either the Document (if no `parent`
 * specified) or the specified `parent`.
 *
 * See [this article](https://zellwk.com/blog/keyboard-focusable-elements/) for
 * how focusable elements are determined.
 *
 * @param [parent=document] Optional Element or EventTarget for parent.
 *
 * @returns Array of focusable Elements in the optionally specified `parent`.
 */
export function findAllFocusable(
  parent: Elem | null | undefined = document,
): HTMLElement[] {
  // prettier-ignore
  return findAllElems<HTMLElement>(focusableElementsSelector, parent ?? document);
}
