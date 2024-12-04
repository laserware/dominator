import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";

import { toElem } from "./toElem.ts";
import type { Target } from "./types.ts";

/**
 * Additional options for setting focus to an element.
 *
 * @expand
 */
export type FocusOptions<TN extends TagName> = {
  /** Delay (in milliseconds) to wait until attempting to set focus. */
  delay?: number;

  /** Parent element (if `target` is a {@linkcode css!CssSelector}). */
  parent?: Target;

  /**
   * If true, don't scroll the focused element into view.
   * See the [MDN documentation for `preventScroll`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#preventscroll)
   * for additional details.
   */
  preventScroll?: boolean;

  /** Optional callback that fires after trying to set focus. */
  onDone?(elem: ElementOf<TN>): void;
};

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
export function focusElem<TN extends TagName = "*">(
  target: Target | null | undefined,
  options?: FocusOptions<TN>,
): void {
  const focusCallback = (): void => {
    const elem = toElem(target, options?.parent);

    if (elem === null) {
      return;
    }

    elem.focus({ preventScroll: options?.preventScroll ?? false });

    options?.onDone?.(cast<ElementOf<TN>>(elem));
  };

  setTimeout(focusCallback, options?.delay ?? 0);
}
