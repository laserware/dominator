import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Options for setting focus to an element.
 */
export interface FocusOptions<E extends Element> {
  /** Delay (in milliseconds) to wait until attempting to set focus. */
  delay?: number;

  /** Parent element (if `target` is a CSS selector). */
  parent?: ElemOrCssSelector;

  /** If true, prevent the */
  preventScroll?: boolean;
  onDone?(elem: NullOr<E>): void;
}

/**
 * Sets focus to the specified target.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param [options] Options for setting focus.
 * @property [options.delay] Delay for setting focus to element.
 * @property [options.parent] Element, EventTarget, or selector for parent element.
 * @property [options.preventScroll] If true, don't scroll the focused element into view.
 * @property [options.onDone] Optional callback that fires after trying to set focus.
 */
export function focusElem<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  options?: FocusOptions<E>,
): void {
  if (target === null) {
    return;
  }

  const focusCallback = (): void => {
    const elem = toElem<HTMLInputElement>(target, options?.parent);

    if (elem === null) {
      return;
    }

    elem.focus({ preventScroll: options?.preventScroll ?? false });

    options?.onDone?.(elem as unknown as E);
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
