import type { AnyElement } from "../dom.ts";

import { asElem } from "./asElem.ts";
import { toElem } from "./toElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

/**
 * Additional options for setting focus to an element.
 *
 * @expand
 */
export interface FocusOptions<E extends AnyElement> {
  /** Delay (in milliseconds) to wait until attempting to set focus. */
  delay?: number;

  /** Parent element (if `target` is a {@linkcode css!CssSelector}). */
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
 * yet if a {@linkcode css!CssSelector} is specified.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [options] Options for setting focus.
 */
export function focusElem<E extends AnyElement = HTMLElement>(
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
