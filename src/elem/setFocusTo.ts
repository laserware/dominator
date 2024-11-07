import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

export interface SetFocusOptions {
  delay?: number;
  parent?: ElemOrCssSelector;
  preventScroll?: boolean;
}

/**
 * Sets focus to the specified element.
 *
 * @param input Element, EventTarget, or selector for element to focus.
 * @param [options] Options for setting focus.
 * @property [options.delay] delay Delay for setting focus to element.
 * @property [options.parent] parent Element, EventTarget, or selector for parent element.
 * @property [options.preventScroll] preventScroll If true, don't scroll the focused element into view.
 */
export function setFocusTo(
  input: NullOr<ElemOrCssSelector>,
  options?: SetFocusOptions,
): void {
  if (input === null) {
    return;
  }

  const focusCallback = (): void => {
    const elem = toElem(input, options?.parent);

    elem?.focus({ preventScroll: options?.preventScroll ?? false });
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
