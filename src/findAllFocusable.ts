import { findAll } from "./findAll";
import type { ElemOrSelectInput } from "./types";

const inputsSelector = "input,textarea,select";

// prettier-ignore
const allElemsSelector = `${inputsSelector},a,button,details,[tabindex]:not([tabindex="-1"]),[disabled]:not([disabled="true"])`;

export type FocusableOptions = {
  parent?: ElemOrSelectInput;
  inputsOnly?: boolean;
};

/**
 * Returns an array of all focusable elements in the specified parent.
 *
 * @param [parent=document] Element, Event, or selector for parent element.
 * @param [inputsOnly=false] Limit focusable elements to inputs.
 *
 * @see https://zellwk.com/blog/keyboard-focusable-elements/
 */
export function findAllFocusable(
  { parent, inputsOnly }: FocusableOptions = {
    parent: document,
    inputsOnly: false,
  },
): HTMLElement[] {
  const selector = inputsOnly ? inputsSelector : allElemsSelector;

  return findAll<HTMLElement>(selector, parent);
}
