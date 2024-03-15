import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

export interface SetFocusOptions {
  delay?: number;
  parent?: ElemOrSelectInput;
  preventScroll?: boolean;
}

/**
 * Sets focus to the specified element.
 *
 * @param input Element, Event, or selector for element to focus.
 * @param [delay=0] delay Delay for setting focus to element.
 * @param [parent=undefined] parent Element, Event, or selector for parent element.
 * @param [preventScroll=false] preventScroll If true, don't scroll the focused
 *                              element into view.
 */
export function setFocus(
  input: ElemOrSelectInput | null,
  { delay, parent, preventScroll }: SetFocusOptions = {
    delay: 0,
    parent: undefined,
    preventScroll: false,
  },
): void {
  if (input === null) {
    return;
  }

  const elem = toValidElem(input, parent);

  const focusCallback = (): void => {
    elem?.focus({ preventScroll });
  };

  setTimeout(focusCallback, delay);
}
