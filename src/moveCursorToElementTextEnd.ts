import { asElement } from "./asElement.js";
import type { ElementInput } from "./types.js";

/**
 * Moves the cursor to the end of the text in an element.
 * @param element Element containing text
 * @param [parent] Optional parent element of the specified element
 */
export function moveCursorToElementTextEnd(
  element: ElementInput | null,
  parent: ElementInput | null = document,
): void {
  const validElement = asElement(element, { parent });
  if (validElement === null) {
    return;
  }

  // We're wrapping this in a setTimeout here to ensure that any state changes
  // to the element are completed _before_ attempting to move the cursor to
  // the end of the element text:
  setTimeout(() => {
    const range = document.createRange();
    range.selectNodeContents(validElement);
    range.collapse(false);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  });
}
