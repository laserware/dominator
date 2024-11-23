import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Moves the cursor in the specified `target` to the end of the text.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [parent=document] Optional Element, EventTarget, or CSS selector for parent.
 */
export function moveCursorToTextEnd<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  parent: NullOr<ElemOrCssSelector> = document,
): NullOr<E> {
  const elem = toElem<E>(target, parent);
  if (elem === null) {
    return null;
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

  return elem;
}
