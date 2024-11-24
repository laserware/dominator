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
 * Returns an array of all {@link https://zellwk.com/blog/keyboard-focusable-elements/|focusable}
 * elements in either the Document (if no `parent` specified) or the specified
 * `parent`.
 *
 * @param [parent=document] Optional Element or EventTarget for parent.
 */
export function findAllFocusable(
  parent: Elem | null | undefined = document,
): HTMLElement[] {
  return findAllElems<HTMLElement>(focusableElementsSelector, parent);
}
