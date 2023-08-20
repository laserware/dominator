import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

export interface SetFocusOptions {
  delay?: number;
  parent?: ElementOrSelectorInput;
  preventScroll?: boolean;
}

/**
 * Sets focus to the specified element.
 * @param element Selector, element, or event to set focus
 * @param [options] Options for setting focus
 * @property [options.delay] delay Delay for setting focus to element
 * @property [options.parent] parent Parent element of the specified element
 * @property [options.preventScroll] preventScroll If true, don't scroll the focused element into view
 */
export function setFocusToElement(
  element: ElementOrSelectorInput | null,
  options?: SetFocusOptions,
): void {
  if (element === null) {
    return;
  }

  const validElement = getValidElement(element, options?.parent);

  const focusCallback = (): void => {
    validElement?.focus({ preventScroll: options?.preventScroll ?? false });
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
