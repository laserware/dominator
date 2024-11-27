import type { ElemOrCssSelector } from "../types.ts";

import { asElem } from "./asElem.ts";
import { toElem } from "./toElem.ts";

/**
 * Additional options for setting focus to an Element.
 *
 * @expand
 *
 * @group Elements
 */
export interface FocusOptions<E extends HTMLElement> {
  /** Delay (in milliseconds) to wait until attempting to set focus. */
  delay?: number;

  /** Parent element (if `target` is a {@linkcode CssSelector}). */
  parent?: ElemOrCssSelector;

  /**
   * If true, don't scroll the focused element into view.
   * See the [MDN documentation for `preventScroll`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#preventscroll)
   * for additional details.
   */
  preventScroll?: boolean;

  /** Optional callback that fires after trying to set focus. */
  onDone?(elem: E): void;
}

/**
 * Sets focus to the specified `target`. Specify additional `options` to refine
 * the `focus` operation.
 *
 * Note that we don't throw if the `target` is `null` because it may not exist
 * yet if a {@linkcode CssSelector} is specified.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [options] Options for setting focus.
 *
 * @group Elements
 */
export function focusElem<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector | null,
  options?: FocusOptions<E>,
): void {
  if (target === null) {
    return;
  }

  const focusCallback = (): void => {
    const elem = toElem(target, options?.parent);

    if (elem === null) {
      return;
    }

    elem.focus({ preventScroll: options?.preventScroll ?? false });

    options?.onDone?.(asElem<E>(elem));
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
