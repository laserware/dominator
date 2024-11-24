import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";
import { asElem } from "./asElem.ts";

/**
 * Options for setting focus to an element.
 */
export interface FocusOptions<E extends Element> {
  /** Delay (in milliseconds) to wait until attempting to set focus. */
  delay?: number;

  /** Parent element (if `target` is a CSS selector). */
  parent?: ElemOrCssSelector;

  /** If true, don't scroll the focused element into view. */
  preventScroll?: boolean;

  /** Optional callback that fires after trying to set focus. */
  onDone?(elem: NullOr<E>): void;
}

/**
 * Sets focus to the specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [options] Options for setting focus. See {@linkcode FocusOptions}.
 */
export function focusElem<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
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
