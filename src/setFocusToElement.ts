import { getValidElement } from "./getValidElement.ts";
import type { ElemOrSelectorInput } from "./types.ts";

export interface SetFocusOptions {
  delay?: number;
  parent?: ElemOrSelectorInput;
  preventScroll?: boolean;
}

/**
 * Sets focus to the specified element.
 *
 * @param element Element, EventTarget, or selector for element to focus.
 * @param [options] Options for setting focus.
 * @property [options.delay] delay Delay for setting focus to element.
 * @property [options.parent] parent Element, EventTarget, or selector for parent element.
 * @property [options.preventScroll] preventScroll If true, don't scroll the focused element into view.
 */
export function setFocusToElement(
  element: ElemOrSelectorInput | null,
  options?: SetFocusOptions,
): void {
  if (element === null) {
    return;
  }

  const delay = options?.delay ?? 0;

  const focusOptions = { preventScroll: options?.preventScroll ?? false };

  if (delay === 0) {
    getValidElement(element, options?.parent)?.focus(focusOptions);
  } else {
    setTimeout(() => {
      getValidElement(element, options?.parent)?.focus(focusOptions);
    }, delay);
  }
}
