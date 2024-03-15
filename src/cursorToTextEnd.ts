import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Moves the cursor to the end of the text in an element.
 *
 * @param input Element, Event, or selector for element.
 * @param [parent] Optional Element, Event, or selector for parent element.
 */
export function cursorToTextEnd(
  input: ElemOrSelectInput | null,
  parent: ElemOrSelectInput | null = document,
): void {
  const elem = toValidElem(input, parent);
  if (elem === null) {
    return;
  }

  // We're wrapping this in a setTimeout here to ensure that any state changes
  // to the element are completed _before_ attempting to move the cursor to
  // the end of the element text:
  setTimeout(() => {
    const range = document.createRange();
    range.selectNodeContents(elem);
    range.collapse(false);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  });
}
