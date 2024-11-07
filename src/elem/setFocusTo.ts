import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

export interface SetFocusOptions<E extends Element> {
  delay?: number;
  parent?: ElemOrCssSelector;
  preventScroll?: boolean;
  onDone?(elem: NullOr<E>): void;
}

/**
 * Sets focus to the specified element.
 *
 * @param input Element, EventTarget, or selector for element to focus.
 * @param [options] Options for setting focus.
 * @property [options.delay] Delay for setting focus to element.
 * @property [options.parent] Element, EventTarget, or selector for parent element.
 * @property [options.preventScroll] If true, don't scroll the focused element into view.
 * @property [options.onDone] Optional callback that fires after trying to set focus.
 */
export function setFocusTo<E extends Element = HTMLElement>(
  input: NullOr<ElemOrCssSelector>,
  options?: SetFocusOptions<E>,
): void {
  if (input === null) {
    return;
  }

  const focusCallback = (): void => {
    const elem = toElem<HTMLInputElement>(input, options?.parent);

    elem?.focus({ preventScroll: options?.preventScroll ?? false });

    options?.onDone?.(elem as unknown as E);
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
