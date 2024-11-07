import type { ElemOrCssSelector, Maybe } from "../types.ts";

import { findAll } from "./findAll.ts";

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
export function findAllFocusable(
  parent?: Maybe<ElemOrCssSelector>,
): HTMLElement[] {
  return findAll<HTMLElement>(focusableElementsSelector, parent);
}
