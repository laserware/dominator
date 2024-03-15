import { allMatching } from "./allMatching";
import type { ElemOrSelectInput } from "./types";

// prettier-ignore
const focusableElemsSelector = `a,button,input,textarea,select,details,[tabindex]:not([tabindex="-1"]),[disabled]:not([disabled="true"])`;

/**
 * Returns an array of all focusable elements in the specified parent.
 *
 * @param parent Element, Event, or selector for parent element.
 *
 * @see https://zellwk.com/blog/keyboard-focusable-elements/
 */
export function allFocusable(parent?: ElemOrSelectInput): HTMLElement[] {
  return allMatching<HTMLElement>(focusableElemsSelector, parent);
}
